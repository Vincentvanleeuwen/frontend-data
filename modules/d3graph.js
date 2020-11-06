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

export const passDataToD3 = (data) => {

  const columnButton = document.getElementById('transition-column');
  const typeButton = document.getElementById('transition-type');
  let currentColumn = 'capacity';
  let currentType = 'city';

  const initializeD3 = (currentColumn, currentType) => {



    const margin = {top: 20, right: 20, bottom: 60, left: 100},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    let xMax = max(data, ( d => d[currentColumn]));
    let yMax = getPlaces(data, currentType).map(d => d.location).sort();

    // Create the graph container
    const graphContainer = select('#graph-container')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append("g")
        .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
        .classed('graph-content', true);

    // Create X Axis  // Add X axis to the graph
    const x = scaleLinear()
      .domain([0, xMax])
      .rangeRound([0, width])
      .nice();

    // Add X axis to the graph
    graphContainer.append('g')
      .transition()
      .attr("transform", `translate(0, ${height} )`)
      .attr("id", "x-axis")
      .call(axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-35)")
        .style("text-anchor", "end");

    // Create Y Axis
    const y = scaleBand()
      .domain(yMax)
      .rangeRound([ 0, height]);


    // Add Y axis to the graph
    graphContainer.append('g')
      .transition()
      .attr("id", "y-axis")
      .call(axisLeft(y));

    const tooltip = select('body')
      .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);


    graphContainer.selectAll('.lollistick')
      .data(getPlaces(data, currentType))
      .join('line')
        .attr('x1', d => x(d[currentColumn]))
        .attr('x2', x(0))
        .attr('y1', d => y(d.location) + 4.5)
        .attr('y2', d => y(d.location) + 4.5)
        .attr('stroke', 'orange')
        .attr('class', 'lollistick');


    graphContainer.selectAll('.lollipop')
      .data(getPlaces(data, currentType))
      .join('circle')
        .attr('cx', d => x(d[currentColumn]))
        .attr('cy', d => y(d.location) + 4.5)
        .attr('r', 3)
        .attr('fill', 'blue')
        .attr('stroke', 'blue')
        .attr('opacity', 0.5)
        .attr('class', 'lollipop')
        .on("mouseover", (event, d) => {
          tooltip.transition()
          .duration(200)
          .style("opacity", .9);

          tooltip.html(`${d[currentColumn]} ${currentColumn} `)
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseout', () => {
          tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        });

    const updateX = (newType) => {
      xMax = max(data, ( d => d[newType]));
      x.domain([0, xMax]);

      const axisElement = graphContainer.select('#x-axis');

      axisElement.transition()
        .duration(500)
        .call(axisBottom(x));

      graphContainer.selectAll('.lollistick')
      .data(getPlaces(data, currentType))
        .join('line')
          .attr('x1', d => x(d[currentColumn]))
          .attr('y1', d => y(d.location) + 4)
          .attr('y2', d => y(d.location) + 4);

      graphContainer.selectAll('.lollipop')
      .data(getPlaces(data, currentType))
        .join('circle')
          .attr('cx', d => x(d[currentColumn]))
          .attr('cy', d => y(d.location) + 4)


    };

    const updateY = (newColumn) => {
      yMax = getPlaces(data, newColumn).map(d => d.location).sort();
      y.domain(yMax);

      const axisElement = graphContainer.select('#y-axis');

      axisElement.transition()
        .duration(500)
        .call(axisLeft(y));

      graphContainer.selectAll('.lollistick')
        .data(getPlaces(data, currentType))
        .join('line')
          .attr('x1', d => x(d[currentColumn]))
          .attr('y1', d => y(d.location) + 4.5)
          .attr('y2', d => y(d.location) + 4.5);

      graphContainer.selectAll('.lollipop')
        .data(getPlaces(data, currentType))
        .join('circle')
          .attr('cx', d => x(d[currentColumn]))
          .attr('cy', d => y(d.location) + 4.5)

    };

    // Change from parking spots to charging points
    select('#transition-column').on('click', () => {
      if (columnButton.innerHTML !== 'Charging Points') {
        columnButton.innerHTML = 'Charging Points';
        currentColumn = 'chargingPointCapacity';
      } else {
        columnButton.innerHTML = 'Parking Spots';
        currentColumn = 'capacity';
      }
      updateX(currentColumn);
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
      updateY(currentType);
    });

  };

  initializeD3(currentColumn, currentType);



};

// SOURCE: https://www.d3-graph-gallery.com/graph/lollipop_horizontal.html