const Image = require("@11ty/eleventy-img");
const glob = require("glob-promise");

const THUMB = 250;
const FULL = 650;

function removeExtension(n) {
	let filename = n.split('/').pop();
	//strip off the file type, this could probably be one line of fancier JS
	let parts = filename.split('.');
	parts.pop();
	return parts.join('.');
}

async function generateImages() {

	let options = {
		widths: [THUMB,FULL],
		outputDir: './_site/img/',
		formats: ['jpeg'],
		filenameFormat:function(id, src, width, format, options) {
			let filename = removeExtension(src);
			if(width === THUMB) return `thumb-${filename}.${format}`;
			else return `${filename}.${format}`;
		}
	};

	let files = await glob('./rawphotos/*.{jpg,jpeg,png,gif}');
	/*for(const f of files) {
		console.log('doing f',f);
		let md = await Image(f, options);
		console.log(md)
	}*/
	let images = files.filter(f => f.indexOf('./rawphotos/thumb-') !== 0)
	imageCollection = await Promise.all(images.map(async i => {
		let img = await Image(i, options);
		img = img.jpeg[0];
		return {
			path: i,
			thumbpath: img.outputPath.replace('_site/', './'),
			title: removeExtension(img.filename)
		}
	}))
	console.log(imageCollection)
	imageCollection.name = "images"
	return imageCollection;
}

async function generateFigures(collectionsApi) {
	return collectionsApi.getAll();
	/* let files = await glob('./*.cg3');
	let figuresCollection = await Promise.all(files.map(async i => {
		let thumbPath = "img/cg3Type.png";
		if ( 0 == 1) {
			let img = await Image(i, options);
			thumbPath = img.outputPath.replace('_site/', './')
			img = img.jpeg[0];
		}
		return {
			file: i,
			thumbpath: thumbPath,
			name: removeExtension(i),
			title: removeExtension(i)
		}
	}))
	figuresCollection.name = "figures"
	console.log(figuresCollection);
	console.log(collectionsApi);
	return figuresCollection;*/

}


module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("*.cg3");
	//eleventyConfig.addCollection("images", generateImages)
	//eleventyConfig.addCollection("figures", generateFigures)

	return {
		dir: {
			input: "src"
		}
	}
};
