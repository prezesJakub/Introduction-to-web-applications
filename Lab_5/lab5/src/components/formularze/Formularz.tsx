import React, {useState} from "react";

function Formularz() {
    const [text, setText] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div>
            <h2>Formularz</h2>
            <input
                type="text"
                value={text}
                onChange={handleInputChange}
            />
            <div style={{marginTop: "10px"}}>
                Tekst: <strong>{text}</strong>
            </div>
        </div>
    );
}

export default Formularz;