import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShapeList from './components/ShapeList.tsx';
import ShapeDetails from './components/ShapeDetails.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ShapeList />} />
      <Route path="/shape/:id" element={<ShapeDetails />} />
    </Routes>
  );
};

export default App;