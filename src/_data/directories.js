const glob = require("glob");
const fs = require("fs");
const path = require("path")
const cg3Objects = require("../js/cg3Objects")

const ignores = ["_site/**", "node_modules/**", "src/**"];

async function generateDirectories(eleventyConfig) {
  let dirs = glob.sync('**/', {ignore: ignores});
  dirs.push("")
  const coll = [];
  for(let dir of dirs) {
    let toRoot = cg3Objects.calcToRoot(dir);
    let children = glob.sync('*/', {cwd: dir, ignore: ignores});
    children.push(...glob.sync("*.cg3", {cwd:dir}))
    children = cg3Objects.createCG3Infos(children, dir, toRoot)
    const title = dir ===""? path.basename(process.cwd()) :
        dir.replace(/\/$/,"").replace(/^.*\//, "");
    coll.push({
      //thumbpath: "", (would be with the convention of a png aside)
      name: dir,
      title: title,
      description: "directory2",
      toRoot: toRoot,
      cg3s : children,
      isNotRoot: dir!==""
    });
  }

  coll.name = "directories"
  return coll;
}

module.exports = generateDirectories;
