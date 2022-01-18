import React from "react";

import ColorSphere from "./ColorSphere";
import ChiralStructure from "./ChiralStructure";

import useChiralStore from "../../stores/useChiralStore";

export default function Construct({ rotation, scale, position }) {
  const { chirals } = useChiralStore((state) => state);

  return (
    <group rotation={rotation} scale={scale} position={position}>
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
    </group>
  );
}
