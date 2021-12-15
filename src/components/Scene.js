import React, { useState, useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import { useSpring, animated } from "@react-spring/three";

// import Cube from "./Cube.js";
import CameraControls from "./Scene/CameraControls.js";

const clockArray = [0, 120, 240].map((d) => {
  const rad = degToRad(d);

  return [Math.sin(rad) * 10, -Math.cos(rad) * 10, 20];
});

export default function Scene() {
  const [click, setClick] = useState(false);
  const styles = useSpring({ color: click ? "#ff0000" : "#00ff00" });

  const orbCoordinates = [[0, 0, 0], ...clockArray];
  const linePoints = clockArray.map((d) => [[0, 0, 0], d]);

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
              <mesh position={d} onClick={() => setClick(!click)}>
                <sphereGeometry args={[5, 32, 32]} />
                <animated.meshPhongMaterial {...styles} />
              </mesh>
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
