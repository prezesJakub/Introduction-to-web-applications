import React from "react";

type ProduktProps = {
    nazwa: string;
};

function Produkt({ nazwa }: ProduktProps){
    return <div>Produkt: {nazwa}</div>;
}

export default Produkt;