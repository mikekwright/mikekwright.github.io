---
layout: post
title: "Static Site Meandering"
date: 2013-10-15 20:06
comments: true
categories: 
- Frontend
- Research
- Ruby
- Python
- NodeJS
---

So, I don't know if I want to say that I am "late" to the game, but I can honestly say that I am glad I have finally moved to a static site generator for my blog posts.  Originally when I decided to use static github pages to host my blog, I had decided to be a little bit ambitious and create an entire system using angular and my "limited" frontend skills.  However after a few posts and the issues that it raised I decided to move to an existing static site generator.  

# AND I WAS BLOWN AWAY BY THE CHOICES

<!-- more -->

Much like any other items on the web there are a number of different static site generators that exist.  I wasn't able to go through and use all of them yet, but I decided I wanted to place the ones that I saw and my very quick experience with these generators.  These generators can be broken up by the language that is used in the generator.  

## NodeJS

* [Docpad](http://docpad.org) - This seemed to be the tool of choice for many nodejs devs, very powerful and rich *Most likely next candidate*
* [Wintersmith](http://wintersmith.io/) - "Flexible, minimalistic, multi-platform static site generator" - Site Description
* [Harp](http://harpjs.com/) - Another static frontend generator with an available [platform](https://harp.io)
* [Blacksmith](https://github.com/flatiron/blacksmith) - "A generic static site generator built using flatiron, plates, and marked." - Site Description
* [Scotch](https://github.com/techwraith/scotch) - "A really classy, dead simple, markdown based, blogging framework for node.js" - Site Description
* [Wheat](https://github.com/creationix/wheat) - A blogging framework that has a number of stars, but not recently updated (Over a year ago)

### [Yeoman Generators](http://yeoman.io)   

* [Armadillo](https://github.com/Snugug/generator-armadillo) - Generator for easily creating static sites for use with Github pages
* [Go Statis](https://github.com/colynb/generator-go-static) - Generator for site scaffolding and Grunt task execution


## Ruby

* [Jekyll](http://jekyllrb.com) - The core blog tool that is used by a number of sites, including github pages.  
* [Octopress](http://octopress.org) - Built on top of Jekyll
* [Nanoc](http://nanoc.ws/)
* [MiddleMan](http://middlemanapp.com/) 


## Python

* [Pelican](http://getpelican.com) - Light and simple static site generation in python *Most likely the candidate after Docpad*
* [Nikola](http://getnikola.com) - Uses doit for fast builds and has plugin capabilities
* [Mynt](http://mynt.mirroredwhite.com/) - Attempt at giving advanced CMS support to static blogs
* [Blogofile](http://www.blogofile.com/) - A generator for those obsessed with blogging
* [Frozen-Flask](http://pythonhosted.org/Frozen-Flask/) - Taking a flask application and turning it into static content

At this point I am happy with the choice to use Octopress, but I'm also finiky and will "most likely" migrate the blog to another technology in the future.  This is mostly because, if I am not learning something new, than what I am doing here ;-).  

# Resources

There were a few useful sites that I came across while checking these tools out, especially one that pointed to the numerous available python frameworks.  Those are listed below. 

* http://eristoddle.github.io/python/2012/05/16/python-static-web-site-generators/ 

