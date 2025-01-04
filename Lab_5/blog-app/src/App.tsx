import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import AddArticle from './pages/AddArticle';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Piękny blog</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/blog">Blog</Link>
          {" | "}
          <Link to="/dodaj">Dodaj artykuł</Link>
        </div>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/dodaj" element={<AddArticle />} />
      </Routes>
    </div>
  );
}

export default App;
