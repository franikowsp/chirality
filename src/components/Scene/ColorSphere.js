import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

import useColorsStore from "../../stores/useColorsStore";
import useChiralStore from "../../stores/useChiralStore.js";

export default function ColorSphere({
  position,
  parentPosition = [0, 0, 0],
  rotation = [0, 0, 0],
  groupRotation = [0, 0, 0],
  startsChiral = false,
}) {
  const { chirals, addChirals } = useChiralStore((state) => state);
  const [sphereColor, setSphereColor] = useState("#ffffff");
  const [hasChiral, setHasChiral] = useState(startsChiral);

  const { currentColor } = useColorsStore((state) => state);

  const { color } = useSpring({ color: sphereColor });

  return (
    <mesh
      position={position}
      onDoubleClick={(e) => {
        e.stopPropagation();

        const test = new THREE.Vector3();

        e.object.getWorldDirection(test);

        const { x: rX, y: rY, z: rZ } = test;
        console.log(rX);

        const positionCheck = new THREE.Vector3();

        const { x, y, z } = positionCheck.getPositionFromMatrix(
          e.object.matrixWorld
        );
        // const { rX, rY, rZ } = positionCheck.getRotationFromMatrix(
        //   e.object.matrixWorld
        // );

        const newPosition = [x, y, z];
        const newRotation = [rX, rY, rZ];

        // console.log(newRotation);

        setSphereColor(currentColor);
        if (!hasChiral) {
          addChirals({
            position: newPosition,
            groupRotation: groupRotation,
            rotation: rotation,
          });
          setHasChiral(!hasChiral);
        }
      }}
    >
      <sphereGeometry args={[5, 32, 32]} />
      <animated.meshPhongMaterial color={color} />
    </mesh>
  );
}
