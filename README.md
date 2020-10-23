# functional-programming

## What does this project do?
In this project I'm showing the eye color and favorite color of CMD students in a list. By placing two buttons on the index.html I'm allowing the user to switch between the two data sets. All the colors are translated to boxes with the hexcode in it.

## Which Features have I used?
Using fetch I receive all the data from a .json file. The Data can't be shared due to privacy reasons. Therefore I have extracted only the eye color and favorite color.
To get the right column I'm using map() to get the specific colum, and change the data by using .replace to delete spaces, replace points to commas and delete hashtags.
I'm using Regex to find hexcode matching numbers. 
I've also tried using reduce in two ways: 
- By checking the occurance of each hexcode, returning the amount of times a hexcode is used. 
- By restructuring the whole dataset into a better readable dataset. (CleanAllData(json))

## Which Data am I using?
To experiment with functional programming we've been given a data set of CMD students to clean. I have chosen to clean the eye color column and the favorite color column.

## Installation Guide

```terminal
  git clone 
```
