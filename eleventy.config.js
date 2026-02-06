module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Copy Cloudflare Pages special files
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  
  // Watch for CSS changes
  eleventyConfig.addWatchTarget("./src/styles/");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
