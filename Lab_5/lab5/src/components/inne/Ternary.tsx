import React from "react";

function Ternary() {
    const a = true;
    const b = false;

    return (
        <div>
            <h2>Ternary</h2>
            <div>{a ? "Stwierdzenie a jest prawdziwe" : "Stwierdzenie a jest fałszywe"}</div>
            <div>{b ? "Stwierdzenie b jest prawdziwe" : "Stwierdzenie b jest fałszywe"}</div>
        </div>
    );
}

export default Ternary;