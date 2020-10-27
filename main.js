// endPoints[0] = charging points
// endPoints[1] = Geolocation (polygons/points)
const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json',
                   'https://opendata.rdw.nl/resource/nsk3-v9n7.json'];

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
  return chargingPointData.reduce((acc, cur, i) => {

    // For each question, create a question if it doesn't exist and push the answers
    geoLocationData.forEach(entry => {

      if(entry[0][1].includes(cur[0][1])) {

        let merged = [...cur, ...entry];

        acc[i] = [merged];
        // console.log('true!');

      } else {
        // acc[i] = [cur] || [entry];
        // acc[cur].push({entry});
      }
    });




    // console.log(acc);
    return acc;

  }, {});


  // -- Check for overlapping areaid's
  // -- Delete doubles.
  // -- Merge singles.

};


// Restructure both Datasets
const restructureDataSets = (json) => {

  // -- 0:{ areaid: '', charginpoint: '', geoloc: ''}

};


