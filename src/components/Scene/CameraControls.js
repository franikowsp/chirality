import React, { useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function CameraControls() {
  const [camera, setCamera] = useState();
  return (
    <>
      <PerspectiveCamera makeDefault ref={setCamera} position={[0, 0, 100]} />
      <OrbitControls camera={camera} enablePan={false} dampingFactor={1} />
    </>
  );
}
