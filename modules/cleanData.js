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
  'Schiedam', 'Den Bosch', 'Sittard',
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
        // console.log(column[1]);
        switch(column[1]) {
          case `'s-Hertogenbosch`:
            column[1] = 'Den Bosch';
            break;
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

export const restructureDataSets = (arr) => {
  console.log(arr);

  return arr.reduce((acc, cur) => {

    let location = cur[3][1];
    let capacity = +cur[0][1];
    let chargingPoints = +cur[1][1];

    // Check if location matches another entries' location, return the index
    const itemIndex = acc.findIndex(item => item.location === location);

    // Check if index exists
    if(itemIndex > -1) {

      // Add capacity/chargingpointcapacity to this object
      acc[itemIndex].capacity += capacity;
      acc[itemIndex].chargingPointCapacity += chargingPoints;
    } else {

      // Otherwise create a new entry
      const newItem = {
        location: null,
        capacity: 0,
        chargingPointCapacity: 0,
        type: null
      };

      // Add capacity, chargingPointCapacity, and location to entry
      newItem.location = location;
      newItem.capacity += capacity;
      newItem.chargingPointCapacity += chargingPoints;

      // Set the type of the entry
      if (!newItem.type) {
        // Check if town or city
        if (cities.includes(location)) {
          newItem.type = 'city';
        } else {
          newItem.type = 'town';
        }
      }
      acc.push(newItem);
    }
    return acc;
  }, []);
};
