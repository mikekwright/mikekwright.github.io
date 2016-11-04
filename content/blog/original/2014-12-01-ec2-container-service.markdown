Title: "EC2 Container Service"
Date: 2014-12-01 11:18
Category: cloud
Tags: aws, ec2, docker

At AWS re:Invent (November 2014) a new technology was introduced. This was the AWS EC2 
Container Service.  A service provided by AWS to run docker containers on top of EC2 instances.   

<!-- more -->

We have been using docker for a while now within our organization, and I have to say that I
am a huge fan of Docker.  This is a great step in the right direction and I believe can help 
to decrease deploys to AWS while increasing stability and extensibility of a given architecture.   

## EC2 Container Service

At this point in time EC2 Container Service is still in preview, which means that you will need 
to request access to this preview in your own AWS account to follow this pattern.  However 
AWS does have some great material that will allow you to see the benefits of this new service
without requiring you to have preview access.  This material can be found 
[here](http://aws.amazon.com/ecs/getting-started/).   

## Service Breakdown

The main idea of this service is to give you the ability to create complese architectures that
can be broken down into smaller docker containers, which in turn can be deployed to a cluster 
of actual ec2 instances.  This meanst hat you could have a single m3.xlarge instance for your
application while keeping the database and application code seperate, but without requiring you
to have more instances than absolutely necessary.   

The service pieces are broken down into the following.  

1. Tasks
2. Containers
3. Clusters
4. Container Instances

### Tasks

Tasks are basically the starting point of your cluster deploy.  Anytime you want to deploy
your application you will start by defining the task.  Tasks themselves are defined as json
objects.  

    {
      "family": "application-name",
      "version": "9a56714245e7e603127",    -- This can be a simple version or git SHA1
      "containers": [
        << CONTAINER DEFINITIONS >>
      ]
    }

So with this json definition we are defining the entire application that we are providing, 
so if I had an application that acted as an API endpoint I would provide the load balancing
server as a container, the actual web server as a container and then a container for the
database (if one exists).   

When you have your task defined, you can register that task with EC2 Container Service 
to specify that you have the new task.   

    aws ecs register-task-definition --family "custom-name" --version "custom-version" definition.json

After you have registered the task and you have the cluster created you can run the 
task using the following command.  

    aws ecs run-task custom-name:custom-version    

### Containers

Container definitions are very simple and can follow a lot of the docker idioms in creation.  

    {
      "name": "container-name", 
      "image": "app-container:latest", 
      "cpu": 128,                        -- Note CPU is in units, defines the instances that can fit a given instance
      "memory": 512,
      "portMappings": [
        {
          "containerPort": 9443, 
          "hostPort": 443 
        }
      ], 
      "links": ["frontend"], 
      "essential": true
    }

So the main things to understand on this definition is the `cpu` field.  This represents the
unit of measurement for a cpu that should be used.  You can think of this as almost a percentage
of the total CPU to use (which I believe 100% would be 1024).  So if I wanted to use 50% of the
cpu for a given instance I would have `"cpu": 512`.   

The links is the list of containers that this container should reference, you can find information
about linking containers on the docker documentation site.  

Finally the essential flag is set to let the cluster know if the task is basically good or not. 
If a single container is essential, but cannot be created or fails to run, this would mean the 
task is not valid anymore.  

### Clusters

Clusters are basically grouping of container instances that are releated for a given task.  When
the cluster is first created it is empty and it then populates with container as requirements
come into play.   

AWS does have a command line tool that you can use to create a cluster.   

    aws ec2 create-cluster cluster-name

This will create a cluster an give you the ability to start creating container instances that
can be part of this cluster.   When this cluster is created you will be given an `arn` to 
reference this cluster. This is a very similar process to SQS, SNS, etc.    

### Container Instances

These are instances that AWS have setup with a `go` application (container agent) that will 
tie into the cluster mechanism.   

## Conclusion

While I have not yet been able to test out ECS I am very excited about this service and 
very excited about the flow they have created as I feel that it allows us to create much more
stable and scalable systems.   

Once I have access to the preview I will add my experiences in a follow-up post.  
