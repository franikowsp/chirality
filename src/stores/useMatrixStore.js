import create from "zustand";

const initial = {
  x: { start: 0, end: 360, step: 7, value: 0 },
  y: { start: 0, end: 360, step: 7, value: 0 },
  z: { start: 0, end: 360, step: 7, value: 0 },
  axes: ["x", "y", "z"],
  labels: true,
};

const useMatrixStore = create((set) => ({
  x: { start: 0, end: 360, step: 7, value: 0 },
  y: { start: 0, end: 360, step: 7, value: 0 },
  z: { start: 0, end: 360, step: 7, value: 0 },
  axes: ["x", "y", "z"],
  labels: true,
  //   axis1: "y",
  //   axis2: "z",
  //   axis3: "x",
  toggleLabels: () => set((state) => ({ labels: !state.labels })),
  updateConfig: (axis, parameter, value) =>
    set((state) => {
      const config = state[axis];
      config[parameter] = value;

      return {
        [axis]: config,
      };
    }),
  updateAxis: (axisId, axisName) =>
    set((state) => {
      const currentAxes = [...state.axes];
      const oldIndex = currentAxes.indexOf(axisName);
      const newIndex = axisId;

      [currentAxes[oldIndex], currentAxes[newIndex]] = [
        currentAxes[newIndex],
        currentAxes[oldIndex],
      ];

      console.log(currentAxes);

      return { axes: currentAxes };
    }),
  initialiseMatrix: () =>
    set(() => {
      const newState = JSON.parse(JSON.stringify(initial));
      return newState;
    }),
}));

export default useMatrixStore;
