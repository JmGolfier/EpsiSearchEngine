from pymongo import MongoClient


class MongoApi():
    def __init__(self, adress, port):
        #27017
        self.client = MongoClient(adress, port)
        self.collection = self.client.nosql.pdfs
        pass

    def push(self, index_pdf_info):
        self.collection.insert(index_pdf_info)
        pass
