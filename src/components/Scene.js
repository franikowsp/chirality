import React from "react";
import { Canvas } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";

import CameraControls from "./Scene/CameraControls.js";
import ColorSphere from "./Scene/ColorSphere.js";

const clockArray = [0, 120, 240].map((d) => {
  const rad = degToRad(d);

  return { position: [Math.sin(rad) * 15, -Math.cos(rad) * 15, 30] };
});

export default function Scene() {
  const orbCoordinates = [{ position: [0, 0, 0] }, ...clockArray];
  const linePoints = clockArray.map((d) => [[0, 0, 0], d.position]);

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
        {orbCoordinates.map((d, i) => {
          return (
            <React.Fragment key={`orb-${i}`}>
              <ColorSphere position={d.position} />
            </React.Fragment>
          );
        })}
        {linePoints.map((d, i) => {
          return (
            <React.Fragment key={`line-${i}`}>
              <Line points={d} />
            </React.Fragment>
          );
        })}
      </Canvas>
    </>
  );
}
