import os
from epsi.nosql.config.constants import *
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
        return {"metadata": meta, "text": text}

    def get_index_info(self, info):
        metadata = info["metadata"]
        keys = metadata.names()
        index_info = {}
        for key in keys:
            index_info[key] = metadata.get(key)
        index_info["contenu"] = info["text"]
        index_info["language"] = "fr"
        return index_info