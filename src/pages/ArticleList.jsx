import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('https://news-today-api.vercel.app/articles');
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </section>
  );
};

export default ArticleList;
