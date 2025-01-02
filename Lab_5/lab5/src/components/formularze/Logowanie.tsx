import React, {useState} from "react";

function Logowanie() {
    const [userName, setUserName] = useState("");
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHaslo(event.target.value);
    };

    const handlePowtorzHasloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPowtorzHaslo(event.target.value);
    };

    const allFieldsFilled = userName.trim() !== "" && haslo.trim() !== "" && powtorzHaslo.trim() !== "";

    const passwordMatched = haslo == powtorzHaslo;

    const handleLogowanieClick = () => {
        if(!passwordMatched) {
            alert("Hasła nie są zgodne");
        } else {
            alert("Zalogowano poprawnie")
        }
    };

    return (
        <div>
            <h2>Logowanie</h2>
            <div>
                <label>
                    Nazwa użytkownika:
                    <input 
                        type="text" 
                        value={userName} 
                        onChange={handleUserNameChange} 
                        style={{marginLeft: "10px", marginBottom: "10px"}}
                    />
                </label>
            </div>
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
            <button 
                onClick={handleLogowanieClick} 
                disabled={!allFieldsFilled} 
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: allFieldsFilled ? "green" : "lightgray",
                    color: "white",
                    border: "none",
                    cursor: allFieldsFilled ? "pointer" : "not-allowed",
                }}>
                Zaloguj
            </button>
        </div>
    );
}

export default Logowanie;