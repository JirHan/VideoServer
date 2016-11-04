import os
__mod_dir__ = os.path.abspath(os.path.dirname(__file__))

import cherrypy
import ujson as json

#contentRoot = "F:\\Fotky"
#contentRoot = "E:\\mp4\\"
contentRoot = "C:\\VideoServer\\Data"

class Content():
    pass

class Web():
    pass

class ListItem:
    def __init__(self, name, type):
        self.name = name
        self.type = type

class List():
    exposed = True

    def GET(self, path = None, **params):
        ret = []
        print(path)
        if path is not None:
            curr = os.path.join(contentRoot, path)
        else:
            curr = contentRoot

        if(os.path.isdir(curr)):
            for fname in os.listdir(curr):
                if os.path.isdir(os.path.join(curr, fname)):
                    ret.append(ListItem(fname, "D"))
                elif fname.endswith(".mp4"):
                    ret.append(ListItem(fname, "F"))
        
        return json.dumps(ret, ensure_ascii=False).encode('utf8')

class VideoServer:

    def setCors():
        headers = cherrypy.response.headers
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'             
        headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

    def start(): 

        cherrypy.tools.cors = cherrypy.Tool('before_finalize', VideoServer.setCors)

        cherrypy.config.update({
            'server.socket_host': '0.0.0.0',
            'server.socket_port': 8080, 

            'engine.autoreload.on': False,

            'tools.encode.on': True,
            'tools.decode.on': True,
            'tools.encode.encoding': 'utf-8',
            'tools.decode.encoding': 'utf-8',
            'log.screen': True 
        })
    
        cherrypy.tree.mount(Content(), '/content',
            {'/':
                {
                    'tools.staticdir.on':   True, 
                    'tools.staticdir.root': contentRoot,
                    'tools.staticdir.dir':  '',
                }
            }
        )
    
        cherrypy.tree.mount(Web(), '/',
            {'/':
                {
                    'tools.staticdir.on':   True, 
                    'tools.staticdir.root': __mod_dir__,
                    'tools.staticdir.dir':  'web',
                    "tools.staticdir.index" : "index.html",
                }
            }
        )
    
        cherrypy.tree.mount(List(), '/list',
            {'/':
                {
                    'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
                    'tools.cors.on': True
                }
            }
        )

        cherrypy.engine.start()
        cherrypy.engine.block()


if __name__ == '__main__':
    VideoServer.start()
    

