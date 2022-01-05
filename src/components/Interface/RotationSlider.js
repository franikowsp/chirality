import React from "react";

import Slider from "./Slider";
import useRotationStore from "../../stores/useRotationStore";

export default function RotationSlider() {
  const { x, y, z, update } = useRotationStore((state) => state);

  const rotationArray = [
    { axis: "x", value: x, setValue: (value) => update("x", value) },
    { axis: "y", value: y, setValue: (value) => update("y", value) },
    { axis: "z", value: z, setValue: (value) => update("z", value) },
  ];

  return (
    <>
      <div id="interface-slider">
        {rotationArray.map((d, i) => {
          return (
            <React.Fragment key={i}>
              <Slider {...d} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
