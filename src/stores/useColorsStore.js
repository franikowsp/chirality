import create from "zustand";

const colors = Array.from({ length: 24 }, () => "#ffffff");

const useColorsStore = create((set) => ({
  currentColor: "#ff0000",
  sphereColors: colors,
  setCurrentColor: (color) => set(() => ({ currentColor: color })),
  setSphereColors: (index) =>
    set((state) => {
      const newSphereColors = [...state.sphereColors];
      newSphereColors[index] = state.currentColor;
      return {
        sphereColors: newSphereColors,
      };
    }),
}));

export default useColorsStore;
