const glob = require("glob");
const fs = require("fs");

function removeExtension(n) {
  let filename = n.split('/').pop();
  //strip off the file type, this could probably be one line of fancier JS
  let parts = filename.split('.');
  parts.pop();
  return parts.join('.');
}


async function generateFigures(configData) {
  let files = glob.sync('./*.cg3');
  let figuresCollection = files.map(i => {
    let fileRoot = removeExtension(i);
    let name = (fileRoot.replace(/.*\//,""))
    let dir = fileRoot.replace(/\/.*/, "");
    let thumbPath = "img/Cabri3DDoc.png";

    if(fs.existsSync(fileRoot + ".png")) {
      if(!fs.existsSync("_site"))  fs.mkdirSync("_site")
      fs.copyFileSync(fileRoot + ".png", "_site" + "/" + fileRoot + ".png")
      thumbPath =  fileRoot + ".png";
    }

    return {
      file: i,
      thumbpath: thumbPath,
      name: name,
      title: name,
      description: name

    }
  })
  figuresCollection.name = "figures"
  return figuresCollection;
}

module.exports = generateFigures;
