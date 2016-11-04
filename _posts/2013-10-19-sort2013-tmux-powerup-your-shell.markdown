---
layout: post
title: "Sort2013 Part IV: TMUX - Powerup your shell"
date: 2013-10-19 22:43
comments: true
categories: 
- sort
- sort2013
- tmux
- linux
- shell
---

During sort, this session was actually a really insightful look into mouse-less productivity.  
I have always been a fan of working in the console, and have actually used screen in the past. 
However tmux has opened up an entirely new world for me. 

In this post I am going to share some of the things that I have learned from using tmux
as setups I have in place for creating easy on "dev environments".  

<!-- more -->

## [TMux overview](http://tmux.sourceforge.net/) 

Tmux is a [terminal multiplexer.](http://en.wikipedia.org/wiki/Terminal_multiplexer) If you
are a heavy user of command line execution on nix-like environments (including ssh) than you
will want to become comfortable with using terminal multiplexers.  This will allow you to
be able to persist sessions, allow for "remote pair-programming" like features.    

To work with tmux you need to realize that each tmux run creates a "session".  Each session 
can intern have multiple windows.  And each window has 1+ panes.  When a pane is created it
is a completely new shell environment and does not keep aliases or other configuration applied
to a previous pane.    

### Session

Session can be created using names which can allow you to easily switch between multiple 
sessions depending on work you are doing.  To work with session information you start by
using 

        tmux new-session  
        
This will create a new unnamed session, which you can rename using `C-<bindkey> $`.  If you 
want to create a session from scratch with the correct name you can use 

        tmux new-session -s <name>  

You can now disconnect from a session using `C-<bindkey> D`.  After disconnecting, reconnecting is accomplished using

        tmux attach -t <name>

### Windows

We have a newly created session and a single window and a pane at this point.  So lets go over
how to work with windows, both creating and navigation. 

To create a new window from inside the session you can use the default shortcut `C-<bindkey> c`. 
This will create a new window that will default to the window number that has already been 
created.  You can also create a new window for an existing session using the following command
line call.  

        tmux new-window -t <session-name>

If you want to name this window you can either name it using the shortcut `C-<bindkey> ,`. You can
also name it at creation or rename from command line using one of the below commands.   

        tmux new-window -t <session-name> -n <window-name>
        tmux rename-window -t <session-name>:<window-number> <window-name>

So we have window creation and renaming, now on to window destruction.  The shortcut for 
destroying the current window is `C-<bindkey> &`.  This will prompt you before the deletion
will be completed, it will also terminal all running processes that were started in any 
of the windows open panes.    

Window navigation is also pretty straight forward. The below list is the shortcuts and can be
used when navigating.  

* `C-<bindkey> n` - Navigate to the next window
* `C-<bindkey> p` - Navigate to the previous window
* `C-<bindkey> w` - Open up a window chooser
* `C-<bindkey> [0-9]` - Quickly navigate to selected window [0-9]

### Panes

This is (of course) the reason we are using tmux.  The ability to work with terminals.  A 
pane is always its own terminal.  Up until now we have basically defined tools used to 
organize these created terminals, but panes are the only ones that are terminals.  

Pane creation is done through window manipulation.  So you always start with your first 
pane, to create a second you must **SPLIT** the existing pane.  Splitting the pane can
be down either vertically or horizontally.    

* `C-<bindkey> %` - Split pane 50% horizontally
* `C-<bindkey> "` - Split pane 50% vertically 

You can also resize existing panes by using `C-<bindkey> C-[up-down-left-right]`. As you use
the arrow keys it will adjust the panes giving you the exact setup you desire.  Navigating
through the panes uses nearly the same shortcuts `C-<bindkey> [up-down-left-right]`.    

### Configuration

Tmux also provides a means for configuring your tmux setup by supplying .tmux.conf.  Below is 
the sample .tmux.conf file that was created.  

{% gist 7326539 .tmux.conf %}

## Vim Configuration

So I am a huge vim fan.  Nearly every ide I have has vim mode enabled.  It is one of the 
funniest things to have happen when a co-worker says "wow you go through that fast" and I 
respond, "it's just the vim binding".  At that point they start to laugh cause I'm using
vim bindings, and I just shrug and say, "Whatever makes me more productive than you ;-)".   

My vim setup is pretty simple, since I use vim through ssh shells often and inside of 
screen / tmux sessions, I have adjusted vim to use certain bindings that work in these
environments.    

### Plugins

To really get the power of vim you will need to have some plugins installed and setup
to be enabled in your environment.  Vim allows you to set any number of keyboard shortcuts
you would like, but I would recommend not using function keys (you can get conflicts with
some screen technologies).   

* [Pathogen](https://github.com/tpope/vim-pathogen) - Easy Plugin Management **A MUST**
* [NerdTree](https://github.com/scrooloose/nerdtree) - File Explorer
* [ctrlp](https://github.com/kien/ctrlp.vim) - Ctrl+P File Searching
* [bufexplorer](http://www.vim.org/scripts/script.php?script_id=42)  
* Colorscheme [xoria256](http://www.vim.org/scripts/script.php?script_id=2140) - 256 trem 

### vimrc

These are just some of the basic options that I prefer for use in my vim environment. 

{% gist 7326565 vimrc %}

