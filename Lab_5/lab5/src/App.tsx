import React from "react";
import Koszyk from "./components/koszyk/Koszyk";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import Licznik from "./components/liczniki/Licznik";
import NowyLicznik from "./components/liczniki/NowyLicznik";
import Formularz from "./components/formularze/Formularz";
import Haslo from "./components/formularze/Haslo";
import Logowanie from "./components/formularze/Logowanie";
import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";
import Studenci from "./components/studenci/Studenci";
import StudentManager from "./components/studenci/StudentManager";
import Licznik2 from "./components/efekty/Licznik";
import Tytul from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";
import Komentarz from "./components/produkty/Komentarz";
import Komentarze from "./components/produkty/Komentarze";
import "./index.css";

function App() {
  return (
    <div>
      <h1>Witamy w naszym sklepie</h1>
      <Koszyk />
      <NowyKoszyk />
      <Licznik />
      <NowyLicznik />
      <Formularz />
      <Haslo />
      <Logowanie />
      <Ternary />
      <Aktualizacja />
      <Studenci />
      <StudentManager />
      <Licznik2 />
      <Tytul />
      <Odliczanie />
      <div>
        <h2>Komentarz</h2>
        <Komentarz 
          id={1}
          body="Witam wszystkich i pozdrawiam serdecznie!"
          postId={100}
          likes={5}
          user={{
            id: 1,
            username: "SuperJanek2005",
            fullName: "Jan Nowak"
          }}
        />
      </div>
      
      <Komentarze />
    </div>
  );
}

export default App;
 