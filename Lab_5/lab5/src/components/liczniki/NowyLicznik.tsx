import React, {useState} from "react";
import Przycisk from "./Przycisk";

function NowyLicznik() {
    const [licznik, setLicznik] = useState(0);

    const increment = () => {
        setLicznik(licznik+1);
    };

    return (
        <div>
            <h2>Nowy Licznik</h2>
            <div>Wartość: {licznik}</div>
            <Przycisk onClick={increment} />
        </div>
    );
}

export default NowyLicznik;