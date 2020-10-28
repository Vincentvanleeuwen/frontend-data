// endPoints[0] = charging points
// endPoints[1] = Geolocation (polygons/points)
const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
                   'https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=7000' ];

// Filter all data sets by these columns
const allowedColumns = ['areaid', 'chargingpointcapacity', 'areageometryastext'];

// Fetch the database URL
const fetchAllData = async (endPoints) => {

  const allEndpoints = endPoints.map(endPoint => fetch(endPoint));
  return Promise.all(allEndpoints);

};


fetchAllData(endPoints)
.then(result => {

  // Loop through endPoints, convert them to JSON
  let dataSetsToJson = result.map(dataSet => dataSet.json());
  return Promise.all(dataSetsToJson).then(result => result);

}).then(json => {

  return mapDataSets(json);

}).then(mappedResult => {

  return mergeDataSets(mappedResult);

}).then(mergedData => {

  console.log('Merged Data !=!=!=!=!', mergedData);
});

// Filter allowed columns from data sets
const mapDataSets = (endPoints) => {

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
const mergeDataSets = (endPoints) => {

  console.log(endPoints);

  const chargingPointData = endPoints[0];
  const geoLocationData = endPoints[1];

  console.log(geoLocationData[0]);
  return chargingPointData.reduce((acc, cur) => {

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
const restructureDataSets = (json) => {

  // -- 0:{ areaid: '', charginpoint: '', geoloc: ''}

};


