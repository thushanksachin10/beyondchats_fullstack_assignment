const axios = require("axios");

async function fetchArticles() {
  const res = await axios.get("http://localhost:5000/articles");
  console.log(`Fetched ${res.data.length} articles`);
}

fetchArticles();
