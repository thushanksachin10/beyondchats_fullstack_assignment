const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeExternalArticle(url) {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);

  // Remove unwanted elements
  $("script, style, nav, footer, header, ads, iframe").remove();

  let content = "";

  $("p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 50) {
      content += text + "\n\n";
    }
  });

  return content.slice(0, 6000); // keep LLM input reasonable
}

module.exports = scrapeExternalArticle;
