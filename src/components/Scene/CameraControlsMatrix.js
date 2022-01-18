import React, { useState } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

export default function CameraControlsMatrix() {
  const [camera, setCamera] = useState();
  return (
    <>
      <OrthographicCamera
        makeDefault
        ref={setCamera}
        zoom={5}
        position={[0, 0, 100]}
      />
      <OrbitControls
        camera={camera}
        enableRotate={false}
        enablePan={true}
        dampingFactor={1}
      />
    </>
  );
}
