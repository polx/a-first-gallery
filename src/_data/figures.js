const glob = require("glob");
const fs = require("fs");
const cg3Objects = require("../js/cg3Objects.js")

async function generateFigures(eleventyConfig) {
  let files = glob.sync('**/*.cg3', {ignore: "_site/**"});

  let figuresCollection = files.map(i => {
    return cg3Objects.getCG3Info(i);
  })
  figuresCollection.name = "figures"
  return figuresCollection;
}

module.exports = generateFigures;
