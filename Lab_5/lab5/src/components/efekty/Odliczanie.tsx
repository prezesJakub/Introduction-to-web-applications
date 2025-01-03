import React, {useState, useEffect} from "react";

const Odliczanie: React.FC = () => {
    const [licznik, setLicznik] = useState(15);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const toggleTimer = () => {
        if(isRunning) {
            if(intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        } else {
            const id = setInterval(() => {
                setLicznik((prev) => {
                    if(prev <= 0) {
                        clearInterval(id);
                        setIntervalId(null);
                        return 0;
                    } 
                    return Math.max(prev-0.1, 0);
                });
            }, 100);
            setIntervalId(id);
        }
        setIsRunning(!isRunning);
    };

    useEffect(() => {
        return () => {
            if(intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return (
        <div>
            <h2>Odliczanie</h2>
            <div>Wartość: {licznik.toFixed(1)} s</div>
            <button onClick={toggleTimer} disabled={licznik <= 0}>
                {licznik <= 0 ? "Odliczanie zakończone" : isRunning ? "STOP" : "START"}
            </button>
        </div>
    );
};

export default Odliczanie;