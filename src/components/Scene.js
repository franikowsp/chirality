import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import CameraControls from "./Scene/CameraControls.js";
import Construct from "./Scene/Construct.js";

import useRotationStore from "../stores/useRotationStore.js";

export default function Scene() {
  const { xRad, yRad, zRad } = useRotationStore((state) => state);

  const element = (
    <Construct
      rotation={[xRad, yRad, zRad]}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );

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
        {element}
      </Canvas>
    </>
  );
}
