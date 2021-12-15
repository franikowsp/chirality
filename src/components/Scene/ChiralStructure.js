import React from "react";
import ColorSphere from "./ColorSphere.js";

import { degToRad } from "three/src/math/MathUtils";

const clockArray = [0, 120, 240].map((d) => {
  const rad = degToRad(d);
  const radius = 10;
  const distance = 15;

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

export default function ChiralStructure({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  groupRotation = [0, 0, 0],
}) {
  return (
    <group position={position} rotation={groupRotation}>
      <group rotation={rotation}>
        {clockArray.map((d, i) => {
          return (
            <React.Fragment
              key={`orb-connection-${d.positionSphere.join("-")}`}
            >
              <ColorSphere
                parentPosition={position}
                position={d.positionSphere}
                rotation={d.rotationCylinder}
                parentRotation={rotation}
                groupRotation={d.rotationCylinderGroup}
                parentGroupRotation={groupRotation}
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
