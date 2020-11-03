import 'regenerator-runtime/runtime';
import { fetchAllData } from "./helpers/endPoints.js";
import {
  mapDataSets,
  mergeDataSets,
  changeToPlaceName,
  restructureDataSets
} from "./modules/cleanData.js";
import { convertToJSON } from "./utils/convertToJSON.js";
import * as d3 from "d3";

const endPoints = ['https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
                   'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=7000'];


fetchAllData(endPoints)
.then(result => convertToJSON(result))
.then(json => mapDataSets(json))
.then(mappedResult => mergeDataSets(mappedResult))
.then(mergedData => changeToPlaceName(mergedData))
.then(cleanedData => restructureDataSets(cleanedData))
.then(restructuredData => {

  console.log(restructuredData);

  const data = Object.keys(restructuredData);

  var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const graphContainer = d3.select('#graph-container')
  .append('svg')
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 500 500")
  .classed("graph-content", true);

// Add X axis
  const x = d3.scaleBand()
  .range([0, 1800])
  .domain(data.map(d => d))
  .padding(1);

  graphContainer.append('g')
  .attr("transform", "translate(0," + width + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

// Add Y axis
  var y = d3.scaleLinear()
  .domain([0, 20000])
  .range([height, 0]);


  graphContainer.append("g")
  .call(d3.axisLeft(y))
  .style("fill", "#69b3a2");




})
.catch(err => console.log("FetchError - ", err));

