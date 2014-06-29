import sys
from epsi.nosql.job_runner.job_runner import JobRunner
from epsi.nosql.config.constants import *


if __name__ == '__main__':
    JobRunner().add_pdf(PDF_FOLDER + sys.argv[1])