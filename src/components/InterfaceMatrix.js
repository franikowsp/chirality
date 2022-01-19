import React from "react";
import { Link } from "react-router-dom";

import MatrixSlider from "./Interface/MatrixSlider";

export default function InterfaceMatrix() {
  return (
    <>
      <div id="interface">
        <h2>Rotation Matrix</h2>
        <div>
          <MatrixSlider />
        </div>
        <div>
          <Link to="/#">Color Structure</Link>
        </div>
      </div>
    </>
  );
}
