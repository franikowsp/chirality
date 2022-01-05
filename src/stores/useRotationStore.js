import create from "zustand";
import { degToRad } from "three/src/math/MathUtils";

const useRotationStore = create((set) => ({
  x: 0,
  y: 0,
  z: 0,
  xRad: 0,
  yRad: 0,
  zRad: 0,
  update: (axis, value) =>
    set(() => ({
      [axis]: value,
      [`${axis}Rad`]: degToRad(value),
    })),
}));

export default useRotationStore;
