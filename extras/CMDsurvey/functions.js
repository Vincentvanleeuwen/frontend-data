let incorrectData = [];
let correctData = [];

fetch("data.json")
.then(response => response.json())
.then(json => cleanData(json));

cleanData = (json) => {
  // json.forEach(entry => eyeColorData.push(.toUpperCase().replace(/\s/g, "")));
  eyeColorData = json.map(entry => entry['oogKleur']
                                                .toUpperCase()
                                                .replace(/\s/g, "")
                                                .replace(".", ",")); //Replace . to , in RGB

  eyeColorData.forEach(eye => {
    if(eye.startsWith('RGB')) {
      rgbValues = eye.match(/\(([^)]+)\)/)[1];

      eye = rgbToHex( Number(rgbValues.split(",")[0]),
                      Number(rgbValues.split(",")[1]),
                      Number(rgbValues.split(",")[2])).toUpperCase();
    }

    if(!eye.startsWith('#') && eye.length === 6) {
      eye = '#' + eye;
    }

    if(eye.startsWith('#') && eye.length === 7) {
      correctData.push(eye);
    } else {
      incorrectData.push(eye);
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