import React, {useState} from "react";
import "./Komentarz.css";

interface User {
    id: number;
    username: string;
    fullName: string;
}

interface KomentarzProps {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({id, body, postId, likes, user}) => {
    const [likesCount, setLikesCount] = useState(likes);

    const likeClicked = () => setLikesCount(likesCount + 1);
    const dislikeClicked = () => setLikesCount(likesCount - 1);

    return (
        <div className="komentarz">
            <div className="komentarz-header">
                <strong>{user.fullName} (@{user.username})</strong>
            </div>
            <div className="komentarz-body">
                <p>{body}</p>
            </div>
            <div className="komentarz-info">
                <span>Post ID: {postId}</span>
                <span>Comment ID: {id}</span>
            </div>
            <div className="komentarz-interactions">
                <button onClick={likeClicked} className="komentarz-button like-button">
                    👍
                </button>
                <button onClick={dislikeClicked} className="komentarz-button dislike-button">
                    👎
                </button>
                <span className="komentarz-likes-count">Likes: {likesCount}</span>
            </div>
        </div>
    );
};

export default Komentarz;