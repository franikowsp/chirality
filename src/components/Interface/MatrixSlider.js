import React from "react";

import Slider from "./Slider";
import useMatrixStore from "../../stores/useMatrixStore";
import AxisSelector from "./AxisSelector";

// updateConfig: (axis, parameter, value) =>
//   set((state) => {
//     const config = { ...state.axis[parameter] };
//     config[parameter] = value;

//     return {
//       [axis]: config,
//     };
//   }),

export default function MatrixSlider() {
  const { x, y, z, axes, updateConfig, initialiseMatrix, toggleLabels } =
    useMatrixStore((state) => state);

  const getRotationArray = (axisName, axis, axes) => {
    const [axis1, axis2, axis3] = axes;

    const rotationArray = [
      {
        axis: `step`,
        value: axis.step,
        min: 0,
        max: 20,
        setValue: (value) => updateConfig(axisName, "step", value),
      },
    ];

    if (axisName === axis3) {
      rotationArray.push({
        axis: `value`,
        value: axis.value,
        min: 0,
        max: 360,
        step: (axis.end - axis.start) / axis.step,
        setValue: (value) => updateConfig(axisName, "value", value),
      });
    } else {
      rotationArray.push(
        {
          axis: `start`,
          value: axis.start,
          min: 0,
          setValue: (value) => updateConfig(axisName, "start", value),
        },
        {
          axis: `end`,
          value: axis.end,
          min: 0,
          setValue: (value) => updateConfig(axisName, "end", value),
        },

        {
          axis: `value`,
          value: axis.value,
          min: 0,
          max: 360,
          step: (axis.end - axis.start) / axis.step,
          setValue: (value) => updateConfig(axisName, "value", value),
        }
      );
    }
    return rotationArray;
  };

  return (
    <>
      <div id="interface-slider-matrix">
        <div>
          <b>x</b>
        </div>
        <AxisSelector axisName={"x"} />

        {getRotationArray("x", x, axes).map((d, i) => {
          return (
            <React.Fragment key={`matrix-${i}`}>
              <Slider {...d} />
            </React.Fragment>
          );
        })}
        <div>
          <b>y</b>
        </div>
        <AxisSelector axisName={"y"} />

        {getRotationArray("y", y, axes).map((d, i) => {
          return (
            <React.Fragment key={`matrix-${i}`}>
              <Slider {...d} />
            </React.Fragment>
          );
        })}
        <div>
          <b>z</b>
        </div>
        <AxisSelector axisName={"z"} />

        {getRotationArray("z", z, axes).map((d, i) => {
          return (
            <React.Fragment key={`matrix-${i}`}>
              <Slider {...d} />
            </React.Fragment>
          );
        })}
      </div>
      <button onClick={initialiseMatrix}>Initialize view</button>
      <button onClick={toggleLabels}>Toggle labels</button>
    </>
  );
}
