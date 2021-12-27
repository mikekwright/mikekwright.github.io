---
Title: "Installing Django with no root access"
Date: 2012-05-09 
Comments: true
Category: development
Tags:
 - python
 - django
---

I really have enjoyed working with a $5/month hosting company for seriously small projects
with few performance requirements.  The service that I am using at this time is 
[site5](http://www.site5.com/).  They offer a great plan that works for me and the many
simple projects I have been using as prototypes.  

For this specific discussion I am going to talk about what I needed to do get the lastest 
django (v1.4) working on site5.

<!-- more -->

## Sandbox environment

Lets setup our little sandbox area for placing the source to compile and the actually 
compiled instance

        cd ~
        mkdir installed
        cd installed
        mkdir compile
        cd compile

Next we will download python for use on the instance. (Django 1.4 doesn't work with python 3)  

        wget http://www.python.org/ftp/python/2.7.3/Python-2.7.3.tar.bz2
        tar -xvf Python-2.7.3.tar.bz2 
        
*Note: This is specific for version 2.7.3 which was the stable release at the time this 
article was written*

So we have the source, now we need to compile and install Python 2.7 (non root user)

        cd Python-2.7.3
        ./configure PREFIX=$HOME/installed/python2.7
        make install DESTDIR=$HOME/installed/python2.7

Add python to the PATH for simplicity, to do this we will add an entry to the 
.bash_profile file located in our home directory   

        cd ~
        echo "export PATH=$HOME/installed/python2.7/bin:$PATH" >> ~/.bash_profile

Reload the .bash_profile so that python will be on the path.  

        source .bash_profile

Verify that the new python is found in the path   

        python --version
        (should print Python 2.7.3)

Install PIP (I followed instructions found [here](http://www.pip-installer.org/en/latest/installing.html))

        cd ~/installed/compile
        curl http://python-distribute.org/distribute_setup.py | python
        curl https://raw.github.com/pypa/pip/master/contrib/get-pip.py | python

*Note if the last command fails with certificate issue, run with curl -k*

Install django using pip

        pip install django
        pip install flup
        pip install pysqlite  (only sometimes required and only if you are doing sqlite db)

Create directory for website and add necessary files to get apache to pick it up or in this
case **.htaccess**   

        AddHandler fcgid-script .fcgi
        Options +FollowSymLinks
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^(media/.*)$ - [L]
        RewriteRule ^(static/.*)$ - [L]
        RewriteCond %{REQUEST_URI} !(django.fcgi)
        RewriteRule ^(.*)$ django.fcgi/$1 [L]

**django.fcgi**  

        #!/home/<username>/installed/python2.7/bin/python
        import sys, os
        
        # Add a custom Python path.
        sys.path.insert(0, "/home/<username>/<website-location>")
        
        # Switch to the directory of your project. (Optional.)
        #os.chdir("/home/<username>/<website-location>")
        
        # Set the DJANGO_SETTINGS_MODULE environment variable.
        os.environ['DJANGO_SETTINGS_MODULE'] = "<projectname>.settings"
        
        from django.core.servers.fastcgi import runfastcgi
        runfastcgi(method="threaded", daemonize="false")

## Conclusion

So hopefully after following this little tutorial, you too can get the newest version 
of django up and running on a hosted machine with no root access.  


