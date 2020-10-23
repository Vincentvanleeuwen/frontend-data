let incorrectData = [];
let correctData = [];
let colorColumn;

const button = document.querySelectorAll('a');


fetch('data.json')
.then(response => response.json())
.then(json => {

  button.forEach(button => button.addEventListener('click', () => {

    if (window.location.hash === '#favorite-color') {
      colorColumn = 'lievelingskleur';
    } else {
      colorColumn = 'oogKleur';
    }

    cleanData(json, colorColumn);

  }));

  cleanAllData(json);

});

cleanData = (json, colorColumn) => {

  // Reset data
  document.querySelectorAll('.box').forEach(box => box.remove());
  incorrectData = [];
  correctData = [];

  // Log the selected column
  let colorData = json.map(entry => entry[colorColumn]
                          .toUpperCase()
                          .replace(/\s/g, '') // Delete all spaces
                          .replace('.', ',') // Replace points to commas in RGB
                          .replace('#', '') // Delete hashtags
                          );

  colorData.forEach(color => {

    if(color.startsWith('RGB')) {
      rgbValues = color.match(/\(([^)]+)\)/)[1]; // Get everything between the parentheses


      // + is a short version of Number(). It's used to change a string into a number
      color = rgbToHex( +rgbValues.split(",")[0],
                        +rgbValues.split(",")[1],
                        +rgbValues.split(",")[2]).toUpperCase();
    }

    // source: https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
    if(!color.startsWith('#') && color.match(/^([0-9A-F]{3}){1,2}$/i)) {

      color = '#' + color; // Add Hashtag before each Hexcolor.
    }

    if(color.startsWith('#') && color.length === 7) {
      correctData.push(color); // Add all correct Hexcolors to this array
    }
    else {
      incorrectData.push(color); // Add all incorrect Hexcolors to this array
    }

  });

  console.log('incorrect data:', incorrectData);
  console.log('correct data:', correctData);


  correctData.forEach(color => {

    var node = document.createElement("DIV");
    var textNode = document.createTextNode("" + color + "");
    node.classList.add("box");
    node.style.backgroundColor = color;
    node.appendChild(textNode);
    document.body.appendChild(node);

  });

  let occurrences = correctData.reduce((acc, cur) => {

    // Tuple for finding the index of a certain color
    let i = acc.findIndex(([color]) => color === cur);

    // If index exists, add an occurrence in an array for each hexcode
    // [color, occurrence]
    i > 0 ? acc[i][1]++ : acc.push([cur, 1]);

    return acc;

  }, []);
  console.log('All Occurrences', occurrences);

  // _ stands for the unused variable color
  let filteredOccurrences = occurrences.filter(([_, amount]) => amount !== 1);
  console.log('Only more than one occurrences', filteredOccurrences);

};


cleanAllData = (json) => {
  console.log('source data =', json);

  let keys = Object.keys(json[0]); // Get all questions

  let newData = json.reduce((acc, cur) => {

    // For each question, create a question if it doesn't exist and push the answers
    keys.forEach(keys => {

      if(!acc[keys]) {
        acc[keys] = []
      }
      acc[keys].push(cur[keys]);

    });

    return acc;

  }, {});

  console.log('newData', newData);
};

// Utilities

// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
componentToHex = (c) => {

  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;

};

rgbToHex = (r, g, b) => {

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

};

// @@@ Sources @@@
// Jonah Meijers has helped me with
// - Reduce function.
// - Tuples