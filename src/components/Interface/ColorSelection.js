import React from "react";
import ColorCircle from "./ColorCircle";

const colorsArray = [
  "#ffffff",
  "#ff0000",
  "#ff8700",
  "#ffff00",
  "#008700",
  "#0000ff",
  "#8700ff",
];

export default function ColorSelection() {
  return (
    <>
      {colorsArray.map((d, i) => {
        return (
          <React.Fragment key={`circle-${i}`}>
            <ColorCircle cx={i * 20} color={d} />
          </React.Fragment>
        );
      })}
    </>
  );
}
