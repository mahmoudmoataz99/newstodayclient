import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AllArticles from './pages/All Articles';
import ArticleDetailPage from './pages/ArticleDetails';
import AddArticle from './pages/NewArticle';

import MainLayout from './MainLayout';
import { UserProvider } from './Context/UserContext';
import SignupPage from './pages/auth/SignupPage';
import Login from './pages/auth/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/newarticle" element={<AddArticle />} />
            <Route path="/allarticles" element={<AllArticles />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainLayout>
      </Router>
    </UserProvider>
  );
};

export default App;