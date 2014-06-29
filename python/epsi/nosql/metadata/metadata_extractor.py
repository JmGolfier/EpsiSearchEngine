import os

from epsi.nosql.settings import *

os.environ['CLASSPATH'] = TIKKA_PATH
from jnius import autoclass

class MetadataExtractor():

    def __init__(self):
        pass

    def extract(self, path):
        Tika = autoclass('org.apache.tika.Tika')
        Metadata = autoclass('org.apache.tika.metadata.Metadata')
        FileInputStream = autoclass('java.io.FileInputStream')

        tika = Tika()
        meta = Metadata()
        text = tika.parseToString(FileInputStream(path), meta)
        pieces = path.split("/")
        return {"metadata": meta, "text": text, "fileName": pieces[len(pieces) - 1]}

    def get_index_info(self, info):
        metadata = info["metadata"]
        keys = metadata.names()
        index_info = {}
        for key in keys:
            index_info[key] = metadata.get(key)
        index_info["contenu"] = info["text"]
        index_info["language"] = "fr"
        index_info["fileName"] = info["fileName"]
        return index_info