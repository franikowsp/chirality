import React, { useState } from "react";

import useMatrixStore from "../../stores/useMatrixStore";

export default function AxisSelector({ axisName }) {
  const { axes, updateAxis } = useMatrixStore((state) => state);
  const axisIndex = axes.indexOf(axisName);

  //   const [value, setValue] = useState(`${axisIndex}`);

  return (
    <div>
      <label htmlFor={`${axisName}-axis-matrix`}>Axis state: </label>

      <select
        name={`${axisName}-axis-matrix`}
        id={`${axisName}-axis-matrix`}
        value={axisIndex}
        onChange={(e) => updateAxis(e.target.value, axisName)}
      >
        <option value="0">Axis 1 (columns)</option>
        <option value="1">Axis 2 (rows)</option>
        <option value="2">Axis 3 (slider)</option>
      </select>
    </div>
  );
}
