---
Title: Python, Anaconda and Tensorflow
Slug: 02-python-anaconda-tensorflow
Date: 2016-11-11 14:00
Category: development
Author: Michael Wright
Summary: This was the day that I took the time to get myself not only more familiar with Anaconda, but to also create a reusabled docker image.   
Tags:
 - python
---

So I have used python in the past, but generally my experiences with python have
been limited to either small sinatra scripts and other cli tools.  With my new
position though, I have needed to get more familiar with the python ecosystem.   

One of the tools that at least a number of other engineers on my team are using is
[anaconda](https://www.continuum.io/downloads).  

## Overview

I have used python dependencies before, however up until this point that has been 
limited to both virtualenv and pip.  I really enjoyed the system and the ability
to be able to quickly and easily install the dependencies that I needed using
`pip install <dependency>`.  

Once I got to the position of needing many dependencies and running them on different
machines I got use the requirements files `pip install -r requirements.txt`.   

Both of these systems would work well, however I noticed myself sometimes running
into systems that were failing because of OS dependencies that were missing.  This 
was never more present then when I started to install some of the DataScience tools. 

## Anaconda

It was a this point that I stumbled across Anaconda.  I was quite surprised by this library
and the ease at which it was to create environments, so long as I was in `bash` or `zsh`. 
The installation itself was painless and straightforward.  However what I really wanted
was the ability to define the different dependencies that I needed and to have those
be quickly enabled within anaconda.  Luckily this was easily accomplished using the 
environment file format.   

    name: myenv
    dependencies:
      - numpy
      - jupyter

So once I had this file created I was able to create and use this file to both create the
virtual environment and install the dependencies in the environment, using this command.  

        conda env create -f environment.yml 
        
Now there was one issue that I ran into, and that was the desire to install a dependency
that did not have an existing conda package.  I found that I could still install dependencies
to the system using pip.   

        name: myenv
        dependencies:
          - numpy
          - jupyter
          - pip
          - pip:
            - https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.11.0-cp35-cp35m-linux_x86_64.whl
            
## Dockerize It

So for me, that last part was being able to get the above system working correctly with
a docker container. Luckily this was a very straight forward process, even allowed me to
easily install python3.5 on ubuntu 14.04.   

        FROM ubuntu:16.04
        
        RUN apt-get update && \
            apt-get install -y curl build-essential && \
            apt-get clean && \
            rm -rf /tmp/ /var/tmp/ /var/lib/apt/lists/*
            
This is just the basic system installing the curl command (needed to pull down the anaconda installer)
and the build tools (aka gcc).  

        RUN curl -sSL -o installer.sh https://repo.continuum.io/archive/Anaconda3-4.2.0-Linux-x86_64.sh && \
            bash /installer.sh -b -f && \
            rm /installer.sh
            
In the above snippet I am actually pulling down the file and installing it.  The reason I chose to
use curl instead of the docker `ADD` command is that I wanted to keep the layers as thin as possible.   

The other thing to note is the `-b` and `-f` options that are supplied with the installer.  These allow
for us to run the installer without needing tty access by using the defaults for the installer (including
the prefix which puts anaconda at `/root/anaconda3`).   

        ENV PATH "$PATH:/root/anaconda3/bin"
        ADD startup /startup

        EXPOSE 8888 6006
        VOLUME /notebooks
        WORKDIR "/notebooks"

        CMD ["jupyter", "notebook", "--port=8888", "--no-browser", "--ip=0.0.0.0"]

Here we are setting up the anaconda information for the system, including some exposed ports with 
`8888` being the main port for the notebook. We also set our default commands to startup
the jupyter notebook allowing access from non-localhost machines (which of course is needed since
it is running in a container).   

        ADD environment.yml /environment.yml
        RUN conda env create -f /environment.yml
        ENV CONDA_ENV tensorflow
        
These final 3 values are useful as they allow use to create onbuild versions of the same dockerfile
that will allow others to specify the environment dependencies.  

## Conclusion

I really enjoyed using anaconda and the ease that it gave me in setting up some custom python
environments.  I have already moved most of the existing machines that I have over to anaconda and
am sure that I will find many more reasons to enjoy it.  

If you are interested in checking out either the docker image or the repo with the Dockerfile, links 
can be found below.  

* [Dockerfile](https://github.com/mikekwright/docker-anaconda-tensorflow/blob/master/Dockerfile)
* [Docker Images](https://hub.docker.com/r/mikewright/anaconda-tensorflow/) 