import React from "react";
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home">
                <h1>Witamy na naszym wspaniałym blogu!</h1>
                <p>
                    Odkryj interesujące artykuły, czerp i dziel się pięknem życia!
                </p>
                <Link to="/blog" className="blog-link">Przejdź do bloga</Link>
            </div>          
        </div>
    );
};

export default Home;