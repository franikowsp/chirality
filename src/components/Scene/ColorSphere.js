import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/three";

export default function ColorSphere({ position }) {
  const [click, setClick] = useState(false);
  const styles = useSpring({ color: click ? "#ff0000" : "#00ff00" });
  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setClick(!click);
      }}
    >
      <sphereGeometry args={[5, 32, 32]} />
      <animated.meshPhongMaterial {...styles} />
    </mesh>
  );
}
