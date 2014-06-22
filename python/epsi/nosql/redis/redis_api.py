class RedisAPI(object):
    def __init__(self, redis_connector):
        self.key = "pdfList"
        self.connector = redis_connector

    def add_pdf(self, pdf_path):
        self.connector.lpush(self.key, pdf_path)
        pass

    def get_nb_pdf(self):
        return self.connector.llen(self.key)

    def retrieve_pdf(self):
        return self.connector.lpop(self.key)
