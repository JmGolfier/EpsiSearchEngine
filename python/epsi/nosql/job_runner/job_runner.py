from epsi.nosql.metadata.metadata_extractor import MetadataExtractor
from epsi.nosql.redis2.connector.connector import Connector
from epsi.nosql.redis2.redis_api import RedisAPI
from nosql.mongodb.mongo_api import MongoApi


def check():
    metadata_extractor = MetadataExtractor()

    connector = Connector("localhost", 6379)
    redisApi = RedisAPI(connector)
    mongoApi = MongoApi("localhost", 27017)
    retrievedPdf = redisApi.retrieve_pdf()
    while retrievedPdf is not None:
        info = metadata_extractor.extract(retrievedPdf)
        index_info = metadata_extractor.get_index_info(info)
        mongoApi.push(index_info)
        retrievedPdf = redisApi.retrieve_pdf()



if __name__ == '__main__':
    check()