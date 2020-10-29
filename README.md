# functional-programming

## What does this project do?

The newspaper "De Volkskrant" asked us to look at data from the RDW and create a concept that will be interesting enough for a data journalist to write an article about.
I've come up with an interesting research question about the RDW data.
*"How does changing to an electric car impact your parking availability in Amsterdam?"*
My expectations for this research question are that it's going to be a lot harder to find a parking spot. Especially if you need to charge your car.
For a more detailed overview, check [Research Questions](https://github.com/Vincentvanleeuwen/functional-programming/wiki/The-Research-of-the-Data)

In this project I'm also visualizing the eye color and favorite color of CMD students in a list. By placing two buttons on the index.html I'm allowing the user to switch between the two data sets. All the colors are translated to boxes with the hexcode in it. You can find the code in the directory "CMDSurvey". The Data can't be shared due to privacy reasons, so I have excluded this data set from the project. Therefore I've put a live preview at the bottom of this readme so you can still see the result.


## Which Features?

Using fetch I receive all the data from a .json file. 
To get the right column I'm using map() to get the specific colum, and change the data by using .replace to delete spaces, replace points to commas and delete hashtags.
I'm using Regex to find hexcode matching numbers. 
I've also tried using reduce in two ways: 
- By checking the occurance of each hexcode, returning the amount of times a hexcode is used. 
- By restructuring the whole dataset into a better readable dataset. (CleanAllData(json))

## Which Data am I using?
To find out how many charging points there are in Amsterdam I'm using RDW's dataset: [Specifications Parking Area](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s)
Needed columns:
- AreaId
- ChargingPointCapacity

However this data set does not tell us where each charging point is located.
To find out where these charging points are I'm using RDW's dataset:[Geometry Area](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEOMETRIE-GEBIED/nsk3-v9n7)
Needed columns:
- AreaId
- GeoDataAsText

In these two data sets I can compare the AreaID row, so I can find out where each charging point is located.

## Installation Guide

Navigate to the desired directory in your terminal. Once you've reached the directory, place the following code in your terminal.
```terminal
  > git clone https://github.com/Vincentvanleeuwen/functional-programming.git
  
  > cd functional-programming
  
  > npm start
```

## Live Preview

![Alt text](https://github.com/Vincentvanleeuwen/functional-programming/blob/main/media/datasetcolors.gif)


## Sources

People that helped: 
- Jonah Meijers (Reduce, Tuples)
- Robert Spier (Windows/Git problems)

https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444


License: [MIT]
