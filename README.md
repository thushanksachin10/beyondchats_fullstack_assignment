# BeyondChats–Full-Stack-Article-Rewriter

Initial project setup

BeyondChats – Full Stack Article Rewriter
👋 About the Project

This project is a full-stack web application built as part of the BeyondChats assignment.
The main goal is to automatically rewrite blog articles using reference articles and a Large Language Model (LLM), and then display both the original and rewritten content in a web interface.

Instead of just focusing on output, the project is designed to show proper backend–frontend separation, real-world data handling, and safe LLM usage.

🧠 What the Project Does

Scrapes blog articles and stores them in MongoDB

Searches Google for related reference articles

Scrapes content from those reference links

Uses an LLM to rewrite the original article

Saves the rewritten content back to the database

Displays everything in a React frontend

🏗️ Overall Architecture
Scraper → MongoDB → Backend API → React Frontend
              ↑
        LLM Processing Script


The scraper and LLM script are one-time batch jobs

The backend exposes REST APIs

The frontend only consumes backend data

🛠️ Tech Stack Used
Backend

Node.js

Express.js

MongoDB

Mongoose

Frontend

React (JavaScript)

Create React App

LLM

Ollama (Local LLaMA-3 model)

Other Tools

Axios

Cheerio

dotenv

📁 Project Structure
beyondchats_fullstack_assignment/
├── backend/        # Express API & MongoDB logic
├── scraper/        # Blog scraping scripts
├── llm_script/     # Article rewriting pipeline
├── frontend/       # React frontend
└── README.md

⚙️ How to Run the Project
1️⃣ Start MongoDB
mongod

2️⃣ Start Backend
cd backend
npm install
node server.js


Backend runs on:

http://localhost:5000

3️⃣ Run Scraper (Run Once)
cd scraper
npm install
node scrapeBlogs.js


This stores initial articles in the database.

4️⃣ Run LLM Processing Script (Run Once)
cd llm-script
npm install
node processArticles.js


This script:

Fetches articles from backend

Finds reference articles

Rewrites content using LLaMA-3

Saves updated articles back to MongoDB

⚠️ This is not a server.
It runs once and exits after processing.

5️⃣ Start Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🔁 How the System Is Meant to Be Used
Component	When to Run
MongoDB	Always
Backend	Always
Frontend	When viewing UI
LLM Script	Only when new articles are added

The frontend does not call the LLM directly.
It simply displays already-processed data.

🤖 Why Ollama Instead of Cloud LLM APIs?

Initially, cloud LLM APIs were considered.
However, due to billing requirements, rate limits, and unstable endpoints, a local Ollama-based LLaMA-3 model was used.

Advantages:

No API costs

No rate limits

Works fully offline

Exposes a local REST API

Reliable and repeatable results

This still fulfills the requirement of calling an LLM API, since Ollama provides a local API endpoint.

⚠️ Edge Cases Handled

Duplicate article titles handled safely

Empty or invalid scraped content skipped

Already rewritten articles skipped

Aggressive truncation to avoid LLM overload

Script never crashes due to bad data

📌 Result

The final application demonstrates:

End-to-end full-stack flow

Practical LLM integration

Clean API design

Robust error handling

Simple and readable frontend

✅ Project Status

✔ Backend completed
✔ MongoDB integration
✔ Scraper working
✔ LLM rewriting pipeline
✔ React frontend
✔ Ready for submission

👤 Author

Thushank Sachin Bagal
Final Year Student / Full Stack Intern Candidate

✨ Final Note

This project focuses on real-world engineering practices rather than unnecessary complexity, with emphasis on clarity, reliability, and maintainability.
