import sys
from epsi.nosql.job_runner.job_runner import JobRunner, index_pdf


if __name__ == '__main__':
    # JobRunner().index_folder(sys.argv[1])
    JobRunner().index_folder("/home/manu/Documents/pdf")