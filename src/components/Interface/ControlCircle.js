import React from "react";
import { useSpring, animated } from "react-spring";

export default function ControlCircle({ cx, state, onClick, icon }) {
  const stylesCircle = useSpring({ r: state ? 20 : 15 });
  const stylesIcon = useSpring({ color: state ? "deepskyblue" : "black" });

  return (
    <>
      <animated.g
        transform={`translate(${cx + -12}, -12) scale(1.5)`}
        style={stylesIcon}
      >
        {icon()}
      </animated.g>
      <animated.circle
        style={stylesCircle}
        fill="transparent"
        stroke="deepskyblue"
        cx={cx}
        cy={0}
        onClick={onClick}
      />
      );
    </>
  );
}
