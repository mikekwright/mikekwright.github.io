---
layout: post
title: "Docker and Continuous Delivery"
date: 2015-02-06 14:35
comments: true
categories: 
- AWS
- Docker
---

I am a huge fan of continuous delivery, of release code as soon at it is written and passes the
automated test gates.  I am also a fan of having a deployment system that can be more closely 
managed by me (the engineer).  Using docker at work we have been able to create a system that 
allows us to define a running container and using gates, continuously deploy this simple container
to many different environments (stage, prod, etc).  

<!-- more -->

Historically, one of the more difficult tasks that we are faced with in computing is the ability
to gaurentee that the application you develop on your local laptop will work correctly on a 
production instance.  While not even Docker is full proof in this area, I believe that it has 
helped us to mitigate this issue and allows our stage and production systems to be closer aligned. 


