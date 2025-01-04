import React, {useState, useEffect} from "react";
import Komentarz from "./Komentarz";
import "./Komentarz.css";

interface UserInterface {
    id: number;
    username: string;
    fullName: string;
}

interface KomentarzInterface {
    id: number;
    body: string;
    postId: number;
    user: UserInterface;
}

const Komentarze: React.FC = () => {
    const [komentarze, setKomentarze] = useState<KomentarzInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Błąd podczas pobierania komentarzy")
                }
                return response.json();
            })
            .then((data) => {
                const komentarzeMapped: KomentarzInterface[] = data.comments.map((comment: any) => ({
                    id: comment.id,
                    body: comment.body,
                    postId: comment.postId,
                    user: {
                        id: comment.user.id,
                        username: comment.user.username,
                        fullName: comment.user.fullName,
                    },
                }));
                setKomentarze(komentarzeMapped);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if(isLoading) {
        return <div>Ładowanie komentarzy...</div>;
    }

    if(error) {
        return <div>Błąd: {error}</div>;
    }

    return (
        <div className="komentarze">
            <h2>Komentarze</h2>
            {komentarze.map((komentarz) => (
                <Komentarz
                    key={komentarz.id}
                    id={komentarz.id}
                    body={komentarz.body}
                    postId={komentarz.postId}
                    likes={0}
                    user={komentarz.user}
                />
            ))}
        </div>
    );
};

export default Komentarze;