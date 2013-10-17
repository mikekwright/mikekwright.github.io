#!/bin/bash - 
#===============================================================================
#
#          FILE: terminal.sh
# 
#         USAGE: ./terminal.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (), 
#  ORGANIZATION: 
#       CREATED: 10/16/2013 18:33
#      REVISION:  ---
#===============================================================================

$TMUX_COMMAND split-window -t $SESSION:$CODE_WINDOW.$CODE_WINDOW_COMMAND_PANE -h 
$TMUX_COMMAND send-keys -t $SESSION:$CODE_WINDOW.$(($CODE_WINDOW_COMMAND_PANE + 1)) "bundle exec rake preview" C-m
$TMUX_COMMAND send-keys -t $SESSION:$CODE_WINDOW.$CODE_WINDOW_COMMAND_PANE "chromium-browser http://localhost:4000" C-m

