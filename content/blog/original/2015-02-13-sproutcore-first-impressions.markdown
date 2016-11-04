Title: "SproutCore - First Impressions"
Date: 2015-02-13 10:43
Category: development
Tags: preview, ruby, javascript

Today I decided to spend a little time to try out the sproutcore web framework, 
which has a lot of strengths centered around using appropriate programming practices.   

<!-- more -->

## What is Sproutcore

Sproutcore is a framework that allows you to write the code in Javascript and has that code
run on both the server and client.  It is a very powerful library that can help you to create
web applications, not to extend your existing site.  

## Overview

To install sproutcore is pretty straight forward, at the time I ran it I was only able to get 
it to successfully work with Ruby 1.9.3 (Ruby 2.0+ failed).  To install it is as simple as 
installing a ruby gem and calling the appropriate commands.  

Like most new webframeworks, it provides a cli that gives you simple commands that can be used
to generate a scaffold for you to use when building your application.  

It provides a number of rich elements for you to quickly consume and use to develop web 
applications.  This means that to be successful at using Sproutcore you will need to learn 
an entirely new way of developing for the web. 

## Personal Thoughts

I went throught the quick start, up to the point that a create todos application was complete. 
There are a few things that I really enjoyed about the framework, mainly when I could extend 
some existing functionality, however I found that there is a lot of more of a black box there
then I am usually comfortable with. 

I love the idea of working with a set state machine.  This is such a fundamental concept, since
most applications are nothing more than a sequence of states and their paths of migration between
each state.  

A simple state design for the application would look like this:

    App.STATE_NAME = SC.State.design({
      enterState: function() {
        ... 
      },

      exitState: function() {
        ...
      },

      customState: function() {
        ...
      }, 

      request: function() {
        ...
      },
    });

This defines a single state and the different substate that a given state could be in.  When 
your application is working with many states you will want to first update the `statechart.js`
file that is found in the root of your application.    

After defining the states, you will then need to tie the different states into the controllers, 
models and view.  This is where you will start to take advantage of the sproutcore supplied 
constructs such as `SC.Record` and `SC.ArrayController`, etc. 

## Conclusion

All in all this framework seems like it is very powerful, but with great power can com great
complexity and that is what I have found in Sproutcore.  From other frameworks I have worked
with, this is one that even with a cursory glance, I feel like I still have no idea where to 
go now.  


