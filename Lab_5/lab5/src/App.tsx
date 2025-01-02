import React from "react";
import Koszyk from "./components/koszyk/Koszyk";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import Licznik from "./components/liczniki/Licznik";
import NowyLicznik from "./components/liczniki/NowyLicznik";
import "./index.css";

function App() {
  return (
    <div>
      <h1>Witamy w naszym sklepie</h1>
      <Koszyk />
      <NowyKoszyk />
      <Licznik />
      <NowyLicznik />
    </div>
  );
}

export default App;
 