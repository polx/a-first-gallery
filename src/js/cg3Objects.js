const path = require("path")
const fs = require("fs")


let allCG3files = {};

const removeExtension = (n) => {
  return n.replace(/\.[a-z0-9]*$/, "")
}

const copy = (src, dst) => {
  console.log(`Copying ${src} to ${dst}.`)
  const srcStat = fs.lstatSync(src), dstStat = fs.existsSync(dst) && fs.lstatSync(dst);
  const dir = path.dirname(dst);
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true})
  if(!dstStat || srcStat.mtime !== dstStat.mtime)
    fs.copyFileSync(src, dst)
}


const cg3Objects = {

  createCG3Infos: (filenames, dir, toRoot) =>
  {
    let arr = [];
    for(let f of filenames) {
      let file = dir+f;
      arr.push(cg3Objects.getCG3Info(file, toRoot))
    }
    return arr
  },
  calcToRoot: (file) => {
    let toRoot = "", p=0;
    while(p!==-1) {
      p = file.indexOf("/", p+1);
      if (p!==-1) toRoot = `../${toRoot}`;
    }
    return toRoot;
  },
  getCG3Info: (file, toRoot) => {
    let o = allCG3files[file];
    if(o) return o;
    return cg3Objects.createCG3Info(file, toRoot)
  },

  createCG3Info(file, toRoot) {
    if(typeof(toRoot)=="undefined") toRoot=this.calcToRoot(file)
    let fileRoot = removeExtension(file);
    let name = (fileRoot.replace(/.*\//,""))
    if(name==="") name = fileRoot.replace(/.*\/([^/]+)/, "$1")
    let dir = fileRoot.replace(/\/[^\/]+/, "");
    let isDir = fs.lstatSync(file).isDirectory()

    let thumbPath = isDir ? `${toRoot}img/folder.svg` : `${toRoot}img/Cabri3DDoc.png`;

    if(fs.existsSync(fileRoot + ".png")) {
      if(!fs.existsSync(`_site/${dir}/`))  fs.mkdirSync(`_site/${dir}/`, {recursive:true})
      copy(fileRoot + ".png", "_site/" + fileRoot + ".png")
      thumbPath =  name + ".png";
    }

    if(!isDir)
      copy(file, "_site" + "/" + fileRoot + ".cg3")
    let o = {
      file: name + ".cg3",
      thumbpath: thumbPath,
      name: name,
      title: name.replace(/\/$/,""),
      fileTarget: isDir ? fileRoot + "index.html" : fileRoot + "/index.html",
      description: name
    }
    allCG3files[file] = o;
    return o;

  }
}

module.exports = cg3Objects
