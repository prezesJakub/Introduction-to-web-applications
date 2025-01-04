import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

interface Article {
    id: string;
    title: string;
    content: string;
}

const Blog = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const storedArticles = localStorage.getItem('articles');
        if(storedArticles) {
            const parsedArticles = JSON.parse(storedArticles) as Article[];
            const sortedArticles = parsedArticles.sort((a, b) => Number(b.id) - Number(a.id));
            setArticles(sortedArticles);
        }
    }, []);

    return (
        <div className="container">
            <h1>Najnowsze artykuły</h1>
            {articles.length === 0 ? (
                <p>Brak artykułów. Dodaj pierwszy!</p>
            ) : (
            <ul className="article-list">
                {articles.map((article) => (
                    <li key={article.id}>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default Blog;