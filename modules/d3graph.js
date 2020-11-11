import {
  select,
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  max,
  duration
} from 'd3';
import { getPlaces } from '../helpers/getPlaces.js';


const margin = {top: 20, right: 20, bottom: 60, left: 120},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const graphContainer = select('#graph-container')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append("g")
                          .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
                          .classed('graph-content', true);

const x = scaleLinear();
const y = scaleBand();

const columnButton = document.getElementById('transition-column');
const typeButton = document.getElementById('transition-type');


let currentColumn = 'capacity'; // Start on parking spots
let currentType = 'city'; // Start on cities

export const passDataToD3 = (data) => {

  const initializeD3 = (currentColumn, currentType) => {
    setScales(data);
    addAxisToContainer(graphContainer);
    createLollipops(graphContainer, data);

    // Change from parking spots to charging points
    select('#transition-column').on('click', () => {
      if (columnButton.innerHTML !== 'Charging Points') {
        columnButton.innerHTML = 'Charging Points';
        currentColumn = 'chargingPointCapacity';
      } else {
        columnButton.innerHTML = 'Parking Spots';
        currentColumn = 'capacity';
      }
      updateGraph('x', graphContainer, currentColumn, data);
    });

    // Change from cities to towns
    select('#transition-type').on('click', () => {
      if (typeButton.innerHTML !== 'Towns') {
        typeButton.innerHTML = 'Towns';
        currentType = 'town';
      } else {
        typeButton.innerHTML = 'Cities';
        currentType = 'city';
      }
      updateGraph('y', graphContainer, currentType, data);
    });

    const updateGraph = (axis, target, newSet, data) => {

      // Get axis, lollipops and lollisticks svgs
      const axisElement = target.select(`#${axis}-axis`);
      const lollipops =  target.selectAll('.lollipop').data(getPlaces(data, currentType)).join('circle');
      const lollisticks = target.selectAll('.lollistick').data(getPlaces(data, currentType)).join('line');

      // Update Axis
      axisElement.transition().duration(500);
      axis === 'y' ?  axisElement.call(axisLeft(y)) : axisElement.call(axisBottom(x));

      // Update domain
      axis === 'y' ?
        y.domain(getPlaces(data, newSet).map(d => d.location).sort()) :
        x.domain([0, max(data, ( d => d[newSet]))]);


      // Update lollisticks
      lollisticks
        .attr('y1', d => y(d.location))
        .attr('y2', d => y(d.location))
        .transition().duration(500)
          .attr('x1', d => x(d[currentColumn]));

      newSet === 'capacity' ? lollisticks.attr('stroke', 'red') : lollisticks.attr('stroke', 'blue');

      // Update lollipop
      lollipops
        .attr('cy', d => y(d.location))
        .transition().duration(500)
          .attr('cx', d => x(d[currentColumn]));

      newSet === 'capacity' ?
        lollipops.attr('fill', 'red').attr('stroke', 'red').attr('opacity', 1) :
        lollipops.attr('fill', 'blue').attr('stroke', 'blue').attr('opacity', 0.9);

      lollipops
        .on("mouseover", (event, d) => {
          select('.tooltip').transition()
          .duration(200)
          .style("opacity", .9);

          select('.tooltip').html(`${d[currentColumn]} ${currentColumn === 'capacity' ? 'parking spots' :
            'charging points'} `)
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseout', () => {
          select('.tooltip').transition()
          .duration(500)
          .style('opacity', 0);
        });
    // Source: https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
    };

  };

  initializeD3(currentColumn, currentType);
};

const setScales = (data) => {
  let xMax = max(data, ( d => d[currentColumn]));
  let yMax = getPlaces(data, currentType).map(d => d.location).sort();
  // Create X Axis  // Add X axis to the graph
  x.domain([0, xMax]).rangeRound([0, width]).nice();

  // Create Y Axis
  y.domain(yMax).range([ 0, height]);
};


const addAxisToContainer = (target) => {
  // Add X axis to the graph
  target
  .append('g').transition()
  .attr("transform", `translate(0, ${height} )`)
  .attr("id", "x-axis")
  .call(axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-35)")
      .style("text-anchor", "end");



  // Add Y axis to the graph
  target
  .append('g').transition()
  .attr("id", "y-axis")
  .call(axisLeft(y));


  // .append("text")
  // .attr("transform", "rotate(-90)")
  // .attr("dy", ".75em")
  // .attr("y", 6)
  // .style("text-anchor", "end")
  // .text("Frequency");

  // Add tooltip to the body instead of the container
  select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);
};

const createLollipops = (target, data) => {

  const lollipops = target.selectAll('.lollipop').data(getPlaces(data, currentType)).join('circle');
  const lollisticks = target.selectAll('.lollistick').data(getPlaces(data, currentType)).join('line');

  lollisticks
    .attr('y1', d => y(d.location) + y.bandwidth() / 2)
    .attr('y2', d => y(d.location) + y.bandwidth() / 2)
    .transition().duration(500)
        .attr('x1', d => x(d[currentColumn]))
        .attr('x2', x(0))
        .attr('stroke', 'blue')
        .attr('opacity', 0.5)
        .attr('class', 'lollistick');

  lollipops
    .attr('fill', 'blue')
    .attr('stroke', 'blue')
    .attr('opacity', 1)
    .attr('class', 'lollipop');

  lollipops
      .attr('cy', d => y(d.location) + y.bandwidth() / 2)
      .transition().duration(500)
        .attr('cx', d => x(d[currentColumn]))
        .attr('r', 3);


  lollipops.on("mouseover", (event, d) => {

    select('.tooltip').transition().duration(200)
    .style("opacity", .9);

    select('.tooltip').html(`${d[currentColumn]} ${currentColumn === 'capacity' ? 'parking spots' :
           'charging points'} `)
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY - 28}px`);
    })
    .on('mouseout', () => {
      select('.tooltip').transition()
      .duration(500)
      .style('opacity', 0);
    });

};

// SOURCE: https://www.d3-graph-gallery.com/graph/lollipop_horizontal.html