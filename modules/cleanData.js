// Filter all data sets by these columns
import fetch from "node-fetch";

const allowedColumns = ['areaid', 'chargingpointcapacity', 'areageometryastext', 'capacity'];

// Fetch the database URL
export const fetchAllData = async (endPoints) => {

  const allEndpoints = endPoints.map(endPoint => fetch(endPoint));
  return Promise.all(allEndpoints);

};

// Filter allowed columns from data sets
export const mapDataSets = (endPoints) => {

  // Loop through the available data sets
  return endPoints.map(endPoint => {

    // Loop through each entry of the data set
    return endPoint.map(entry => {

      // Loop over each object from an endPoint
      let newEntry = Object.entries(entry).map(column => {


        // Check if the key doesn't match one of the allowed columns
        if(!allowedColumns.includes(column[0])) {
          console.log('new entry =', column);
          delete column[0];
          delete column[1];

        } else {

          return column;

        }

      });

      // Return all entries that are not undefined
      return newEntry.filter(entry => entry !== undefined);


    });

  });

};


// Merge both data sets into one data set.
export const mergeDataSets = (endPoints) => {

  const chargingPointData = endPoints[0];
  const geoLocationData = endPoints[1];
  // const geoLocationData = endPoints[2];

  return chargingPointData.reduce((acc, cur) => {

    // Check if there is a match between the two entries
    const match = geoLocationData.find(entry => entry[0][1].includes(cur[0][1]));

    if(match) {

      // Merge entry of chargingPointData with entry of geoLocationData
      let merged = [...cur, ...match];

      // Delete the double entry
      delete merged[2];
      let filtered = merged.filter(entry => entry !== undefined);

      // Push to Accumulator
      acc.push(filtered);


    }

    return acc;

  }, []);

};

// Restructure both Datasets
export const restructureDataSets = (json) => {

  // -- 0:{ areaid: '', charginpoint: '', geoloc: ''}

};

