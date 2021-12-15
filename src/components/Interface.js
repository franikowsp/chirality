import React from "react";
import ColorSelection from "./Interface/ColorSelection";

export default function Interface() {
  return (
    <>
      <div id="interface">
        <h2>Chiral Structure Color</h2>
        <svg width={200} height={100}>
          <g transform={`translate(50, 50)`}>
            <ColorSelection />
          </g>
        </svg>
      </div>
    </>
  );
}
