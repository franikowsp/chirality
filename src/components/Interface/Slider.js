import React from "react";

export default function Slider({
  axis,
  value,
  setValue,
  min = -360,
  max = 360,
  step = 1,
}) {
  return (
    <>
      <div id="rotation">
        <label htmlFor={`${axis}-slider`} className="rotation-label">
          {axis}
        </label>
        <input
          id={`${axis}-slider`}
          className={`${axis} rotation-slider`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <input
          id={`${axis}-text`}
          className={`rotation-text`}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={(e) => setValue(Number(e.target.value))}
        />
      </div>
    </>
  );
}
