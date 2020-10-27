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

  mapDataSets(json);

}).then(mappedResult => {

  console.log(mappedResult);

});

// Filter allowed columns from data sets
const mapDataSets = (endPoints) => {

  console.log(endPoints);

  // Loop through the available data sets
  const mappedData = endPoints.map(endPoint => {

    // Loop through each entry of the data set
    endPoint.forEach(entry => {

      // Loop over each object from an endPoint
      for(const [key, value] of Object.entries(entry)) {

        console.log('BeforeDelete====', Object.entries(entry));

        // Check if the key matches one of the allowed columns
        if(allowedColumns.includes(key)) {

          return entry[key];

        } else {

          // Delete entry if it doesn't match
          delete entry[key];
          delete entry[value];
          console.log('afterDelete=====', Object.entries(entry));
        }
      }
    });

  });

  console.log(mappedData); // Returns [undefined, undefined] ?

  console.log('afterDelete=====', endPoints);
};

// const filterByColumn = (obj) => {
//
//   return allowedColumns.forEach(allowedColumn => {
//     // console.log('ALLOWED COLUMN', allowedColumn);
//     console.log('OBJECT', obj[allowedColumn]);
//     return obj[allowedColumn];
//   });
//
// };


// Merge both data sets into one data set.
const mergeDataSets = (json) => {

  // -- Check for overlapping areaid's
  // -- Delete doubles.
  // -- Merge singles.

};


// Restructure both Datasets
const restructureDataSets = (json) => {

  // -- 0:{ areaid: '', charginpoint: '', geoloc: ''}

};


