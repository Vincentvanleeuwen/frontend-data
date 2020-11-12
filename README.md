# frontend-data

## What does this project do?

The newspaper "De Volkskrant" asked us to look at data from the RDW and create a concept that will be interesting enough for a data journalist to write an article about.
I've come up with an interesting research question about the RDW data.

*"How many charging points do parking garages have in comparison to parking spots in different towns and cities in The Netherlands?"*

My expectations for this research question are that there'll be much fewer charging points than parking spots. 
For a more detailed overview, check [Research Questions](https://github.com/Vincentvanleeuwen/functional-programming/wiki/The-Research-of-the-Data)

## Which Features?

I've implemented interactivity by giving the user the possibility to change the axis. On the Y-axis you can change from cities to towns. On the X-axis you can change from parking spots to charging points.
There are also tooltips when you hover over each lollipop. Here you can see the exact amount of parking spots/charging points per city/town

### Volkskrant

- Fetch all data
- Convert data to JSON
- Map data, delete unnecesarry columns.
- Merge two datasets based on AreaId using Reduce
- Filter empty entries

## Which Data am I using?

To find out how many charging points there are in Amsterdam I'm using RDW's dataset: [Specifications Parking Area](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s)

Needed columns:
- AreaId
- chargingPointCapacity
- capacity

However this data set does not tell us where each charging point is located.
To find out where these charging points are I'm using RDW's dataset: [GEO PARKEER GARAGES](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34)

Needed columns:
- AreaID
- AreaDesc

In these two data sets I can compare the AreaID row, so I can find out where each charging point is located.
The AreaDesc shows the name of the parking area and the city.

## Functional Patterns

- [Currying and Composition](https://github.com/Vincentvanleeuwen/functional-programming/wiki/Functional-Programming)
- [Filter()](https://github.com/Vincentvanleeuwen/functional-programming/wiki/Filtering-a-Reduced-Array)
- [Reduce()](https://github.com/Vincentvanleeuwen/functional-programming/wiki/What-the-Reduce%3F!)

## Installation Guide

Navigate to the desired directory in your terminal. Once you've reached the directory, place the following code in your terminal.

```terminal
  > git clone https://github.com/Vincentvanleeuwen/functional-programming.git
  
  > cd functional-programming
  
  > npm start
```
You can now preview the chart at localhost:1234/

## Live Preview
https://vincentvanleeuwen.github.io/frontend-data/

## Sources

People that helped: 
- Jonah Meijers (Reduce, Tuples, find)
- Robert Spier (Windows/Git problems & Map)

https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444

https://www.d3-graph-gallery.com/graph/lollipop_horizontal.html

License: [MIT]
