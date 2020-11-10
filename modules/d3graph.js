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


const margin = {top: 20, right: 20, bottom: 60, left: 100},
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

let currentColumn = 'capacity';
let currentType = 'city';

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
      updateX(graphContainer, currentColumn);
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
      updateY(graphContainer, currentType);
    });

    const updateX = (target, newType) => {
      x.domain([0, max(data, ( d => d[newType]))]);

      const axisElement = graphContainer.select('#x-axis');

      axisElement.transition()
        .duration(500)
        .call(axisBottom(x));

      target.selectAll('.lollistick')
      .data(getPlaces(data, currentType))
        .join('line').transition().duration(500)
          .attr('x1', d => x(d[currentColumn]))
          .attr('y1', d => y(d.location) + 4)
          .attr('y2', d => y(d.location) + 4);

      target.selectAll('.lollipop')
      .data(getPlaces(data, currentType))
        .join('circle')
          .attr('cx', d => x(d[currentColumn]))
          .attr('cy', d => y(d.location) + 4)
          .on("mouseover", (event, d) => {
            select('.tooltip').transition()
            .duration(200)
            .style("opacity", .9);

            select('.tooltip').html(`${d[currentColumn]} ${currentColumn === 'capacity' ? 'parking spots' :
              'charging points'} `)
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY - 28}px`);
          });
    };

    const updateY = (target, newColumn) => {
      // Update domain
      y.domain(getPlaces(data, newColumn).map(d => d.location).sort());

      const axisElement = graphContainer.select('#y-axis');

      // Update Axis Y
      axisElement.transition()
        .duration(500)
        .call(axisLeft(y));

      // Update lollisticks
      target.selectAll('.lollistick')
        .data(getPlaces(data, currentType))
        .join('line').transition().duration(500)
          .attr('x1', d => x(d[currentColumn]))
          .attr('y1', d => y(d.location) + 4.5)
          .attr('y2', d => y(d.location) + 4.5);

      // Update lollipop
      target.selectAll('.lollipop')
        .data(getPlaces(data, currentType))
        .join('circle')
          .attr('cx', d => x(d[currentColumn]))
          .attr('cy', d => y(d.location) + 4.5)
           .on("mouseover", (event, d) => {
              select('.tooltip').transition()
              .duration(200)
              .style("opacity", .9);

              select('.tooltip').html(`${d[currentColumn]} ${currentColumn === 'capacity' ? 'parking spots' : 
                'charging points'} `)
              .style('left', `${event.pageX}px`)
              .style('top', `${event.pageY - 28}px`);
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

  // Add tooltip to the body instead of the container
  select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);
};

const createLollipops = (target, data) => {

  const lolliSelector = target.selectAll('.lollipop');

  target
  .selectAll('.lollistick')
    .data(getPlaces(data, currentType))
    .join('line')
      .attr('x1', d => x(d[currentColumn]))
      .attr('x2', x(0))
      .attr('y1', d => y(d.location) + 4.5)
      .attr('y2', d => y(d.location) + 4.5)
      .attr('stroke', 'orange')
      .attr('class', 'lollistick');

  lolliSelector
    .data(getPlaces(data, currentType))
    .join('circle')
      .attr('cx', d => x(d[currentColumn]))
      .attr('cy', d => y(d.location) + 4.5)
      .attr('r', 3)
      .attr('fill', 'blue')
      .attr('stroke', 'blue')
      .attr('opacity', 0.5)
      .attr('class', 'lollipop');

  lolliSelector.transition().duration(500);

  lolliSelector.on("mouseover", (event, d) => {
      select('.tooltip').transition()
      .duration(200)
      .style("opacity", .9);

      select('.tooltip').html(`${d[currentColumn]} ${currentColumn} `)
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