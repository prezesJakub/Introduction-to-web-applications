import React from "react";
import Koszyk from "./components/koszyk/Koszyk";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import "./index.css";

function App() {
  return (
    <div>
      <h1>Witamy w naszym sklepie</h1>
      <Koszyk />
      <NowyKoszyk />
    </div>
  );
}

export default App;
 