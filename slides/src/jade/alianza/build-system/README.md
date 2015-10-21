Build System
==========================================

This presentation was created to share ideas and direction with all engineers who were working
with me @ alianza at the time. It was to introduce a possible new tool to replace their existing
tool (Jenkins) when migrating services from a monolithic structure to microservices.    

The key areas that should be discussed:   

1. Go
2. Stash
3. Microservices
4. Docker

## GO

So the decision that was come to (hastily maybe, but still clear enough IMO) was to use the 
thoughtworks [go](http://www.go.cd) tool for our build system.  But to not rely on commands
that were written to run in go only, instead to create a `build` script that could be run on 
a local box as well.  This would simplify the pipeline on go, and be more likely to create a 
reproducable process on a developers box.  

This would also allow us to have a tool that could either be a companion too, or hopefully 
even replace the need for [snap-ci](http://snap-ci.com).  If this were to be done, then 
benefits that the FE engineers have created for their pipeline, could be reproduced for the 
benefit of all pipelines.    

## Stash

There are a few plugins that can be added to stash to help us in this build process.  The first
of these being the ability to have pull requests automatically built in the build pipeline (and
deployed to a testable environment).  This would enable us to better find failures in code changes
before those changes make it into our `dev` or `master` branches.  

It would also be beneficial to see how the code changes in a pull request meet our requirements
for both code coverage and to capture any *critical* code vialations.  There are a few plugins
that can be added to stash to enable visibility in the pull request of both of these features.   

## Microservices

One of the main goals of our team (the platform team) is to be able to more quickly deliver 
content to our customers.  To facilitate this change we need CI/CD and to achieve this goal
we need to have *microservices*.  While this is an overloaded term, the idea of the framework
used to achieve microservices isn't part of this discussion, only that the need for things to
be broken up is important.   

## Docker

While this isn't itself a direct requirement in achieving CI/CD, it does help to more easily 
create an environment that is reproducable and testable, both in development and on our local
boxes.  


