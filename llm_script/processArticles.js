require("dotenv").config();
const axios = require("axios");

const googleSearch = require("./googleSearch");
const scrapeExternalArticle = require("./scrapeExternalArticle");
const rewriteWithLLM = require("./rewriteWithLLM");

// Hard payload control
function truncate(text, limit) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) : text;
}

async function processArticles() {
  try {
    const response = await axios.get("http://localhost:5000/articles");
    const articles = response.data;

    console.log(`Found ${articles.length} articles`);

    for (const article of articles) {
      console.log(`\nProcessing: ${article.title}`);

      // Skip already rewritten articles
      if (article.updatedContent) {
        console.log("⏭ Already updated, skipping");
        continue;
      }

      // 1. Search reference articles
      const refLinks = await googleSearch(article.title);

      if (!refLinks || refLinks.length < 2) {
        console.log("❌ Not enough reference links, skipping");
        continue;
      }

      // 2. Scrape references
      const ref1Raw = await scrapeExternalArticle(refLinks[0]);
      const ref2Raw = await scrapeExternalArticle(refLinks[1]);

      // 3. Aggressive truncation (prevents 400 errors)
      const original = truncate(article.content, 800);
      const ref1 = truncate(ref1Raw, 600);
      const ref2 = truncate(ref2Raw, 600);

      if (!original || !ref1 || !ref2) {
        console.log("❌ Empty content after truncation, skipping");
        continue;
      }

      // 4. Rewrite using LLM (NO refLinks passed)
      const updatedContent = await rewriteWithLLM(
        original,
        ref1,
        ref2
      );

      // 5. Save rewritten article + references
      await axios.put(
        `http://localhost:5000/articles/${article._id}`,
        {
          updatedContent,
          references: refLinks
        }
      );

      console.log("✅ Article updated");
    }

    console.log("\n🎉 All articles processed successfully");

  } catch (err) {
    console.error(
      "❌ processArticles error:",
      err.response?.data || err.message
    );
  }
}

processArticles();
