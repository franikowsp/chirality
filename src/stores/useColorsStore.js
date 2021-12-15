import create from "zustand";

const useColorsStore = create((set) => ({
  currentColor: "#ff0000",
  setCurrentColor: (color) => set(() => ({ currentColor: color })),
}));

export default useColorsStore;
