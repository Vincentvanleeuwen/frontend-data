// Filter all data sets by these columns
const allowedColumns = [
  'areaid',
  'chargingpointcapacity',
  'areageometryastext',
  'capacity',
  'areadesc'
];

// Filter allowed columns from data sets
export const mapDataSets = (endPoints) => {
  // console.log(endPoints);
  // Loop through the available data sets
  return endPoints.map(endPoint => {

    // Loop through each entry of the data set
    return endPoint.map(entry => {

      // Loop over each object from an endPoint
      let newEntry = Object.entries(entry).map(column => {


        // Check if the key doesn't match one of the allowed columns
        if(!allowedColumns.includes(column[0])) {
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
  const geoLocationData = endPoints[2];
  // const geoLocationData = endPoints[2];

  return chargingPointData.reduce((acc, cur) => {

    // Check if there is a match between the two entries
    const match = geoLocationData.find(entry => entry[0][1].includes(cur[0][1]));

    if(match) {

      // Merge entry of chargingPointData with entry of geoLocationData
      let merged = [...cur, ...match];

      // Delete the double entry

      // If entry is areaid delete it.
      if (merged[0][0] === "areaid") {
        delete merged[0];
      }

      let filtered = merged.filter(entry => entry !== undefined);

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

        switch(column[1]) {
          case 'Almere Buiten':
            // code block
            break;
          case y:
            // code block
            break;
          default:
            // code block
        }
      }

      return column;
    });

  });

};

// Restructure both Datasets
export const restructureDataSets = (json) => {

  // -- 0:{ areaid: '', charginpoint: '', geoloc: ''}

};

