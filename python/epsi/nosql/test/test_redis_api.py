from epsi.nosql.redis2.connector.mock_redis_connector import MockRedisConnector
from epsi.nosql.redis2.redis_api import RedisAPI
import unittest

class MyTestCase(unittest.TestCase):

    def setUp(self):
        self.mock_connector = MockRedisConnector()
        self.api = RedisAPI(self.mock_connector)


    def test_api_can_add_pdf(self):
        self.api.add_pdf('toto.pdf')
        self.assertEqual(1, self.api.get_nb_pdf())

    def test_api_can_retrieve_pdf(self):
        self.mock_connector.dict = ['toto.pdf']
        self.assertEqual('toto.pdf', self.api.retrieve_pdf())
