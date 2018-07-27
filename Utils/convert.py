import os
import subprocess
from subprocess import PIPE, STDOUT
import pexpect

dir = "/media/emuser/Fun/Filmy"
outDir = "/media/emuser/Fun/mp4/Filmy"
inFormat = ".avi"
outFormat = ".mp4"

def ffmpeg(inFile, outFile):
    if not os.path.isfile(outFile):
        cmd = ["ffmpeg", "-i", inFile,"-strict", "-2", "-preset", "superfast", outFile]
        try:
            with subprocess.Popen(cmd, stdout = PIPE, stderr = STDOUT, universal_newlines = True) as p:
                for l in p.stdout:
                    print("{0}".format(l.strip()))
        except Exception as e:
            print(e)
    else:
        print("Exists")

def convert():
    for root, dirs, files in os.walk(dir):
        print("{0} {1} {2}".format(root, dirs, files))

        out = "{0}/{1}".format(outDir, root[len(dir):])
        print("Output: {0}".format(out))

        for file in files:
            inFile = os.path.join(root, file);
            if inFile.endswith(inFormat):
                if not os.path.isdir(out):
                    os.makedirs(out)
                    
                outFile = os.path.join(out, file.replace(inFormat, outFormat))
                print("{0} => {1}".format(inFile, outFile))
                ffmpeg(inFile, outFile)
		
if __name__ == '__main__':
    convert()
    print("Done")

