---
Title: "Let's do some Weld-ing"
Date: 2015-10-12 14:28
Category: development
Tags:
 - java
 - dependency injection
---

So I am no stranger to dependency injection (DI), having used it for many years (starting with 
RhinoMocks on .net).  For my new company they are using a CDI implementation (Weld) which is one
framework that I have yet to use, so today I go over my experience with using this framework.  

<!-- more -->

## Introduction

So what is [weld](http://weld.cdi-spec.org/) you might be asking.  Well Java in their "infinite"
wisdom, created a standard for the language to be set around dependency injection, or more 
specifically around ["Contexts and Dependency Injection for the Java EE Platform"](https://www.jcp.org/en/jsr/detail?id=299). 
This is known as JSR 299.     

Since this standard was created (back in Dec. 2009) there are a few implementations of this 
standard.  OpenWebBeans and CanDI are two of the other implementations, however for this article 
I will specifically be covering the JBoss Weld implementation.     

This specific implementation is for Java EE, however if you are using Java SE there is another 
standard that was created as well [JSR 330 - "Dependency Injection for Java"](https://jcp.org/en/jsr/detail?id=330)    
this is actually the standard that is implemented by Guice and Spring.  However Weld itself will
also work in a Java SE environment.     

## CDI Standard

One of the benefits of working with a standard when specifying DI mechanism, is that it can 
abstract your implementation from the specific details that can a framework may have setup. This
in turn can allow you the option of swapping out implementations easily to determine which one
works best for your given scenario, or to easily replace a community technology that has lost
traction.     

## Weld

So how do we use weld?  Well the starting point is pretty simple, in the case of a wildfly 
server, all that you would need to do is to create an application that wildfly can use and 
add an associated pom to load the Weld libraries.  

### Setup

If you would like to follow along, these are the instructions that I used when testing out weld
with wildfly.  The tools I used are listed below (with their associated versions).  

1. Docker - 1.8.1
2. Maven - 3.3.3
3. Wildfly - 9.0.1 Final
4. Weld - 1.2

Once these tools have all been installed the first thing you will need to do is to create
a maven project that works for this environment.  Luckily there is a usable archetype that we
can start the process from.  So run the below command (filling in your specific details).  For 
this tutorial the project name that is created will be called 'weld-tutorial'.    

    mvn archetype:generate -Dfilter=org.wildfly.archetype:wildfly-javaee7-webapp-archetype    

Once the project has been created, enter the weld-tutorial directory and edit the pom.xml file. Add
the below block to the dependencies section.  

        <dependency>
          <groupId>javax.enterprise</groupId>
          <artifactId>cdi-api</artifactId>
          <version>1.2</version>
          <scope>provided</scope>
        </dependency>

At this point you should be able to build the maven project to created our deployable war. 

        mvn clean install
        ls target/*.war

Now we need to specify an application instance that this container can run in, so docker
to the rescue.  Below is the `Dockerfile` that I created to pull down the created wildfly image
and add our applications war file to the image.   

        FROM jboss/wildfly:9.0.1.Final
        ADD target/weld-tutorial.war /opt/jboss/wildfly/standalone/deployments/ROOT.war

Save this `Dockerfile` and run the below commands and we should have our application up
and running.    

        docker build -t weld-tutorial .
        docker run -it -p 8080:8080 weld-tutorial  

### Simple Details

The core item that we need to discuss, is (of course) how to actually enable DI within this 
framework.  Lucky for us, if you are starting from the archetype defined above a lot of the 
plumbing has already been completed for you, leaving you to just add new functionality as
you see fit.     

Lets start by creating a new "Service" that can be used to log the message 'Hello world' when
the service `call` method is executed.  To do this, we first add a new class called 
`HelloWorldService` inside the service package of the application.   

For this class we actually have our first dependency, logging.  Now historically logging can
be created by just using a static lookup (such as getInstance).  With our implementation it is
already provided by the `Resources` class, so we just need to inject a copy into our class. This 
is done simply using the `@Inject` attribute on the private member we need filled.  

        @Inject
        private Logger logger;

The one thing to note, is that since this is a property injection, we cannot use this object
within our constructor.  If we need to have it accessible inside the constructor, you can 
instead inject the dependency in the constructor itself, and save it to a variable.   

        private Logger logger;
           
        @Inject
        public HelloWorldService(Logger logger) {
            this.logger = logger;
        }

Of course this style makes it easier to run your tests with the need to have a corresponding 
framework, however this will run into problems later if you start requiring different scope 
functionality.    

Now that we have our dependency injected, lets see if we can get our service accessible from 
the rest service.  To do this we have to register our service with the system, stating the 
scope at which this service is usable.  The scope can be considered the life-cycle of the service
and there are a few different values (Although all based on @NormalScope).   

1. ApplicationScoped
2. RequestScoped
3. SessionScoped
4. ConversationScoped

If you want the scope to be driven by the class that requires it, you can just use the 
annotation `@Dependent` and it will have the same lifecycle as the class that requires it.    

The one thing to note is that if a class is annotated with the `@ApplicationScoped` attribute
but has a dependency on a service that is annotated with `@RequestScoped` a proxy will be created
in place.  This proxy will be used to deliver the thread specific dependency, while deliverying 
a single variable in the application scope class.  The one thing about this proxy, it has a 
very strict requirement, in that the class that is having the proxy must have a no-arg ctor.   

## Conclusion

While there isn't a lot of details around weld or cdi in this article, now that it is one
that I will be using extensively in my current position, I hope to share more details about
how we use it, what pitfalls we encounter and where it has saved our bacon.   



