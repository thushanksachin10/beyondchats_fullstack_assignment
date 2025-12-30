const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Article = require("./models/Article");

async function runScraper() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/beyondchats", {
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB connected for scraping");

    const url = "https://beyondchats.com/blogs/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const links = $("a[href*='/blogs/']").toArray();
    let count = 0;

    for (let i = links.length - 1; i >= 0 && count < 5; i--) {
      const title = $(links[i]).text().trim();
      const link = $(links[i]).attr("href");

      if (!title || title.length < 5) continue;

      await Article.create({
        title,
        content: "Original article scraped from BeyondChats",
        originalUrl: link
      });

      count++;
    }

    console.log("Successfully scraped and saved 5 articles");
    process.exit(0);

  } catch (err) {
    console.error("Scraper failed:", err.message);
    process.exit(1);
  }
}

runScraper();
