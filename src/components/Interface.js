import React from "react";

import Controls from "./Interface/Controls";
import ColorSelection from "./Interface/ColorSelection";

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
      </div>
    </>
  );
}
