import React, { useEffect, useState } from 'react';
import './News.css';

function News() {
  const [news, setNews] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the API when the component loads
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // You need to replace 'YOUR_API_KEY_HERE' with your actual NewsAPI key
        // Get your free API key from: https://newsapi.org/register
        const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
        
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate that the response has the expected structure
        if (data && data.articles && Array.isArray(data.articles)) {
          setNews(data.articles);
        } else {
          console.warn('Unexpected API response structure:', data);
          setNews([]); // Fallback to empty array
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message);
        setNews([]); // Ensure news is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="news-container">
        <h1>Latest News</h1>
        <div className="loading">
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="news-container">
        <h1>Latest News</h1>
        <div className="error">
          <p>Error loading news: {error}</p>
          <p>Please check your API key and internet connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      {/* Ensure news is an array and has items before mapping */}
      {Array.isArray(news) && news.length > 0 ? (
        news.map((article, index) => (
          <div key={index} className='card'>
            <h3>{article.title || 'No title available'}</h3>
            <p>{article.description || 'No description available'}</p>
            {article.url && (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No news articles available at the moment.</p>
      )}
    </div>
  );
}

export default News;