import 'regenerator-runtime/runtime';
import { fetchAllData } from "./helpers/fetchData.js";
import {
  mapDataSets,
  mergeDataSets,
  changeToPlaceName,
  restructureDataSets
} from "./modules/cleanData.js";
import { convertToJSON } from "./utils/convertToJSON.js";
import {
  select,
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear
} from "d3";

const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
                   'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=5000'];


fetchAllData(endPoints)
.then(result => convertToJSON(result))
.then(json => mapDataSets(json))
.then(mappedResult => mergeDataSets(mappedResult))
.then(mergedData => changeToPlaceName(mergedData))
.then(cleanedData => restructureDataSets(cleanedData))
.then(restructuredData => {

  console.log(restructuredData);

  const data = restructuredData;
  // console.log(data.map(d => console.log(d)));

  // console.log(data.Alkmaar);
  const keys = [];
  const values = [];
  Object.entries(data).forEach(entry => {
    const [key, value] = entry;
    // console.log(key, value);
    keys.push(key);
  });
  //
  // console.log(keys);
  // console.log(values);

  const margin = {top: 10, right: 30, bottom: 90, left: 40},
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  // Create the graph container
  const graphContainer = select('#graph-container')
  .append('svg')
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 500 500")
  .classed("graph-content", true);

  // Create X Axis
  const x = scaleBand()
  .domain(data.map(d => d))
  .range([0, 2000])
  .padding(1);

  // Add X axis to the graph
  graphContainer.append('g')
  .attr("transform", "translate(0," + width + ")")
  .call(axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create Y Axis
  var y = scaleLinear()
  .domain([0, 20000])
  .range([height, 0]);

  // Add Y axis to the graph
  graphContainer.append("g")
  .call(axisLeft(y))
  .style("fill", "#69b3a2");




})
.catch(err => console.log("FetchError - ", err));

