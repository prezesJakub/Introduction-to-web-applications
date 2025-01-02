import React, {useState} from "react";
import Dodawanie from "./Dodawanie";

export interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

const StudentManager: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([
        {imie: "Jan", nazwisko: "Kowalski", rocznik: 2002},
        {imie: "Michał", nazwisko: "Masłowski", rocznik: 2003},
        {imie: "Robert", nazwisko: "Nowak", rocznik: 2001},
        {imie: "Adam", nazwisko: "Marchwiński", rocznik: 2004},
        {imie: "Klaudiusz", nazwisko: "Skarbiński", rocznik: 2003},
    ]);

    const addStudent = (newStudent: Student) => {
        setStudents((prevStudents) => [...prevStudents, newStudent]);
    };

    return (
        <div>
            <h2>Student Manager</h2>
            <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dodawanie onAddStudent={addStudent} />
        </div>
    );
};

export default StudentManager;