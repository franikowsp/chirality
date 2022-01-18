import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import jstat from "jstat";

import CameraControlsMatrix from "./Scene/CameraControlsMatrix.js";
import Construct from "./Scene/Construct.js";

const generateBaseArray = function (
  start = 0,
  end = 360,
  step = 7,
  axis1 = "x",
  axis2 = "y"
) {
  const axis3 = ["x", "y", "z"].filter((d) => ![axis1, axis2].includes(d));
  const arr = jstat.jStat(start, end, step)[0];
  const baseArray = arr.flatMap((superValue, superIndex) => {
    return arr.map((value, index) => ({
      [axis1]: value,
      [axis2]: superValue,
      [axis3]: 0,
      [`${axis1}Rad`]: degToRad(value),
      [`${axis2}Rad`]: degToRad(superValue),
      [`${axis3}Rad`]: degToRad(0),
      xPosition: -index * 40 + 110,
      yPosition: -superIndex * 30 + 90,
      axis1,
      axis2,
      axis3,
    }));
  });

  return baseArray;
};

export default function SceneMatrix() {
  const baseArray = generateBaseArray();
  console.log(baseArray);

  const element = baseArray.map((d, i) => {
    // const xRotation = { deg: d, rad: degToRad(d) };

    return (
      <React.Fragment key={`subgraph-${i}`}>
        <Construct
          rotation={[d.xRad, d.yRad, d.zRad]}
          scale={0.4}
          position={[d.xPosition, d.yPosition, 0]}
        />
        <Html position={[d.xPosition, d.yPosition, 0]} scale={[7, 7, 7]}>
          <div className="label">{`${d.axis1} = ${d[d.axis1]}; ${d.axis2} = ${
            d[d.axis2]
          }`}</div>
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
