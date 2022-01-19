import React from "react";
import ColorSphere from "./ColorSphere.js";

import { degToRad } from "three/src/math/MathUtils";

const clockArrayGenerate = (direction) => {
  // const degrees = direction === "up" ? [0, 120, 240] : [60, 180, 300];

  return [0, 120, 240].map((d) => {
    const rad = degToRad(d);
    const radius = 10;
    const distance = direction === "up" ? 15 : -15;

    const cylinderAngleX = -Math.atan(radius / distance);
    const cylinderAngleY = -rad;

    const x = Math.sin(rad) * radius,
      y = distance,
      z = -Math.cos(rad) * radius;

    return {
      height: Math.sqrt(radius ** 2 + distance ** 2),
      positionSphere: [x, y, z],
      positionCylinderGroup: [x / 2, y / 2, z / 2],
      rotationCylinder: [cylinderAngleX, 0, 0],
      rotationCylinderGroup: [0, cylinderAngleY, 0],
    };
  });
};

const getColorId = (
  parentGeneration,
  parentGenerationId,
  direction,
  generationId
) => {
  const generation = parentGeneration + 1;
  let id;
  if (generation === 0) {
    id = 0;
  } else {
    const directionCode = direction === "up" ? 0 : 12;
    if (generation === 1) {
      id = directionCode + (generationId + 1);
    } else if (generation === 2) {
      id = directionCode + 3 * (parentGenerationId + 1) + (generationId + 1);
    }
  }

  return id;
};

export default function ChiralStructure({
  direction = "up",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  groupRotation = [0, 0, 0],
  parentGeneration = 0,
  parentGenerationId = 0,
}) {
  const clockArray = clockArrayGenerate(direction);

  return (
    <group position={position} rotation={groupRotation}>
      <group rotation={rotation}>
        {clockArray.map((d, i) => {
          return (
            <React.Fragment
              key={`orb-connection-${direction}-${parentGeneration}-${i}`}
            >
              <ColorSphere
                position={d.positionSphere}
                rotation={d.rotationCylinder}
                groupRotation={d.rotationCylinderGroup}
                generation={parentGeneration + 1}
                generationId={i}
                parentGenerationId={parentGenerationId}
                direction={direction}
                colorId={getColorId(
                  parentGeneration,
                  parentGenerationId,
                  direction,
                  i
                )}
              />
              <group
                rotation={d.rotationCylinderGroup}
                position={d.positionCylinderGroup}
              >
                <mesh position={[0, 0, 0]} rotation={d.rotationCylinder}>
                  <cylinderGeometry args={[1, 1, d.height, 10, 4, false]} />
                  <meshPhongMaterial color={"white"} />
                </mesh>
              </group>
            </React.Fragment>
          );
        })}
      </group>
    </group>
  );
}
