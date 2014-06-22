import redis
from epsi.nosql.redis.connector.redis_connector import RedisConnector


class Connector(RedisConnector):

    def __init__(self, address, port):
        #6379
        self.redis = redis.StrictRedis(host=address, port=port, db=0)

    def lpop(self, key):
        return self.redis.lpop(key)

    def llen(self, key):
        return self.redis.llen(key)

    def lpush(self, key, value):
        self.redis.lpush(key, value)


