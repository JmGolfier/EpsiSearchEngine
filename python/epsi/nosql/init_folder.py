import sys
from os import listdir
from redis2.connector.connector import Connector
from epsi.nosql.redis2.redis_api import RedisAPI


def init_folder(path):
    list_files = listdir(path)
    list_of_pdf = []
    for file in list_files:
        if ".pdf" in file:
            list_of_pdf.append(path + "/" + file)
    connector = Connector("localhost", 6379)
    api = RedisAPI(connector)
    for pdf in list_of_pdf:
        api.add_pdf(pdf)


if __name__ == '__main__':
    init_folder(sys.argv[1])
    # init_folder("/home/manu/Documents/pdf")