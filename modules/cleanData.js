import { filterAllUndefined } from "../utils/filterAllUndefined.js";
import { firstLetterToUpperCase } from "../utils/firstLetterToUpperCase.js"

// Filter all data sets by these columns
const allowedColumns = [
  'areaid',
  'chargingpointcapacity',
  'areageometryastext',
  'capacity',
  'areadesc'
];

const cities = [
  'Alkmaar', 'Almelo', 'Amersfoort',
  'Amsterdam', 'Arnhem', 'Assen',
  'Bergen op Zoom', 'Breda',
  'Deventer', 'Doetinchem', 'Dordrecht',
  'Eindhoven', 'Enschede',
  'Gouda', 'Groningen',
  'Haarlem', 'Harderwijk', 'Helmond',
  'Leeuwarden', 'Leiden',
  'Maastricht', 'Middelburg',
  'Nijmegen',
  'Oldenzaal', 'Oosterhout', 'Oss',
  'Purmerend',
  'Rijssen', 'Roermond', 'Rotterdam',
  'Schiedam', 's-Hertogenbosch', 'Sittard',
  'Sneek', 'Terneuzen', 'Utrecht',
  'Venlo', 'Vlaardingen', 'Vlissingen',
  'Weert', 'Winschoten',
  'Zutphen', 'Zwolle'
];

// Filter allowed columns from data sets
export const mapDataSets = (endPoints) => {
  // console.log(endPoints);
  // Loop through the available data sets
  return endPoints.map(endPoint => {

    // Loop through each entry of the data set
    return endPoint.map(entry => {

      // Loop over each object from an endPoint
      return Object.entries(entry).map(column => {

        // Check if the key doesn't match one of the allowed columns
        if(!allowedColumns.includes(column[0])) {
          delete column[0];
          delete column[1];
        } else {
          return column;
        }
      })
      // Return all entries that are not undefined
      .filter(filterAllUndefined);



    });

  });

};


// Merge both data sets into one data set.
export const mergeDataSets = (endPoints) => {

  const chargingPointData = endPoints[0];
  const locationData = endPoints[1];

  return chargingPointData.reduce((acc, cur) => {

    // Check if there is a match between the two entries
    const match = locationData.find(entry => entry[0][1].includes(cur[0][1]));

    if(match) {

      // Merge entry of chargingPointData with entry of geoLocationData
      let merged = [...cur, ...match];

      // Delete the double entry

      // If entry is areaid delete it.
      if (merged[0][0] === "areaid") {
        delete merged[0];
      }

      let filtered = merged.filter(filterAllUndefined);

      // Push to Accumulator
      acc.push(filtered);

    }

    return acc;

  }, []);

};


export const changeToPlaceName = (data) => {

  return data.map(entry => {
    return entry.map(column => {
      // console.log('entry=' ,column);

      if (column[0] === 'areadesc') {

        column[0] = 'location';

        // https://stackoverflow.com/questions/6208367/regex-to-match-stuff-between-parentheses
        // trim everything before first and after last parenthesis
        column[1] = column[1].replace(/^[^(]*\(/, "")
                             .replace(/\)[^(]*$/, "");
        column[1] = firstLetterToUpperCase(column[1]);

        switch(column[1]) {
          case 'Almere Buiten':
            column[1] = 'Almere';
            break;
          case 'Almere Stad':
            column[1] = 'Almere';
            break;
          case 'Garage Boschplein':
            column[1] = 'Sneek';
            break;
          case 'Parkeergarage Emmawijk - Dek':
            column[1] = 'Zwolle';
            break;
          case 'Garage Oostwal-Oost':
            column[1] = 'Oss';
            break;
          case 'Ziekenhuis) (Rotterdam':
            column[1] = 'Rotterdam';
            break;
          case 'Heerhugowaard Centrum':
            column[1] = 'Heerhugowaard';
            break;
          case 'Garage Maasburg':
            column[1] = 'Maasburg';
            break;
          case 'Parkeergarage Station':
            delete column[1];
            delete column[0];
            break;
          case 'Carpool Nuenen A270':
            delete column[1];
            delete column[0];
            break;
          default:
            // code block
        }
      }

      return column;
    })
  // Only filter entries that contain a location
  }).filter(entry => entry[3] && entry[3][0]);

};

// Restructure both Datasets
// export const restructureDataSets = (arr) => {
//
//   return arr.reduce((acc, cur, i) => {
//
//     // Location, capacity, and chargingPoints
//     let location = cur[3][1];
//     let capacity = +cur[0][1];
//     let chargingPoints = +cur[1][1];
//
//     if(acc.cities) {
//       acc = [cities: {}, towns: {}];
//     }
//
//     // [
//     //   cities: {
//     //    {capacity: 0, location: Amsterdam, chargingPoints: 0}
//     //   },
//     //   towns: {
//     //
//     //   }
//     // ]
//
//     //If location doesn't exist
//     if(!acc.cities.location) {
//
//       if(cities.includes(location)) {
//         acc.cities[location] = { capacity: 0, chargingPointCapacity: 0};
//         acc.cities[location].capacity += capacity;
//         acc.cities[location].chargingPointCapacity += chargingPoints;
//       } else {
//         acc.towns[location] = { capacity: 0, chargingPointCapacity: 0};
//         acc.towns[location].capacity += capacity;
//         acc.towns[location].chargingPointCapacity += chargingPoints;
//       }
//
//     }
//
//     // Add capacity and chargingPointCapacity to location
//
//
//     return acc;
//
//   }, []);
// };
export const restructureDataSets = (arr) => {

  return arr.reduce((acc, cur) => {


    // -- 0:{ areaid: '', charginpoint: '', geoloc: ''}	    // Location, capacity, and chargingPoints
    let location = cur[3][1];
    let capacity = +cur[0][1];
    let chargingPoints = +cur[1][1];

    if (!acc.cities && !acc.towns) {
      acc.push({cities: {}, towns: {}})
    }
    //If location doesn't exist
    if (!acc.location) {

      if (cities.includes(location)) {


        acc.cities['location'] = location;
        acc.cities['capacity'] = capacity;
        acc.cities['chargingPointCapacity'] = chargingPoints;
      } else {
        acc.towns = {location: location, capacity: capacity, chargingPointCapacity: chargingPoints};
      }
      // Add location

    }

    // Add capacity and chargingPointCapacity to location
    acc['cities'].capacity += capacity;
    acc['cities'].chargingPointCapacity += chargingPoints;

    return acc;


  }, []);

};