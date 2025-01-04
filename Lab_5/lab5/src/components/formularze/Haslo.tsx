import React, {useState} from "react";

function Haslo() {
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");

    const handleHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHaslo(event.target.value);
    };

    const handlePowtorzHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPowtorzHaslo(event.target.value);
    };

    let message="";
    if(!haslo && !powtorzHaslo) {
        message="Proszę wprowadzić hasło";
    } else if(haslo !== powtorzHaslo) {
        message="Hasła nie są zgodne";
    }

    return (
        <div>
            <h2>Hasło</h2>
            <div>
                <label>
                    Hasło:
                    <input 
                        type="password" 
                        value={haslo} 
                        onChange={handleHasloChange} 
                        style={{marginLeft: "10px", marginBottom: "10px"}}
                    />
                </label>
            </div>
            <div>
                <label>
                    Powtórz hasło:
                    <input 
                        type="password" 
                        value={powtorzHaslo} 
                        onChange={handlePowtorzHasloChange} 
                        style={{marginLeft: "10px", marginBottom: "10px"}}
                    />
                </label>
            </div>
            <div>
                <div style={{color: "red", marginTop: "10px"}}>{message}</div>
            </div>
        </div>
    );
}

export default Haslo;