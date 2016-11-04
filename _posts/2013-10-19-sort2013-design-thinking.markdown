---
layout: post
title: "Sort2013 Part II: Design Thinking"
date: 2013-10-19 22:43
comments: true
categories: 
- sort
- sort2013
- architecture
- software craftsmanship
---

This lecture was given by Brandon Gillespie and it was fantastic.  Below are my attempts 
at creating reasonable information based on the lecture given.  

This was a fantastic presentation that focused on delving into ideas of archiecture progress and 
helpful hints that can help keep an architect moving in the correct direction.  This session
did not have any focus on specific tools so should not be limited to a certain "type" 
of architect.  

<!-- More -->

To start there is a comment that I would share:  

*How often do we get stuck "looking at the 
shingles" as it where and forget what the real purpose of the "house" we are building was to 
begin with?*     

# Overview of "Architect" in IT

There are a few fundamental facets of a good architect.  

* Planning - *Managing Change across time and expectations*
* Analysis - *Decomposition of complex systems*
* Communication - *Trusted Translator*

## Planning

Planning is a fundamental aspect of architecture and design.  

* Principle element of design!  
* Need to constantly change and improve
* Changes takes A LONG TIME

To compare the importance of it changing, lets compare it to a spoken language. And when 
is a spoken language considered "dead"?   

**A Language is considered dead when it STOPS CHANGING**   

When you are planning there are a few key elements to put into play, for each plan you do.
First you need to "make sure you really know where you are going".  This is fundamental since 
the longer you are working on a plan the greater the likelyhood that you will run into a block 
in the road.  When you reach these blocks you will need to 'fork' your decisions to achieve 
your end goal, but if you haven't made sure where you are going you, these forks will end
up pushing you farther and farther away from your real goal. 

A great analogy of this behavoid can be found when compared to a farmer.  Imagine a farmar 
who is plowing the field. When you start plowing, farmers will pick a post or some other 
set point as a 'goal' for him to reach.  This "goal on the horizon" could be a fence post or
other landmark.  This allows him to move around rocks and other "blockers" when tilling, but
still make the original plan he had from the beginning.  

## Analysis

**Decompose Complex to Simple**   

The analysis section can be broken down into two seperate categories as well, A Perspective on 
time that helps us to better understand how long decisions and adaptions will take and 
Standards.    

### Perspective of Time

How we view the time we spend on a given problem or project allow us to can categorize 
the mindset that is used.   

* Operations - *Now to a few months*
* Engineering - *A few months to a year*
* Architect - *Years*

### Standards

Working from a baseline and seeing what the variant from the "standard" that we want to see.
You need to see the variant difference (through documentation) so that you can use it to 
better analysis and define a system.   

* Flexible, accomodating
* Allows for variances, documented by TCO

There are a couple of things that you will need to watch out for when working with Standards. 
The most important of these is to not create too many standards, especially those that 
[will be hard to adopt](http://xkcd.com/927/). You also need to make sure that your standards 
don't become a roadblock in the work you are doing. 

## Communication

This is a critical section that needs to be well thought out and understood. Infact this might
be more important than many of the other areas for an architect to be good at, since if they
can't communicate their thoughts and plans, those who were told will likely never achieve 
the expected results.  

*If you cannot explain something to me in a way I can understand it, than I assume 
that you don't understand it.*    

This means that if you are communicating with a relatively intelligent person you should 
be able to come up with some metaphor or story or description that can be used to help 
them understand. 

# Design Thinking 

*Methodology for execution of a vision*

To really get you in the mode, here are some insipring quotes

* Vision without Execution is Hallucination - *Thomas Edision*
* You can't plow a field simply by turning it over in your mind - *President Hinckley*
* A goal without a plan is just a wish - *Antoine de Saint-Exupery*

Design thinking is a form of solution-based thinking focusing on the *desired achievement* 
instead of the problem. This can help to properly bring vision to fruition (Designed vs 
Organic Result)     

Steps:

* Define
* Research
* Ideation
* Prototype
* Objectives
* Implemented
* Learn

## Define

When going through the Define process you should start by determining the issues that 
are going to be resolved.  These are the true needs of the application or project but
they are not the requirements.  Once these requirements have been defined, the next step
is to prioritize the effort in terms of urgency.  And finally, you need to have some 
measure that can be used to determine **what is considered success**.  

## Research

* Review history (Have we done this before, did we fail, why)
* Talk to end user - invite for design processes to specify needs (not requirements)
* Identify *thought leader's* and their roles

## Ideation

Clearly identify the needs and motivations of your end users (requirements analysis)  

Brainstorm
* Make sure the group idea is the same and focused on requirements

## Prototype

Prototype are *THROW AWAY* not "prototype for production", Sometimes you need to recognize and be able to express when the cost of 
keeping a prototype is more than re-writing. 

* Rapid
* Quicky understand direction
* Multiple different drafts
* *Reserve judgment, maintain neutrality in code* and *DON'T BE OFFENDED*   
* Be sure to create and present actual working prototypes.  
* Final result of a prototype should be able to create a refined selection of ideas

*Make sure you can quickly recognize when you are going the wrong direction*  

## Objectives

This is the align of the prototype and the real requirements.   

* Set aside emotion and ownership of ideas
* The most practical solution is not always the best solution

## Implementation

Never touch a production system, you can build a brand new environemnt in parallel and 
then cut over to it. This can make less man power to complete and may not as expensive.    

*Create and execute a custom implementation plan.*   

## Learn

Study what you implemented to learn what to do (or not do) in the future.   

## Pitfalls

* Negativity - People who only think why it won't work rather than a solution
* Fear
* Resistance 
* Devils Advocate - Good to have as long as you don't become a Negative person


