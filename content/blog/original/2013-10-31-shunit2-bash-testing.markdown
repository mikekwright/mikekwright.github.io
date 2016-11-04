Title: "shUnit2 - Bash Testing"
Date: 2013-10-31 22:03
Category: development
Tags: testing, bash

So I have been working on the platform team at work for the last 2 years, and during this time
we have had to not only write some code in Java and Ruby but also to write a number of bash
scripts to help with management of systems.  I'm a huge proponent of unit testing and especially
of TDD.  

Since we have had a goal recently to make sure we are meeting minimum code coverage
requirements on all of our tools I have looked into what it would take to unit test our bash
scripts.  Luckily there is an engineer who is already doing some bash testing on another 
team and he pointed me towards shUnit2 and some example projects they are using it with inhouse.  

In this post I am going to cover the areas of shUnit2 that I have found to be the most useful, 
and how the process of mocking and other interactions could be handled.  

<!-- more -->

## shUnit2

[shUnit2](https://code.google.com/p/shunit2/) is an xunit style testing framework made to 
work with Bash scripts.  It has a very simple setup process on my systems (especially 
debian-based systems).   

### Installation 

To install shUnit2 on a debian based system you only need to run the below command. 

        apt-get install shunit2

If everything is setup correctly you should see output similiar to that below. 

        $ shunit2

        Ran 0 tests. 

        OK

You can also manually install it by downloading the latest build from 
[code.google.com](https://shunit2.googlecode.com/files/shunit2-2.1.6.tgz). This is actually
a nice thing to pull down as it contains some useful examples for shUnit2. After pulling it 
you will need to add it to your path for usage. 

        wget https://shunit2.googlecode.com/files/shunit2-2.1.6.tgz
        tar -xvf shunit2-2.1.6.tgz
        PATH=$DIRSTACK/shunit2-2.1.6/bin:$PATH
        shunit2

### First Tests

The easiest way to start learning a framework is often to use the framework, so lets quickly
jump in using an example test.  

Open up your favorite text editor and enter the code defined below.  

[gist:id=7325445,file=my-first-test.sh]

Now to run this test you will need to make a few changes to the file, which for this case
lets have the file called `my-first-test.sh`

        $ chmod +x my-first-test.sh
        $ ./my-first-test.sh
        
        testMyComparison  

        Ran 1 tests.

        OK

If this doesn't work, check a couple of things that might be the cause. 

* shunit2 should be in the path
* function name starts with lowercase 'test'
* assertTrue comparison has correct spacing and quotes - `"[ 1 -eq 1 ]"`

### Assertions

One of the most important part of tests is making sure that the test is descriptive
in what it is trying to accomplish. To help achieve this these xUnit frameworks will 
often include a number of different assertions that can help to make the code more
readable.    

This is the list of current assertions as of version 2.1.6  

* assertEquals [message] expected actual
* assertSame [message] expected actual
* assertNotEquals [message] expected actual
* assertNotSame [message] expected actual
* assertNull [message] value
* assertNotNull [message] value
* assertTrue [message] condition
* assertFalse [message] condition

There are a couple of things to be aware of when using these assertions, especially the 
assertNull and assertNotNull calls.  They are used to compare a null in bash which is a 
zero length string.  

### Failures

Next to assertions you also have failures that you can place in your code to automatically
trigger the test to fail and execution to stop.  This is a list of the different failures
that are supported in shUnit2.   

*Note: failures are not for value comparisons, if you need this functionality use assertions*  

* fail [message]
* failNotEquals [message] unexpected actual
* failSame [message] expected actual
* failNotSame [message] unexpected actual

## Code Dependencies

One of the common situations that you will run across with unit testing is making sure that
your code is testing the smallest piece possible, which can help you quickly and easily 
find bugs that could show up, and give you better confidence with refactoring.    

In most other languages this is accomplished using mocking frameworks (java and mockito, 
.net and rhinomocks). In bash I have not yet found a framework that successfully mocks 
calls that could be made from the bash scripts, so instead the process that I recommend 
is accomplished using PATH manipulation and running calls.  

Lets start with a simple script that is used to pull down a sample configuration using 
wget and then executes the configuration.  `configRetriever.sh`

[gist:id=7325511,file=configRetriever.sh]

Now that we have our test file, there are two more files that we need, the tests and 
also a mock of wget.  So lets first start with the mock. `wget`

[gist:id=7325539,file=wget] 

And finally the actual tests. `configTests.sh`  

[gist:id=7325587,file=configTests.sh]

A couple of things to point out from here, I am adjusting the path before each test and I am
restoring it after a test using the `setUp()` and `tearDown()`.  It is important to make 
sure that you are forcing a clean slate for each test, so you don't get false negatives (or
positives for that matter).  

The next important thing to see is how to hide or handle output from the running script, 
you should do this otherwise you might find it hard to find the alerts from test outputs
that are run.  

## Conclusion

So after getting my feet a little wet with shUnit2 and using path manipulation to handle
script internal calls, I have to say that I think bash unit testing is much easier 
than I had originally figured and am excited to move forward with testing my scripts. 

