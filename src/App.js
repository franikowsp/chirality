import React from "react";
import { Routes, Route } from "react-router-dom";

import Scene from "./components/Scene";
import Interface from "./components/Interface";

import SceneMatrix from "./components/SceneMatrix";

function Home() {
  return (
    <>
      <Scene />
      <Interface />
    </>
  );
}

function RotationMatrix() {
  return (
    <>
      <SceneMatrix />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rotation-matrix" element={<RotationMatrix />} />
    </Routes>
  );
}
