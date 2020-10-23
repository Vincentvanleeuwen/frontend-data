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

      color = rgbToHex( +rgbValues.split(",")[0],
                      +rgbValues.split(",")[1],
                      +rgbValues.split(",")[2]).toUpperCase();
    }


    // Tried with parseInt to check for hexcolor, didn't work out.

    // console.log(color, parseInt(color, 16));
    // let checkColor = parseInt(color, 16);
    // console.log(checkColor);
    // if (checkColor.length < 6 && !color.startsWith('#')) {
    //   incorrectData.push(color);
    //   return;
    // }

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

  // Checks how many times a colorcode exists.
  let occurrences = correctData.reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : acc[cur] = 1;
    return acc;
  }, []);

  console.log(occurrences);

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