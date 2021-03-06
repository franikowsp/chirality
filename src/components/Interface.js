import React from "react";
import { Link } from "react-router-dom";

import Controls from "./Interface/Controls";
import ColorSelection from "./Interface/ColorSelection";
import RotationSlider from "./Interface/RotationSlider";

export default function Interface() {
  return (
    <>
      <div id="interface">
        <h2>Chiral Structure Color</h2>
        <svg width={200} height={80}>
          <g transform={`translate(50, 20)`}>
            <ColorSelection />
          </g>
          <g transform={`translate(50, 60)`}>
            <Controls />
          </g>
        </svg>
        <div>
          <RotationSlider />
        </div>
        <div>
          <Link to="/rotation-matrix">Rotation Matrix</Link>
        </div>
      </div>
    </>
  );
}
