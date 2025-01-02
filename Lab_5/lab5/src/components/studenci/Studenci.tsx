import React from "react";

interface Student {
    imie: String;
    nazwisko: String;
    rocznik: number;
}

const Students: Student[] = [
{imie: "Jan", nazwisko: "Kowalski", rocznik: 2002},
{imie: "Michał", nazwisko: "Masłowski", rocznik: 2003},
{imie: "Robert", nazwisko: "Nowak", rocznik: 2001},
{imie: "Adam", nazwisko: "Marchwiński", rocznik: 2004},
{imie: "Klaudiusz", nazwisko: "Skarbiński", rocznik: 2003},
];

function Studenci() {
    return (
        <div>
            <h2>Studenci</h2>
            <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {Students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Studenci;