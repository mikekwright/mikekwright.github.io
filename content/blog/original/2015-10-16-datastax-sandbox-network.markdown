Title: "Datastax Sandbox Network"
Date: 2015-10-16 11:10
Category: ops
Tags: cassandra, datastax, linux

So today I was working with the datastax virtual environment (namely getting the OVA to work 
inside of VMWare).  There was only one issue that I ran into, that was the external networking
was not working out of the box.  In this post I will discuss what I looked into and how I 
fixed the problem in the end.  

<!-- more -->

To start, I am not a very savy linux guru, so the purpose of this post is to both share and 
record my experience so that I can go over it again in the future if needed.   

## Datastax Sandbox

The datastax sandbox is an environment that is setup with dse cassandra, opscenter and number of 
useful training materials all on a predefined VM.  If you download this vm from datastax, you can
either open it in virtualbox or vmware.  For me, while I like virtualbox and think it is a great
product, I find that vmware general outperforms it for most of my use cases.  That may not always
be the case and I would love to see virtualbox reign supreme.  But since I wanted to use vmware
at the time, I pulled down and opened the ova file and imported it into VMWare.   

When starting up the virtual machine you will need to use the standard login credentials namely: 

        username: datastax
        password: datastax

Open a terminal and enter the below command, and if you have a simliar output then this fix might
be for you.  

        [datastax@localhost ~]$ ifconfig
        lo        Link encap:Local Loopback  
                  inet addr:127.0.0.1  Mask:255.0.0.0
                  inet6 addr: ::1/128 Scope:Host
                  UP LOOPBACK RUNNING  MTU:65536  Metric:1
                  RX packets:18330 errors:0 dropped:0 overruns:0 frame:0
                  TX packets:18330 errors:0 dropped:0 overruns:0 carrier:0
                  collisions:0 txqueuelen:0 
                  RX bytes:7024417 (6.6 MiB)  TX bytes:7024417 (6.6 MiB)
         
        [datastax@localhost ~]$ 

This means that you have the loopback address up (which is good, otherwise you would be having
some super serious issues), however there is no other connection so outbound traffic will not 
work.  There is a network adapter that has been provided, so why is it that this network isn't 
working?  

## Steps

At this point, I spent my time trying to understand what is going on with the system.  Even when
adding a new NIC in vmware fusion it did not show up in the virtual machine.  So I first went and
looked in the network setup directory to see what was happenining.  


        [datastax@localhost network-scripts]$ sudo ifup eth0
        ifcfg-eth0
        eth0
        Device eth0 does not seem to be present, delaying initialization.

Since this failed, I went to the actual network scripts to run it and see what was going on.  

        [datastax@localhost ~]$ cd /etc/sysconfig/network-scripts/
        [datastax@localhost network-scripts]$ ./ifup-eth
        ./network-functions: line 107: .: /etc/sysconfig/network-scripts/: is a directory
        Device does not seem to be present, delaying initialization.

Ok, so the device is not present, yet vmware has a device and it for sure is present.  The next
place to look is in the /etc/udev/rules.d location.  So I opened up the 70-persistent-net.rules
and found that there were actually 2 NICs defined in there.  It seems that when opening the 
device in vmware it created a new nic instead of updating the default eth0.  That is great, this
just means I need to have the startup scripts be aware of the new eth1 device.   

So jumping out of vim I decided to try to `ifup` the eth1.  

        [datastax@localhost network-scripts]$ ifup eth1
        /sbin/ifup: configuration for eth1 not found.
        Usage: ifup <device name>

Ok, so now I need a configuration for this new adapter.  I did this by copying the configuration
for eth0 `ifcfg-eth0` into a new file `ifcfg-eth1` and then editing the values that were specific 
for that devices, namely the `DEVICE`, `HWADDR` and removing the `UUID`.  So when completed
here is what my `ifcfg-eth1` file looked like.  (Note: I had the actual mac address in the HWADDR
field, but removed from this post).  

        DEVICE="eth1"
        BOOTPROTO="dhcp"
        HWADDR="00:00:00:00:00:00"
        IPV6INIT="yes"
        MTU="1500"
        NM_CONTROLLED="yes"
        ONBOOT="yes"
        TYPE="Ethernet"

At this time, rebooting the machine brought everthing up and then running `ifconfig` gave me 
better results.   


        [datastax@localhost ~]$ ifconfig
        eth1      Link encap:Ethernet  HWaddr 00:00:00:00:00:00  
                  inet addr:10.4.4.23  Bcast:10.4.4.255  Mask:255.255.255.0
                  inet6 addr: fe80::20c:29ff:fe22:7175/64 Scope:Link
                  UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
                  RX packets:4220 errors:0 dropped:0 overruns:0 frame:0
                  TX packets:1172 errors:0 dropped:0 overruns:0 carrier:0
                  collisions:0 txqueuelen:1000 
                  RX bytes:3207294 (3.0 MiB)  TX bytes:219693 (214.5 KiB)
        
        lo        Link encap:Local Loopback  
                  inet addr:127.0.0.1  Mask:255.0.0.0
                  inet6 addr: ::1/128 Scope:Host
                  UP LOOPBACK RUNNING  MTU:65536  Metric:1
                  RX packets:56717 errors:0 dropped:0 overruns:0 frame:0
                  TX packets:56717 errors:0 dropped:0 overruns:0 carrier:0
                  collisions:0 txqueuelen:0 
                  RX bytes:16718406 (15.9 MiB)  TX bytes:16718406 (15.9 MiB)

finally we ran our test below to make sure my traffic was all good.   

        [datastax@localhost ~]$ ping google.com
        PING google.com (216.58.217.206) 56(84) bytes of data.
        64 bytes from lax17s05-in-f206.1e100.net (216.58.217.206): icmp_seq=1 ttl=51 time=21.2 ms
        64 bytes from lax17s05-in-f206.1e100.net (216.58.217.206): icmp_seq=2 ttl=51 time=21.4 ms

Success! 



