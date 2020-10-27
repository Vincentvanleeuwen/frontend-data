let column = 'oogKleur';
let incorrectData = [];
let correctData = [];

// Fetch the database URL
const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};


fetchData('data.json')
.then(result => {

  // Clean Eye color & Favorite color
  cleanData(result, column);

  // Restructure all rows
  cleanAllData(result);


  // Add UI buttons
  addEventToButtons(result);
});


// Probeer reusable functies te maken
cleanData = (result, column) => {

  // Log the selected column
  let colorData = result.map(entry => entry[column]
                          .toUpperCase()
                          .replace(/\s/g, '') // Delete all spaces
                          .replace('.', ',') // Replace points to commas in RGB
                          .replace('#', '') // Delete hashtags
                          );

  // Change values into correct hex codes.
  changeIntoHex(colorData);

  // Count how many colors of each color exist.
  countColor(correctData);

};


cleanAllData = (json) => {
  console.log('source data =', json);

  let keys = Object.keys(json[0]); // Get all questions

  let newData = json.reduce((acc, cur) => {

    // For each question, create a question if it doesn't exist and push the answers
    keys.forEach(keys => {

      // If column doesn't exist
      if(!acc[keys]) {

        // Add column
        acc[keys] = []
      }

      // Add current value to current column
      acc[keys].push(cur[keys]);

    });

    return acc;

  }, {});

  console.log('newData', newData);
};

// Data Helpers
changeIntoHex = (data) => {

  data.forEach(color => {

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
};

countColor = (dataSet) => {
  let occurrences = dataSet.reduce((acc, cur) => {

    // Tuple for finding the index of a certain color
    let i = acc.findIndex(([color]) => color === cur);

    // If index exists, add an occurrence in an array for each hexcode
    // [color, occurrence]
    i > 0 ? acc[i][1]++ : acc.push([cur, 1]);

    return acc;

  }, []);

  // _ stands for the unused variable color
  let filteredOccurrences = occurrences.filter(([_, amount]) => amount !== 1);
  console.log('Only more than one occurrences', filteredOccurrences);
};

// UI Helpers
addEventToButtons = (result) => {
  const button = document.querySelectorAll('a');

  button.forEach(button => button.addEventListener('click', () => {

    // Reset data
    document.querySelectorAll('.box').forEach(box => box.remove());
    incorrectData = [];
    correctData = [];

    // Change column based on location hash
    if (window.location.hash === '#favorite-color') {
      column = 'lievelingskleur';
    } else {
      column = 'oogKleur';
    }

    // Reset the data
    cleanData(result, column);

    // Add Color Boxes
    createColorBoxes();

  }));
};

createColorBoxes = () => {
  correctData.forEach(color => {

    var node = document.createElement("DIV");
    var textNode = document.createTextNode("" + color + "");
    node.classList.add("box");
    node.style.backgroundColor = color;
    node.appendChild(textNode);
    document.body.appendChild(node);

  });
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