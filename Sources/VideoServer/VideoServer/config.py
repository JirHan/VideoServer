import os
__mod_dir__ = os.path.abspath(os.path.dirname(__file__))
import ujson as json
import time

def getConfig():
    return Config.getConfig()

class Config:
    CONFIG_READ_TIMEOUT = 10
    lastConfigRead = 0
    cfg = None

    def getConfig():
        now = time.time()
        if Config.cfg == None or now > Config.lastConfigRead + Config.CONFIG_READ_TIMEOUT:
            with open("{0}/config.json".format(__mod_dir__), "r") as f:
                str = f.read()
                Config.cfg = json.loads(str)
                Config.lastConfigRead = now
        return Config.cfg