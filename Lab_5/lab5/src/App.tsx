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
    </div>
  );
}

export default App;
 