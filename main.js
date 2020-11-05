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
  scaleLinear,
  max,
  create
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


  const data = restructuredData;

  const getPlaces = (type) => {
    return data.map(d => {
      if (d.type === type) {
        return d.location
      }
    })
    .filter(d => d !== undefined)
    .sort();
  };

  const type = 'city' || 'town';

  const margin = {top: 20, right: 20, bottom: 60, left: 100},
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  // Create the graph container
  const graphContainer = select('#graph-container')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append("g")
    .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
    .classed('graph-content', true);

  // Create X Axis  // Add X axis to the graph
  const x = scaleLinear()
  .domain([0, max(data, ( d => d.capacity ))])
  .rangeRound([0, width])
  .nice();

  graphContainer.append('g')
    .attr("transform", `translate(0, ${height} )`)
    .call(axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Create Y Axis
  var y = scaleBand()
  .domain(getPlaces(type))
  .rangeRound([ 0, height]);


  // Add Y axis to the graph
  graphContainer.append('g')
  .call(axisLeft(y))




})
.catch(err => console.log("FetchError - ", err));

