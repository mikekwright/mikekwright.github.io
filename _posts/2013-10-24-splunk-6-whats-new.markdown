---
layout: post
title: "Splunk 6 - Whats New"
date: 2013-10-24 22:56
comments: true
categories: 
- splunk
- web development
---

Today we had a Tech Talk at work that was focused on our organizations upgrade to the newly
released Splunk 6, and all its bells and whistles.  This presentation was given by James
Brodsky, a Sr. Sales Engineer from Splunk. 

<!-- more -->

There are 3 main usage feature changes that have occured in splunk 6.  The main focus of these
upgrades are focused on increasing "non-technical" user experiences.  

* Pivot
* Data Model
* Analytics

Also rather than reading through the below notes, you can also go through a 
[great tutorial](http://docs.splunk.com/Documentation/Splunk/6.0/PivotTutorial/WelcometothePivotTutorial)
that introduces these new features. 

## Pivot

The idea behind pivot is to utilize data models and graphical options to generate advanced 
queries.  When using a pivot the user only needs to select the data model to use to view 
the pivotal data, and from there they can utilize simple combo boxes and links to create
specific queries to use.  

There is also an option to use Pivots as a starting point, and once you have filtered to the 
data you would like to see, you can convert the pivot to a search allowing you to use 
more advanced operations.  This is achived using the *pivot* search command.  It is also 
common to start the search with a | that has no start search, allowing for an "implicit search"  

For a much more indepth look at pivots, please view the Splunk 6 
[documentation](http://docs.splunk.com/Documentation/Splunk/6.0/Pivot/IntroductiontoPivot).   

## Data Model

Data Models are fantastic, they are simply a meaningful representation of the underlying
raw machine data. They are especially useful in allowing users to be consuming exactly 
the same data in their searches, rather than having each one define their own search 
attempting to gather the data (which will often be different).    

To start creation on a Data Model you first need to understand how the model is setup. 
The model is based on constraints against the data.  This allows for Data Models to be
hierarichal by building the constraints on top of the previous constraint.  This idea
of constraints is completed by basically appending narrowing search fields. 

        index=production sourcetype=tomcat jvm=7

Because these constraints are based on the splunk search language, you can also use
lookup tables when creating the data model, or other auto-extracted fields like sums
that can be calculated rather than found in the data.  

The key tie in for Data Models is their availability to use the new acceleration feature
that can return data upto 1000x faster.  

### Acceleration

To help to speed up searches that use these data models, splunk has implemented 
Analytics Store. **Note: This will increase storage and processing cost.** The way
this store works, is that it creates a custom index (basically) that will hold the 
data that is consumed by the data model.  It is a sliding window store, so there is
an initial increase in used storage when created, but after that should be relatively
stable in and out (as long as the incoming longs are pretty set).   

So here are the main benefits of an Analytics Store

* Benefit from Data Model requests for speed (up to 1000x faster)
* Allows for time sections for the increased analytics

## Analytics 

There have been some new items that are integrated with Splunk 6 to increase its analytics. 

### Maps

* Integrated GEO-IP map that display geopraphic data
* MaxMind is the GEO backend licensed through Splunk 

### Predictive Analysis

* Predict command on time series search 
* Includes system capacity and resource utilization  
* Faster, More Accurate and Flexible

### Rich Developer Environment

* [Dev Site](dev.splunk.com)
* Rapidly build pslunk apps using web technologies
* SimpleXML conversion to HTML5 / Javascript
* Examples and integration using [D3](d3js.org) javascript. 
* Allow for token passing easily in dashboards. 

## Changes in App Usage

As well as all these added features, there are some other features targeting just standard
use of splunk.  

* Drill down now has multiple options - None (Yeah), Inner, Outer and Full
* Search page additions - Inspect Search, Background Run, Progress Bar
* Apps show up on Home Page (Drag Drop capable)
* Time Picker broader selection

## Other items

Splunk also now has a 
[Splunk Hadoop Connect](http://www.splunk.com/view/hadoop-connect/SP-CAAAHA3)
 
## Deprecation 

Well after a great show of the new features, we now get to show the newly deprecated 
items, which is always best to keep till last. Luckily for this deprecation there is really
only one thing that was brought up. 

* Advanced XML Feature for Dashboards

