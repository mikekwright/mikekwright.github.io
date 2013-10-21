---
layout: post
title: "FreeBSD 9.2 on VMware Workstation 9.4"
date: 2013-10-10 21:46
comments: true
categories: 
- VMware
- Virtualization
- FreeBSD
---

Tonight I decided I really wanted to switch to freebsd from Ubuntu.  The move was not because 
ubuntu had issues, but rather because I felt that I would enjoy the experience of freebsd 
more than that of linux.  It was going to be a new world, with a different way of making things 
work.    

So the items I list below will show the steps that I went through to get freebsd working 
smoothly on vmware.    

**Note:** *I will assume you have already installed freebsd and will not walk through those steps"*

<!-- More -->

1. Installing gnome2
2. Installing rc.conf
3. Install VM tools
4. Configure Xorg
5. Installing Screen Tools
6. **Acknowledgements**

# Install gnome2

To install gnome2 the steps that I took are below.   

1. Install gnome2

        cd /usr/ports/x11/gnome2
        make install clean

2. Install xorg

        cd /usr/ports/x11/xorg
        make install clean

3. Create the initial xorg.conf file

        Xorg -configure
        cp /root/xorg.conf.new $HOME/xorg.conf

At this time the gnome2 desktop should be installed so we can complete.     

# Configure rc.conf

The next step is to configure rc.conf to startup by default.  This can be done by adding 
the below two lines to /etc/rc.conf and than rebooting.   

        # DBus and HALd
        dbus_enable="YES"
        hald_enable="YES"
        
        # VMware tools
        vmware_guest_vmblock_enable="YES"
        vmware_guest_vmhgfs_enable="YES"
        vmware_guest_vmmemctl_enable="YES"
        vmware_guest_vmxnet_enable="YES"
        vmware_guestd_enable="YES"

# Install VM tools

There are a few tools that you will want to install to make it so that your vm exprience 
is the best.    

1. install open-vm-tools
 
        cd /usr/ports/emulators/open-vm-tools
        make install clean

2. install the mouse tools

        cd /usr/ports/x11-drivers/xf86-input-vmmouse
        make install clean

3. install the vmware tools (from the vmware dvd)

        tar -xvf vmware-freebsd-tools.tar.gz
        cd vmware-tools-distrib
        ./vmware-install.pl

# Configure Xorg

You will need to configure the screen and input devices to make them work correctly 
with a virtual system.    


        Section "ServerLayout"
          Identifier "X.org Configured"
          Screen 0 "VMScreen" 0 0
          InputDevice "VMMouse" "CorePointer"
          InputDevice "Keyboard0" "CoreKeyboard" 
        EndSection
        
        Section "InputDevice"
          Identifier "VMMouse"
          Driver "vmmouse"
          Option "Protocol" "auto"
          Option "Device" "/dev/sysmouse"
          Option "ZAxisMapping" "4 5 6 7"
        EndSection
        
        Section "Monitor"
          Identifier "VMMonitor"
          VendorName "VMware, Inc"
        EndSection
        
        Section "Device"
          Identifier "VMware SVGA"
          Driver "vmware"
        EndSection

        Section "Screen"
          Identifier "VMScreen" 
          Device "VMware SVGA"
          Monitor "VMMonitor"
          ...
        EndSection

# Install Screen tools

To install the screen tools you need to install a few development tools like git, 
wget and dependencies.   

1. Install the gsed dependency

        cd /usr/ports/textproc/gsed
        make install clean

2. Install the newt dependency (<b>include python support</b>)

        cd /usr/ports/devel/newt
        make install clean

3. Install tmux

        cd /usr/ports/sysutils/tmux
        make install clean

4. Install byobu (for tmux support need downloaded version) - Last <b>version used 5.60</b>

        cd $HOME
        wget https://launchpad.net/byobu/trunk/5.60/+download/byobu_5.60.orig.tar.gz
        tar -xvf byobu_5.60.orig.tar.gz
        ./configure --prefix="$HOME/byobu"
        make 
        make install clean
        echo "echo "export PATH=$HOME/byobu/bin:$PATH" &ltsp;&ltsp; $HOME/.bashrc
        source $HOME/.bashrc

# Acknowledgements
  
As you can imagine the majority of this information was info that I found while online.
As such, I like to share links to the sites that I used to access this information.    

* [Howard's Blog](http://allstarnix.blogspot.com/2012/08/install-vmware-tools-in-freebsd-9.html)

  If you have been searching, this is one of the first links that comes up, it is a great site 
  and has tons of useful information, I highly recommend checking it out.   

* [Rhyous Blog](http://www.rhyous.com/2012/05/09/installing-vmware-tools-on-freebsd-9-without-xorg/#comment-55356)

  This was a useful blog as well, but especially the comment by **HW**.  This comment included 
  the information to install xf86-input-vmmouse which is what was able to halt the odd stuttering 
  effect that was happening when the mouse would lose/get focus.    

* [Byobu Source README.md](https://github.com/dustinkirkland/byobu)

  This section included the details on installing the missing pieces for byobu 
  (especially the byobu config).  


