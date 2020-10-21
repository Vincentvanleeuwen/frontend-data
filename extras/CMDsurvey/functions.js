let incorrectData = [];
let correctData = [];

fetch("data.json")
.then(response => response.json())
.then(json => cleanData(json));

cleanData = (json) => {

  eyeColorData = json.map(entry => entry['oogKleur']
                          .toUpperCase()
                          .replace(/\s/g, "") // Delete all spaces
                          .replace(".", ",") // Replace points to commas in RGB
                          );

  eyeColorData.forEach(eye => {

    if(eye.startsWith('RGB')) {
      rgbValues = eye.match(/\(([^)]+)\)/)[1]; // Get everything between the parentheses

      eye = rgbToHex( Number(rgbValues.split(",")[0]),
                      Number(rgbValues.split(",")[1]),
                      Number(rgbValues.split(",")[2])).toUpperCase();
    }

    if(!eye.startsWith('#') && eye.length === 6) {
      eye = '#' + eye; // Add Hashtag before each Hexcolor.
    }

    if(eye.startsWith('#') && eye.length === 7) {
      correctData.push(eye); // Add all correct Hexcolors to this array
    } else {
      incorrectData.push(eye); // Add all incorrect Hexcolors to this array
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

};

componentToHex = (c) => {

  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;

};

rgbToHex = (r, g, b) => {

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

};