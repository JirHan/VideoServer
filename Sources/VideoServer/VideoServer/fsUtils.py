import os

class ListItem:
    def __init__(self, name, type):
        self.name = name
        self.type = type

def list(root, path):
    ret = []
    print(path)
    if path is not None:
        curr = os.path.join(root, path)
    else:
        curr = root

    if(os.path.isdir(curr)):
        for fname in os.listdir(curr):
            if os.path.isdir(os.path.join(curr, fname)):
                ret.append(ListItem(fname, "D"))
            elif fname.endswith(".mp4"):
                ret.append(ListItem(fname, "F"))
    return ret