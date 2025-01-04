import React from "react";
import Produkt from "./Produkt";

function Koszyk() {
    return (
        <div>
            <h2>Koszyk</h2>
            <Produkt nazwa="Jabłko"/>
            <Produkt nazwa="Banan"/>
            <Produkt nazwa="Gruszka"/>
            <Produkt nazwa="Pomarańcza"/>
            <Produkt nazwa="Winogrona"/>
        </div>
    );
}

export default Koszyk;