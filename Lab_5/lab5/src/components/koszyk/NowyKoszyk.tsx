import React from "react";
import Produkt from "./Produkt";

function NowyKoszyk() {
    const produkty = ["Jabłko", "Banan", "Gruszka", "Pomarańcza", "Winogrona"];

    return (
        <div>
            <h2>Nowy Koszyk</h2>
            {produkty.map((nazwa, index) => (
                <Produkt key={index} nazwa={nazwa} />
            ))}
        </div>
    );
}

export default NowyKoszyk;