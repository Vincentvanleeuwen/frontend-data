# frontend-data

## What does this project do?

The newspaper "De Volkskrant" asked us to look at data from the RDW and create a concept that will be interesting enough for a data journalist to write an article about.
I've come up with an interesting research question about the RDW data.

*"How does changing to an electric car impact your parking availability in Amsterdam?"*

My expectations for this research question are that it's going to be a lot harder to find a parking spot. Especially if you need to charge your car.
For a more detailed overview, check [Research Questions](https://github.com/Vincentvanleeuwen/functional-programming/wiki/The-Research-of-the-Data)

## Which Features?

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
- ChargingPointCapacity

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

## Live Preview


## Sources

People that helped: 
- Jonah Meijers (Reduce, Tuples)
- Robert Spier (Windows/Git problems & Map)

https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444


License: [MIT]
