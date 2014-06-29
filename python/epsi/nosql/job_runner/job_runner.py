from epsi.nosql.metadata.metadata_extractor import MetadataExtractor
from epsi.nosql.mongodb.mongo_api import MongoApi
from os import listdir
from rq import Queue
from redis import Redis


class JobRunner():
    def __init__(self):
        redis_conn = Redis()
        self.q = Queue(connection=redis_conn)
        pass

    def index_folder(self, path):
        list_of_pdf = get_pdf_paths(path)
        for pdf in list_of_pdf:
            self.add_pdf(pdf)

    def add_pdf(self, path):
        self.q.enqueue(index_pdf, path)


def index_pdf(pdf_path):
    metadata_extractor = MetadataExtractor()
    mongo_api = MongoApi("localhost", 27017)
    info = metadata_extractor.extract(pdf_path)
    index_info = metadata_extractor.get_index_info(info)
    mongo_api.push(index_info)


def get_pdf_paths(path):
    list_files = listdir(path)
    list_of_pdf = []
    for pdf_file in list_files:
        if ".pdf" in pdf_file:
            list_of_pdf.append(path + "/" + pdf_file)
    return list_of_pdf

# if __name__ == '__main__':
#     check()