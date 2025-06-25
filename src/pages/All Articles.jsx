import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';

function AllArticles() {
 const [articles, setArticles] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchArticles = async () => {
   try {
    setIsLoading(true);
    const response = await fetch('https://news-today-api.vercel.app/articles');
    const data = await response.json();
    setArticles(data);
   } catch (error) {
    console.error("Error fetching articles:", error);
   } finally {
    setIsLoading(false);
   }
  };
  fetchArticles();
 }, []);

 return (
  <section className="min-h-screen">

   {/* Main Content */}
   <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
    <div className="flex justify-between items-center mb-12">
     <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
       All Blog Posts
      </h2>
      <p className="text-gray-500 mt-2">
       From the latest trends to timeless tutorials.
      </p>
     </div>
    </div>

    {/* Articles Grid */}
    {isLoading ? (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
       <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
         <div className="h-6 bg-gray-200 rounded mb-4"></div>
         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
       </div>
      ))}
     </div>
    ) : articles.length > 0 ? (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
       <ArticleCard key={article._id} article={article} />
      ))}
     </div>
    ) : (
     <div className="text-center py-16">
      <div className="mx-auto h-24 w-24 text-gray-400">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">No articles available</h3>
      <p className="mt-2 text-gray-500">Please check back later for new content.</p>
     </div>
    )}
   </main>
  </section>
 );
}

export default AllArticles;