import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userArticles, setUserArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const response = await axios.get(`https://news-today-api.vercel.app/articles?author=${user._id}`);
        setUserArticles(response.data.filter(res => res.email === user.email));
      } catch (err) {
        setError('Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserArticles();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
//https://news-today-api.vercel.app/user
  const removeArticle = async (id) => {
   try {
     setIsLoading(true);
     await axios.delete(`https://news-today-api.vercel.app/articles/${id}`);
     
     // Optimistically update UI
     setUserArticles(prev => prev.filter(article => article._id !== id));
     setError(null); 
   } catch (err) {
     setError(err.response?.data?.message || 'Failed to delete article');
     console.error('Error deleting article:', err);
   } finally {
     setIsLoading(false);
   }
 };
  return (
    <div className="max-w-4xl mx-auto my-10 p-6">
      {/* User Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
            {user.First_Name.charAt(0)}{user.Last_Name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.First_Name} {user.Last_Name}
            </h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <div className="flex gap-4 mt-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {userArticles.length} Articles
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Member since {new Date(user.Last_Login).toLocaleDateString()}
              </div>
            </div>
          </div>
          <Link to="/settings" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* User Articles Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Articles</h2>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : userArticles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't written any articles yet.</p>
            <Link
              to="/newarticle"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Write Your First Article
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userArticles.map(article => (
              <article key={article._id} className="flex space-x-4 hover:bg-gray-50 border-b border-gray-200 pb-4 last:border-0">
                <img
                  src={article.image}  
                  alt={article.title}
                  className="object-center col-span-2"
                />
                <div className="block p-2 rounded space-y-3">
                  <Link to={`/article/${article._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Published on {new Date(article.publishedAt).toLocaleDateString()} • {article.category}
                    </p>
                    <p className="text-gray-600 mt-1 line-clamp-2">{article.content.substring(0, 150)}...</p>
                  </Link>
                  <button className="text-red-500 hover:underline" onClick={() => removeArticle(article._id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
