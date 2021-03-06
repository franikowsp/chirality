import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

import useColorsStore from "../../stores/useColorsStore";
import useChiralStore from "../../stores/useChiralStore.js";
import useInterfaceStore from "../../stores/useInterfaceStore.js";

export default function ColorSphere({
  position,
  rotation = [0, 0, 0],
  groupRotation = [0, 0, 0],
  generation = 0,
  generationId = 0,
  direction = "down",
  colorId = 0,
}) {
  const { add, remove, colorClick } = useInterfaceStore((state) => state);
  const { addChirals, removeChirals } = useChiralStore((state) => state);
  const [hasChiral, setHasChiral] = useState(false);

  const { sphereColors, setSphereColors } = useColorsStore((state) => state);

  const { color } = useSpring({ color: sphereColors[colorId] });

  return (
    <mesh
      position={position}
      onDoubleClick={(e) => {
        e.stopPropagation();

        if (add && generation < 2 && !hasChiral) {
          const positionCheck = new THREE.Vector3();

          const { x, y, z } = positionCheck.getPositionFromMatrix(
            e.object.matrixWorld
          );

          const newPosition = [x, y, z];

          addChirals({
            position: newPosition,
            groupRotation: groupRotation,
            rotation: rotation,
            parentGeneration: generation,
            parentGenerationId: generationId,
            direction: direction,
          });
          setHasChiral(true);
        } else if (remove) {
          removeChirals({
            parentGeneration: generation,
            parentGenerationId: generationId,
            direction,
          });
          setHasChiral(false);
        } else {
          colorClick && setSphereColors(colorId);
        }
      }}
    >
      <sphereGeometry args={[5, 32, 32]} />
      <animated.meshPhongMaterial color={color} />
    </mesh>
  );
}
