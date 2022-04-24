
module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("*.cg3");

	return {
		dir: {
			input: "src"
		}
	}
};
