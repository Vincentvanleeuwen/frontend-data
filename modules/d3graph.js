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

const graphContainer = select('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                          .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
                          .classed('graph-content', true);

const x = scaleLinear();
const y = scaleBand();

let currentColumn = 'capacity'; // Start on parking spots
let currentType = 'city'; // Start on cities

export const passDataToD3 = (data) => {

  const initializeD3 = (currentColumn, currentType) => {
    setScales(data);
    addAxisToContainer(graphContainer);
    createLollipops(graphContainer, data);

    select('body').selectAll((`input[name='column']`)).on('change', () => {
      this.value === 'Charging Points' ? currentColumn = 'chargingPointCapacity' : currentColumn = 'capacity';
      updateGraph('x', graphContainer, currentColumn, data);
    });
    select('body').selectAll((`input[name='type']`)).on('change', () => {
      this.value === 'Towns' ? currentType = 'town' : currentType = 'city';
      updateGraph('y', graphContainer, currentType, data);
    });

    const updateGraph = (axis, target, newSet, data) => {

      // Get axis, lollipops and lollisticks svgs
      const axisElement = target.select(`#${axis}-axis`);
      const lollipops =  target.selectAll('.lollipop').data(getPlaces(data, currentType)).join('circle');
      const lollisticks = target.selectAll('.lollistick').data(getPlaces(data, currentType)).join('line');

      // Update domain
      axis === 'y' ?
        y.domain(getPlaces(data, newSet).map(d => d.location).sort()) :
        x.domain([0, max(data, ( d => d[newSet]))]);

      // Update Axis
      axis === 'y' ?
        axisElement.transition().duration(500).call(axisLeft(y)) :
        axisElement.transition().duration(500).call(axisBottom(x));

      // Update Axis labels and lollipop colors
      switch (newSet) {
        case 'city':
          select('.type').text("Cities");
          break;
        case 'town':
          select('.type').text("Towns");
          break;
        case 'capacity':
          select('.column').text("Amount of Parking spots");
          lollisticks.attr('stroke', '#5a61ff');
          lollipops.attr('fill', '#5a61ff').attr('stroke', '#5a61ff').attr('opacity', 0.9);
          break;
        case 'chargingPointCapacity':
          select('.column').text("Amount of Charging Points");
          lollisticks.attr('stroke', '#ffca68');
          lollipops.attr('fill', '#ffca68').attr('stroke', '#ffca68').attr('opacity', 1);
          break;
      }

      // Update lollisticks
      lollisticks
        .attr('y1', d => y(d.location) + y.bandwidth() / 2)
        .attr('y2', d => y(d.location) + y.bandwidth() / 2)
        .transition().duration(500)
          .attr('x1', d => x(d[currentColumn]));

      // Update lollipop
      lollipops
        .attr('cy', d => y(d.location) + y.bandwidth() / 2)
        .transition().duration(500)
          .attr('cx', d => x(d[currentColumn]));

      lollipops
        .on('mouseover', (event, d) => {
          select('.tooltip').transition()
          .duration(200)
          .style('opacity', .9);

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
  y.domain(yMax).rangeRound([ 0, height]);
};


const addAxisToContainer = (target) => {
  // Add X axis to the graph
  target
  .append('g').transition()
  .attr('transform', `translate(0, ${height} )`)
  .attr('id', 'x-axis')
  .call(axisBottom(x))
    .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-35)')
      .style('text-anchor', 'end');

  // Add Y axis to the graph
  target
  .append('g').transition()
  .attr('id', 'y-axis')
  .call(axisLeft(y));

  // Add labels to axis
  // source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
  target.append('text')
    .attr('transform', `translate(${width/2}, ${height + margin.top + 30})`)
    .style('text-anchor', 'middle')
    .attr('class', 'label-text column')
    .text('Amount of Parking spots');

  target.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 10)
    .attr('x', 0 - (height / 2 - 20))
    .attr('dy', '1em')
    .style("text-anchor", 'middle')
    .attr('class', 'label-text type')
    .text('Cities');

  // Add title to graph
  target.append('text')
  .attr('x', (width / 2) + 50)
  .attr('y', 0 - (margin.top / 2))
  .attr('text-anchor', 'middle')
  .attr('class', 'title-text')
  .text('How many charging points do parking garages have in comparison to parking spots in different towns and' +
      ' cities in The Netherlands?');

  // Add tooltip to the body instead of the container
  select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);
};

const createLollipops = (target, data) => {

  // Create the lollipops
  const lollipops = target.selectAll('.lollipop').data(getPlaces(data, currentType)).join('circle');
  const lollisticks = target.selectAll('.lollistick').data(getPlaces(data, currentType)).join('line');


  lollisticks
    .attr('class', 'lollistick')
    .attr('y1', d => y(d.location) + y.bandwidth() / 2)
    .attr('y2', d => y(d.location) + y.bandwidth() / 2)
    .transition().duration(500)
        .attr('x1', d => x(d[currentColumn]))
        .attr('x2', x(0))
        .attr('stroke', '#5a61ff')
        .attr('opacity', 0.5);


  lollipops
    .attr('fill', '#5a61ff')
    .attr('stroke', '#5a61ff')
    .attr('opacity', 1)
    .attr('class', 'lollipop');

  lollipops
      .attr('cy', d => y(d.location) + y.bandwidth() / 2)
      .transition().duration(500)
        .attr('cx', d => x(d[currentColumn]))
        .attr('r', 3);


  lollipops.on("mouseover", (event, d) => {

    select('.tooltip').transition().duration(200)
    .style('opacity', .9);

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