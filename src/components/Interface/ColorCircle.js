import React from "react";
import { useSpring, animated } from "react-spring";

import useColorsStore from "../../stores/useColorsStore";

export default function ColorSelection({ cx, cy, color }) {
  const { currentColor, setCurrentColor } = useColorsStore((state) => state);

  const styles = useSpring({ r: color === currentColor ? 10 : 8 });

  return (
    <>
      <animated.circle
        style={styles}
        cx={cx}
        cy={cy}
        fill={color}
        stroke={color === "#ffffff" ? "#000000" : color}
        onClick={() => {
          setCurrentColor(color);
        }}
      />
    </>
  );
}
