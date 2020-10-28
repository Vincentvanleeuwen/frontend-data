# functional-programming

## What does this project do?

In this project I'm showing the eye color and favorite color of CMD students in a list. By placing two buttons on the index.html I'm allowing the user to switch between the two data sets. All the colors are translated to boxes with the hexcode in it.

Furthermore I've come up with a research question about the RDW data.
"How does changing to an electric car impact your parking availability in Amsterdam?"
My expectations for this research question are that it's going to be a lot harder to find a parking spot. Especially if you need to charge your car.
For a more detailed overview, check [Research Questions](https://github.com/Vincentvanleeuwen/functional-programming/wiki/The-Research-of-the-Data)
## Which Features?

Using fetch I receive all the data from a .json file. The Data can't be shared due to privacy reasons. Therefore I have extracted only the eye color and favorite color.
To get the right column I'm using map() to get the specific colum, and change the data by using .replace to delete spaces, replace points to commas and delete hashtags.
I'm using Regex to find hexcode matching numbers. 
I've also tried using reduce in two ways: 
- By checking the occurance of each hexcode, returning the amount of times a hexcode is used. 
- By restructuring the whole dataset into a better readable dataset. (CleanAllData(json))

## Which Data am I using?

To experiment with functional programming we've been given a data set of CMD students to clean. This data can't be shared publicly, so I have excluded this data set from the project. I have chosen to clean the eye color column and the favorite color column.

For my research question I'm using data from the RDW about the specifications of a parking area. 

## Installation Guide

Navigate to the desired directory in your terminal. Once you've reached the directory, place the following code in your terminal.
```terminal
  git clone https://github.com/Vincentvanleeuwen/functional-programming.git
```
You can now open index.html to check the project.

## Live Preview

![Alt text](https://github.com/Vincentvanleeuwen/functional-programming/blob/main/media/datasetcolors.gif)


## Sources

People that helped: 
- Jonah Meijers (Reduce, Tuples)
- Robert Spier (Windows/Git problems)

https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444


License: [MIT]
