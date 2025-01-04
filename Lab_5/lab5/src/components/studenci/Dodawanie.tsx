import React, {useState} from "react";
import {Student} from "./StudentManager";

interface DodawanieProps {
    onAddStudent: (student: Student) => void;
}

const Dodawanie: React.FC<DodawanieProps> = ({ onAddStudent }) => {
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [rocznik, setRocznik] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!imie.trim() || !nazwisko.trim() || !rocznik.trim()) {
            alert("Proszę uzupełnić wszystkie pola");
            return;
        }

        const rocznikNumber = parseInt(rocznik, 10);
        if(isNaN(rocznikNumber)) {
            alert("Rocznik musi być liczbą!");
            return;
        }

        onAddStudent({ imie, nazwisko, rocznik: rocznikNumber});

        setImie("");
        setNazwisko("");
        setRocznik("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Dodaj nowego studenta</h3>
            <div>
                <label>
                    Imię:
                    <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Nazwisko:
                    <input type="text" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Rocznik:
                    <input type="text" value={rocznik} onChange={(e) => setRocznik(e.target.value)} />
                </label>
            </div>
            <button type="submit">Dodaj</button>
        </form>
    );
};

export default Dodawanie;