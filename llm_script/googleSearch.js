require("dotenv").config();
const axios = require("axios");

async function googleSearch(query) {
  const url = "https://serpapi.com/search.json";

  const response = await axios.get(url, {
    params: {
      q: query,
      engine: "google",
      api_key: process.env.SERPAPI_KEY,
      num: 5
    }
  });

  const results = response.data.organic_results || [];

  // Filter only blogs/articles
  const links = results
    .filter(r => r.link && !r.link.includes("youtube") && !r.link.includes("reddit"))
    .slice(0, 2)
    .map(r => r.link);

  return links;
}

// Test
(async () => {
  const links = await googleSearch("What is Web3?");
  console.log(links);
})();
