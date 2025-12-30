const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  originalUrl: String,
  updatedContent: String,
  references: [String],
  createdAt: Date
});

module.exports = mongoose.model("Article", ArticleSchema);
