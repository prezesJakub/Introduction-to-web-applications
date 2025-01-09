import React, { useState, useEffect } from "react";
import Square from "./Square.tsx";
import Rectangle from "./Rectangle.tsx";
import Circle from "./Circle.tsx";
import { Link } from "react-router-dom";
import "../styles/shapes.css";

interface Shape {
  id: string;
  type: "square" | "rectangle" | "circle";
}

const ShapeList: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([
    { id: "1", type: "square" },
    { id: "2", type: "rectangle" },
    { id: "3", type: "circle" },
  ]);
  const [filter, setFilter] = useState<"all" | "square" | "rectangle" | "circle">(
    "all"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".shape");
      elements.forEach((el) => {
        el.classList.add("animate");
      });
      setTimeout(() => {
        elements.forEach((el) => el.classList.remove("animate"));
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addShape = (type: "square" | "rectangle" | "circle") => {
    setShapes((prevShapes) => [
      ...prevShapes,
      { id: Date.now().toString(), type },
    ]);
  };

  const removeShape = (id: string) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
  };

  const filteredShapes =
    filter === "all" ? shapes : shapes.filter((shape) => shape.type === filter);

  return (
    <div>
      <h1>Lista kształtów</h1>
      <div>
        <button onClick={() => addShape("square")}>Dodaj kwadrat</button>
        <button onClick={() => addShape("rectangle")}>Dodaj prostokąt</button>
        <button onClick={() => addShape("circle")}>Dodaj koło</button>
      </div>
      <select onChange={(e) => setFilter(e.target.value as any)}>
        <option value="all">Wszystkie</option>
        <option value="square">Kwadraty</option>
        <option value="rectangle">Prostokąty</option>
        <option value="circle">Koła</option>
      </select>
      <div className="shape-list">
        {filteredShapes.map((shape) => (
          <div key={shape.id} className="shape-container">
            <Link to={`/shape/${shape.id}`}
                state={{shape}}>
              {shape.type === "square" && <Square />}
              {shape.type === "rectangle" && <Rectangle />}
              {shape.type === "circle" && <Circle />}
            </Link>
            <button onClick={() => removeShape(shape.id)}>Usuń</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeList;