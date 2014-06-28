import sys
from epsi.nosql.job_runner.job_runner import JobRunner, index_pdf
from redis2.connector.connector import Connector


def init_folder(path):
    connector = Connector("localhost", 6379)
    runner = JobRunner(connector)
    runner.index_folder(path)


if __name__ == '__main__':
    # init_folder(sys.argv[1])
    init_folder("/home/manu/Documents/pdf")

    # index_pdf("/home/manu/Documents/pdf/M13_LAMAISON.pdf")