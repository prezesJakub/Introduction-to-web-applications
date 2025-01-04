import React, {useState} from "react";

function Aktualizacja() {
    const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50});

    const updatePrice = () => {
        setProdukt((prev) => ({
            ...prev,
            cena: 100,
        }));
    };

    return (
        <div>
            <h2>Aktualizacja</h2>
            <div>
                Aktualnie {produkt.nazwa} kosztuje {produkt.cena} zł.
            </div>
            <button onClick={updatePrice}>Zmień cenę</button>
        </div>
    );
}

export default Aktualizacja;