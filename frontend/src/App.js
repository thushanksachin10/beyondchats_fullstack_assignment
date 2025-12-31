import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching articles", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>BeyondChats - Article Rewriter</h1>

      {loading && <p>Loading articles...</p>}

      {!loading && articles.length === 0 && (
        <p>No articles found</p>
      )}

      {articles.map(article => (
        <div key={article._id} className="card">
          <h2>{article.title}</h2>

          <h3>Original Content</h3>
          <p>{article.content}</p>

          {article.updatedContent && (
            <>
              <h3>Rewritten Content</h3>
              <p>{article.updatedContent}</p>
            </>
          )}

          {article.references && article.references.length > 0 && (
            <>
              <h3>References</h3>
              <ul>
                {article.references.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
