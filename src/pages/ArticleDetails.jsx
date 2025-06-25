import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetailPage = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://news-today-api.vercel.app/articles/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>; 
  }

  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <div className="flex justify-between items-center flex-col md:flex-row gap-y-5">
      <p className="text-gray-500 text-sm mt-2">By {article.author} | Published on {new Date(article.publishedAt).toLocaleDateString()}</p>
      <div className="">
        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{article.category}</span>
      </div>
      </div>
      
      {article.image ? 
        <img className="w-full h-96 object-fit mt-6" src={article.image} alt={article.title}/> : <img className="w-full h-96 object-fit mt-6" src='https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=' alt={article.title}/> 
      }

      <p className="text-gray-800 mt-6">{article.content}</p>
    </article>
  );
};

export default ArticleDetailPage;
