from epsi.nosql.redis.connector.redis_connector import RedisConnector


class MockRedisConnector(RedisConnector):

    def __init__(self):
        RedisConnector.__init__(self)
        self.dict = []

    def lpush(self, key, value):
        self.dict.append(value)

    def lpop(self, key):
        return self.dict.pop(key)

    def llen(self, key):
        return len(self.dict)