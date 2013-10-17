#!/bin/bash - 
#===============================================================================
#
#          FILE: alias.sh
# 
#         USAGE: ./alias.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (), 
#  ORGANIZATION: 
#       CREATED: 10/17/2013 12:08
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error
alias start=bundle exec rake preview
alias deploy=bundle exec rake gen_deploy


