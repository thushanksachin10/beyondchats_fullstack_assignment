const scrapeExternalArticle = require("./scrapeExternalArticle");

(async () => {
  const url = "https://blog.hubspot.com/marketing/what-is-seo";
  const content = await scrapeExternalArticle(url);
  console.log(content.substring(0, 500));
})();
