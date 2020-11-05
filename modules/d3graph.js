import {
  select,
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  max,
  duration
} from "d3";

export const passDataToD3 = (data) => {

  const button = document.querySelector('.btn');
  let currentColumn = 'capacity';
  let currentType = 'city';

  const initializeD3 = (currentColumn, currentType) => {

    const getPlaces = (type) => {
      return data.map(d => {
        if (d.type === type) {
          return d
        }
      })
      .filter(d => d !== undefined)
      .sort();
    };

    const margin = {top: 20, right: 20, bottom: 60, left: 100},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Create the graph container
    const graphContainer = select('#graph-container')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
    .classed('graph-content', true);

    // Create X Axis  // Add X axis to the graph
    const x = scaleLinear()
    .domain([0, max(data, ( d => d[currentColumn] ))])
    .rangeRound([0, width])
    .nice();

    // Add X axis to the graph
    graphContainer.append('g')
    .attr("transform", `translate(0, ${height} )`)
    .call(axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-35)")
    .style("text-anchor", "end");

    // Create Y Axis
    const y = scaleBand()
    .domain(getPlaces(currentType).map(d => d.location).sort())
    .rangeRound([ 0, height]);


    // Add Y axis to the graph
    graphContainer.append('g')
    .call(axisLeft(y));

    const tooltip = select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


    graphContainer.selectAll('lollistick')
    .data(getPlaces(currentType))
    .join('line')
    .attr('x1', d => x(d[currentColumn]))
    .attr('x2', x(0))
    .attr('y1', d => y(d.location) + 4.5)
    .attr('y2', d => y(d.location) + 4.5)
    .attr('stroke', 'orange');

    graphContainer.selectAll('lollipop')
    .data(getPlaces(currentType))
    .join('circle')
    .attr('cx', d => x(d[currentColumn]))
    .attr('cy', d => y(d.location) + 4.5)
    .attr('r', 3)
    .attr('fill', 'blue')
    .attr('stroke', 'blue')
    .attr('opacity', 0.5)
    .on("mouseover", (event, d) => {
      tooltip.transition()
      .duration(200)
      .style("opacity", .9);

      tooltip.html(`${d[currentColumn]} ${currentColumn} `)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition()
      .duration(500)
      .style("opacity", 0);
    });

  };

  initializeD3(currentColumn, currentType); // kan ook chargingPointCapacity zijn

  button.addEventListener('click', () => {
    if (button.innerHTML !== 'Charging Points') {
      button.innerHTML = 'Charging Points';
      currentColumn = 'chargingPointCapacity';
    } else {
      button.innerHTML = 'Parking Spots';
      currentColumn = 'capacity';
    }

    // createLollipops('chargingPointCapacity', 'Charging Points', 'yellow');

    initializeD3(currentColumn, currentType);
  });

};

// SOURCE: https://www.d3-graph-gallery.com/graph/lollipop_horizontal.html