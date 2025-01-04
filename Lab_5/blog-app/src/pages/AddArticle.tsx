import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleAddArticle = () => {
        const newArticle = {
            id: Date.now().toString(),
            title,
            content,
        };
        const storedArticles = localStorage.getItem('articles');
        const articles = storedArticles ? JSON.parse(storedArticles) : [];
        articles.push(newArticle);
        localStorage.setItem('articles', JSON.stringify(articles));
        navigate('/blog');
    };

    return (
        <div className="form">
            <h1>Dodaj artykuł</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddArticle();
                }}
            >
                <div>
                    <label>Tytuł:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Treść:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
};

export default AddArticle;