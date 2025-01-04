import React, {useState, useEffect} from "react";

const Licznik: React.FC = () => {
    const savedCount = localStorage.getItem("licznik");
    const initialCount = savedCount ? Number(savedCount) : 0;

    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        localStorage.setItem("licznik", String(count));
    }, [count]);

    const increment = () => setCount(count + 1);
    const resetCounter = () => setCount(0);

    return (
        <div>
            <h2>Licznik</h2>
            <div>Wartość: {count}</div>
            <button onClick={increment}>Dodaj</button>
            <button onClick={resetCounter}>Zresetuj</button>
        </div>
    );
}

export default Licznik;