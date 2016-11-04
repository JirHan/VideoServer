    exposed = True 

    def dirChain(self, dir):
        return dir.split(os.sep)

    def getCurr(self, base, dirChain):
        curr = base

        for dc in dirChain:
            found = False
            for d in curr.content:
                if  d.type == "D" and d.name == dc:
                    curr = d
                    found = True
                    break
            if not found:
                raise Exception("{0} not found in {1}".format(dc, d.name))

        return curr

    def listDir(self, dir):
        base = None
        curr = None
        skipIdx = 0
        for root, dirs, files in os.walk(dir):
            if base is None:
                base = ListItem("", "D")
                curr = base
                skip = len(self.dirChain(root))
            else:
                curr = self.getCurr(base, self.dirChain(root)[skip:])  
                     
            curr.content = []
            for d in dirs:
                curr.content.append(ListItem(d, "D"))
            for f in files:
                curr.content.append(ListItem(f, "F"))
                                
        return json.dumps(base)