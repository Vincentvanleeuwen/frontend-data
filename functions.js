let incorrectData = [];
let correctData = [];
let colorColumn;

const button = document.querySelectorAll('button');

fetch("data.json")
.then(response => response.json())
.then(json => {

  button.forEach(button => button.addEventListener('click', () => {

    if (button.innerText === 'Eye color') {
      colorColumn = 'oogKleur';
    } else {
      colorColumn = 'lievelingskleur';
    }

    cleanData(json, colorColumn);

  }));

});

cleanData = (json, colorColumn) => {


  document.querySelectorAll('.box').forEach(e => e.remove());
  // while(boxes[0]) { boxes[0].parentNode.removeChild(boxes[0])} //Delete all boxes
  incorrectData = [];
  correctData = [];

  console.log(colorColumn);
  let colorData = json.map(entry => entry[colorColumn]
                          .toUpperCase()
                          .replace(/\s/g, "") // Delete all spaces
                          .replace(".", ",") // Replace points to commas in RGB
                          );

  colorData.forEach(color => {

    if(color.startsWith('RGB')) {
      rgbValues = color.match(/\(([^)]+)\)/)[1]; // Get everything between the parentheses

      color = rgbToHex( Number(rgbValues.split(",")[0]),
                      Number(rgbValues.split(",")[1]),
                      Number(rgbValues.split(",")[2])).toUpperCase();
    }

    if(!color.startsWith('#') && color.length === 6) {
      color = '#' + color; // Add Hashtag before each Hexcolor.
    }

    if(color.startsWith('#') && color.length === 7) {
      correctData.push(color); // Add all correct Hexcolors to this array
    } else {
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

};

componentToHex = (c) => {

  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;

};

rgbToHex = (r, g, b) => {

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

};