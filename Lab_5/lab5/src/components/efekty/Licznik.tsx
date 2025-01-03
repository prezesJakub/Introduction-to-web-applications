import React, {useState, useEffect} from "react";

const Licznik2: React.FC = () => {
    const [licznik, setLicznik] = useState(0);

    useEffect(() => {
        console.log("Hello World!");
    }, []);

    useEffect(() => {
        console.log(`Licznik zwiększył się do ${licznik}`);
    }, [licznik]);

    return (
        <div>
            <h2>Licznik</h2>
            <div>Wartość: {licznik}</div>
            <button onClick={() => setLicznik(licznik+1)}>Dodaj</button>
        </div>
    );
};

export default Licznik2;