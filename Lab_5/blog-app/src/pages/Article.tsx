import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

interface Article {
    id: string;
    title: string;
    content: string;
}

const Article = () => {
    const {id} = useParams<{id: string}>();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const storedArticles = localStorage.getItem('articles');
        if(storedArticles) {
            const articles: Article[] = JSON.parse(storedArticles);
            const foundArticle = articles.find((art) => art.id === id);
            setArticle(foundArticle || null);
        }
    }, [id]);

    return (
        <div className="article-page">
            {article ? (
                <>
                    <h1>{article.title}</h1>
                    <p>{article.content}</p>
                </>
            ) : (
                <p>Nie znaleziono artykułu</p>
            )}
        </div>
    );
};

export default Article;