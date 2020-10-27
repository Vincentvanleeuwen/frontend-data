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

}).then(result => {

  mapDataSets(result);

});

// Filter allowed columns from data sets
const mapDataSets = (endPoints) => {


  const allEndpoints = endPoints.map(endPoint => {

    endPoint.forEach(entry => {

      allowedColumns.forEach(column => {
        // console.log(column);
        // console.log(entry);
        console.log(entry[column]);
      });


    });
    allowedColumns.forEach(column => endPoint.column);


  });

  console.log(allEndpoints);
  // return json.map(entry => entry[allowedColumns[0]]);

  // return json.reduce((acc, curr, i) => {
  //
  //
  //
  //   return acc + i;
  // }, {});

};
const filterByColumn = (obj) => {

  return allowedColumns.forEach(allowedColumn => {
    // console.log('ALLOWED COLUMN', allowedColumn);
    console.log('OBJECT', obj[allowedColumn]);
    return obj[allowedColumn];
  });



};


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


