import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import jstat from "jstat";

import CameraControlsMatrix from "./Scene/CameraControlsMatrix.js";
import Construct from "./Scene/Construct.js";
import useMatrixStore from "../stores/useMatrixStore.js";

const getRotationArray = (state) => {
  const {
    axes: [axis1, axis2, axis3],
  } = state;

  const config1 = state[axis1];
  const config2 = state[axis2];
  const config3 = state[axis3];

  const arr1 = jstat.jStat(config1.start, config1.end, config1.step)[0];
  const arr2 = jstat.jStat(config2.start, config2.end, config2.step)[0];

  const rotationArray = arr1.flatMap((superValue, superIndex) => {
    return arr2.map((value, index) => ({
      [axis1]: value,
      [axis2]: superValue,
      [axis3]: config3.value,
      [`${axis1}Rad`]: degToRad(value),
      [`${axis2}Rad`]: degToRad(superValue),
      [`${axis3}Rad`]: degToRad(config3.value),
      xPosition: index * 40 - 130,
      yPosition: -superIndex * 30 + 90,
      axis1,
      axis2,
      axis3,
    }));
  });

  return rotationArray;
};

export default function SceneMatrix() {
  const state = useMatrixStore((state) => state);

  const rotationArray = getRotationArray(state);

  const element = rotationArray.map((d, i) => {
    return (
      <React.Fragment key={`subgraph-${i}`}>
        <Construct
          rotation={[d.xRad, d.yRad, d.zRad]}
          scale={0.4}
          position={[d.xPosition, d.yPosition, 0]}
        />
        <Html
          position={[d.xPosition, d.yPosition, 0]}
          scale={[7, 7, 7]}
          style={{ display: state.labels ? "block" : "none" }}
        >
          <div className="label">{`${d.axis1} = ${Math.round(d[d.axis1])}; ${
            d.axis2
          } = ${Math.round(d[d.axis2])}`}</div>
        </Html>
      </React.Fragment>
    );
  });

  return (
    <>
      <Canvas
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <CameraControlsMatrix />
        <color attach="background" args={[0.8, 0.8, 0.8]} />
        <ambientLight color={[1, 1, 1]} intensity={0.5} />
        <directionalLight color={[1, 1, 1]} position={[0, 1, 1]} />
        {element}
      </Canvas>
    </>
  );
}
