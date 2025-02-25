import React, { useState } from 'react';
import { nAPI_URL, nAPI_KEY } from '../APIs/NewsAPI';
import axios from 'axios';

const News = () => {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]); // Changed to an empty array

  const getNews = async () => {
    try { 
      const response = await axios.get(`${nAPI_URL}?q=${topic}&apiKey=${nAPI_KEY}`);
      const newData = response.data.articles;
      setArticles(newData); // Corrected setArticles
    } catch (error) {
      console.error("Error fetching news:", error); 
    }  
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getNews();
  };

  return (
    <div>
      <h1>News here</h1>

      <form onSubmit={handleSearch}>
        <input 
          type='text' 
          name='topic' 
          placeholder='Search Topic' 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
        />
        <button type='submit'>Search News</button>
      </form>

      <div>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <img src={article.urlToImage} alt={article.title} style={{ width: '100px' }} /> 
              <p>{article.description}</p>
              <a href={article.url} target='_blank' rel='noopener noreferrer'>Read more</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          <li>Title</li>
          <li>Image</li>
          <li>Overview</li>
          <li>Source / Link</li>
        </ul> 
      </div>
    </div>
  );
}

export default News;
