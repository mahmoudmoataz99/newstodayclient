import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-56 object-cover"
        src={article.image || 'https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM='}
        alt={article.title || 'Article image'}
      />
      <div className="p-4">
        <h4 className='text-sm pb-4'>{new Date(article.publishedAt).toUTCString()}</h4>
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-900 transition-colors duration-200">
          <Link to={`/article/${article._id}`}>{article.title}</Link>
        </h3>
        <p className="text-gray-600 text-base mt-2">
          {article.content.length > 150 ? article.content.substring(0, 150) + '...' : article.content}
        </p>

        <div className="mt-2">
          {article.category && (
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full mr-2">
              {article.category}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm mt-4">By {article.author}</p>
      </div>
    </article>
  );
};

export default ArticleCard;
