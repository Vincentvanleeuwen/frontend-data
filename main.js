import {fetchAllData} from "./helpers/endPoints.js";
import { mapDataSets, mergeDataSets} from "./modules/cleanData.js";
import { convertToJSON } from "./utils/convertToJSON.js";

const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
  'https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=7000',
  'https://opendata.rdw.nl/resource/t5pc-eb34.json'];


fetchAllData(endPoints)
.then(result => convertToJSON(result))
.then(json => mapDataSets(json))
.then(mappedResult => mergeDataSets(mappedResult))
.then(mergedData => {

  console.log('Merged Data !=!=!=!=!', mergedData);

})
.catch(err => console.log("FetchError - ", err));




