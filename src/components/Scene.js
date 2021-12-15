import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

import CameraControls from "./Scene/CameraControls.js";
import ColorSphere from "./Scene/ColorSphere.js";

const clockArray = [0, 120, 240].map((d) => {
  const rad = degToRad(d);
  const radius = 10;
  const distance = 15;

  const cylinderAngleX = -Math.atan(radius / distance);
  const cylinderAngleY = rad;

  const x = Math.sin(rad) * radius,
    y = distance,
    z = -Math.cos(rad) * radius;

  return {
    height: Math.sqrt(radius ** 2 + distance ** 2),
    positionSphere: [x, y, z],
    positionCylinderGroup: [-x / 2, y / 2, z / 2],
    rotationCylinder: [cylinderAngleX, 0, 0],
    rotationCylinderGroup: [0, cylinderAngleY, 0],
  };
});

export default function Scene() {
  const orbCoordinates = [{ positionSphere: [0, 0, 0] }, ...clockArray];

  return (
    <>
      <Canvas
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <CameraControls />
        <color attach="background" args={[0.8, 0.8, 0.8]} />
        <ambientLight color={[1, 1, 1]} intensity={0.5} />
        <directionalLight color={[1, 1, 1]} position={[0, 1, 1]} />
        {clockArray.map(
          (
            {
              positionCylinderGroup,
              rotationCylinder,
              rotationCylinderGroup,
              height,
            },
            i
          ) => {
            console.log(positionCylinderGroup);
            return (
              <React.Fragment key={`cylinder-${i}`}>
                <group
                  rotation={rotationCylinderGroup}
                  position={positionCylinderGroup}
                >
                  <mesh position={[0, 0, 0]} rotation={rotationCylinder}>
                    <cylinderGeometry args={[1, 1, height, 10, 4, false]} />
                    <meshPhongMaterial color={"white"} />
                  </mesh>
                </group>
              </React.Fragment>
            );
          }
        )}
        {orbCoordinates.map((d, i) => {
          return (
            <React.Fragment key={`orb-${i}`}>
              <ColorSphere position={d.positionSphere} />
            </React.Fragment>
          );
        })}
      </Canvas>
    </>
  );
}
