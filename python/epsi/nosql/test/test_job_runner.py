from epsi.nosql.metadata.metadata_extractor import MetadataExtractor

__author__ = 'manu'

import unittest
import os


class JobRunnerTestCase(unittest.TestCase):

    def setUp(self):
        self.metadata_extractor = MetadataExtractor()

    def test_extract_data(self):
        info = self.metadata_extractor.extract('./pdf/realPdf.pdf')
        self.assertIsNotNone(info['metadata'])
        self.assertIsNotNone(info['text'])

    def test_get_pdf_index_info(self):
        info = self.metadata_extractor.extract('./pdf/M13_LAMAISON.pdf')
        pdf_index_info = self.metadata_extractor.get_index_info(info)
        self.assertEqual(pdf_index_info['Author'], "Maxime")
        self.assertIsNotNone(pdf_index_info['contenu'], "bla bla")
