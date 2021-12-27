---
Title: "Sort2013 Part III: Machine Learning in Python"
Date: 2013-10-19 22:43
Category: conferences
Tags:
 - sort
 - python
 - machine learning
---


I haven't done much with Machine Learning since graduating from school years ago.  However
recently there have been a number of projects where the use of machine learning can bring 
a significant benefit.  This lecture was a great refresher and introduction to how 
task can be accomplished using python.    

Why should we focus on machine learning now?    

The power of a machine learning algorithm is its ability to **GENERALIZE** from a finite set of examples.      

<!-- more -->
* Database mining - Large Dataset from growth and automation, web click data, etc
* Can get a better feel for total number of people with the flu on the [web faster than hospitals](http://www.google.org/flutrends/us/#US)
* Hard by hand app development - Handwriting Recognition, Computer Vision, Language Processing
* Self-customizing programs - Netflix, Amazon product recommendations, Google ads, etc
* Prediction - Continuous outcomes, Catgorical outcomes like email spam

## Clustering

*Clustering is grouping all items that have a similiar relationship than items that appear
in other clusters*

There are a few types of clustering and how
[the compare](http://scikit-learn.org/stable/auto_examples/cluster/plot_cluster_comparison.html).
Below is alist of this different cluster types.    

* MiniBatchKMeans
* AffinityPropagation
* MeanShift
* Spectral
* Ward
* DBSCAN
* K-Means

In the lecture he specifically covered K-Means clustering.    

### K-Means clustering 

Allows you to take a feature vector and figure out how the information should group 
together (correlate)  

Given a training data set and a number of clusters find the position of the centroids. 
However the weakness you have with K is that you need to specify a number to begin 
with for it to use with grouping.   

It is often used with Image Color Compression (Converting a 16-bit image to a 6-bit image). Which 
is accomplished by Replace each pixel color in the original with the color of its nearest k-means centroid.  

Advantages

* Simple to implement
* Usually very fast
* Works well for many applications

Disadvantages

* Have to know number of clusters in advances
* Linear Partitioning
* Outcome **can** be dependent on initial centroid position (so run multiple times with different centers)
* Isn't perfect at grouping data that isn't seperated by equal distance (Like multiple Curves being associated instead of blobs)

## Regression Prediction (Intuition)

### Intuition

* Supervised learning
* Generating a graph based on points and finding the line (2D Linear Regression)
* This is done by finding the minimal error in the generated line given the total number of points. 

### Gradient Descent

* Define a cost function that reflects the total error as a function of the regression parameters
* Find the parameters that then minimize the cost function
 -> Start with Random parameter values
 -> Adjust parameters by some step (directly in proportion to the cost function results)
 -> Repeat until parameters no longer change

## Classifiers

* Supervised learning - training set includes "truth"
* Categorical outcomes (Gaussian Mixture Model - GMM and other probabilitstic classifiers)
* Examples
  -> Logistic Regression
  -> Support Vector Machine
  -> Decision Tree

### Metrics

Precision: *percentage of the objects classified as A, really are A*  
Recall: *Of all the A objects the percentage that we actually classified as A*   

### Decision Tree

* Object to be classified has an associated set of properties
* classifier can be constructued as set of rules

Fruit & Vegetable Example  

* Properties
  -> size
  -> shape
  -> color
* Rules
  -> if size is small ^ shape is round ^ (color is green v color is red)
  -> etc

Can be constructed working with a tree that sets what is there where every leaf from a root becomes a new rule   

Classifiers can be set using *entropy* - A coin toss has an entropy of 1 bit. The highest information gain will have the least entropy (unpredictability).   

Overfitting is a disadvantage because it doesn't create the clear seperation necessary, this can be solved using "Random Forests" or multiple decision tress.   

## Python 

The main question that one might ask is why to look into python as the language for 
machine learning. Well it turns out that Python has basically become the defacto 
standard for scientific tools and languages.    

Books  

* Python for Data Analysis   

Libraries

* Numpy
* Scipy
* [Scikit-learn](http://scikit-learn.org/stable/)

## Resources   

Kaggle.com is a machine learning competition problem.    

Coursera classes

* Machine Learnining - Standford
* Intro to Data Science - University of Washington
* Discrete Optimizations 



