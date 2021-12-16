import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import CameraControls from "./Scene/CameraControls.js";
import ChiralStructure from "./Scene/ChiralStructure.js";
import ColorSphere from "./Scene/ColorSphere.js";

import useChiralStore from "../stores/useChiralStore.js";

export default function Scene() {
  const { chirals } = useChiralStore((state) => state);

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
        <ColorSphere position={[0, 0, 0]} baseNode="true" direction="down" />
        {chirals.map((d, i) => {
          return (
            <React.Fragment
              key={`chiral-${d.direction}-${d.parentGeneration}-${i}`}
            >
              <ChiralStructure
                direction={d.direction}
                position={d.position}
                rotation={d.rotation}
                groupRotation={d.groupRotation}
                parentGeneration={d.parentGeneration}
              />
              ;
            </React.Fragment>
          );
        })}
        {/* <ChiralStructure position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <ChiralStructure position={[0, 0, 0]} rotation={[0, 0, Math.PI]} />
        <ChiralStructure
          position={[0, 15, -10]}
          rotation={[-0.5880026035475675, 0, 0]}
        /> */}
      </Canvas>
    </>
  );
}
