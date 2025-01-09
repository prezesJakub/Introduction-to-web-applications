import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "../styles/shapes.css";

const ShapeDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const shape = location.state?.shape;

  if (!shape) {
    return <p>Kształt nie został znaleziony!</p>;
  }

  const renderShape = () => {
    switch (shape.type) {
      case 'square':
        return <div className="square" />;
      case 'rectangle':
        return <div className="rectangle" />;
      case 'circle':
        return <div className="circle"/>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Detale kształtu</h2>
      <p>ID: {id}</p>
      <p>Typ: {shape.type}</p>
      <div>{renderShape()}</div>
    </div>
  );
};

export default ShapeDetails;