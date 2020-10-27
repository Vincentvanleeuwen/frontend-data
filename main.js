// endPoints[0] = charging points
// endPoints[1] = Geolocation (polygons/points)
const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json',
                   'https://opendata.rdw.nl/resource/nsk3-v9n7.json'];

// Filter all data sets by these columns
const allowedColumns = ['areaid', 'chargingpointcapacity', 'areageometryastext'];

// Fetch the database URL
const fetchData = async (endPoints) => {

  const response = {
    'chargingPoints': await fetch(endPoints[0]),
    'geoLocation': await fetch(endPoints[1])
  };

  console.log(response);

  return await response.json();
};

fetchData(endPoints)
.then(result => {
  console.log(result);

  const mappedDataSet = mapDataSets(result);
  console.log(mappedDataSet);
  
}).then(result => {

  console.log(result);

});

// Filter allowed columns from data sets
const mapDataSets = (json) => {
    json.map(column => allowedColumns.includes(column));
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


