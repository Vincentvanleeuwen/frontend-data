import 'regenerator-runtime/runtime';
import { fetchAllData } from "./helpers/fetchData.js";
import {
  mapDataSets,
  mergeDataSets,
  changeToPlaceName,
  restructureDataSets
} from "./modules/cleanData.js";
import { convertToJSON } from "./utils/convertToJSON.js";
import { passDataToD3 } from "./modules/d3graph.js";

const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
                   'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=5000'];


fetchAllData(endPoints)
.then(result => convertToJSON(result))
.then(json => mapDataSets(json))
.then(mappedResult => mergeDataSets(mappedResult))
.then(mergedData => changeToPlaceName(mergedData))
.then(cleanedData => restructureDataSets(cleanedData))
.then(restructuredData => passDataToD3(restructuredData))
.catch(err => console.log("FetchError - ", err));

