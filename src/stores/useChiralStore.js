import create from "zustand";

const useChiralStore = create((set) => ({
  chirals: [
    // { position: [0, 0, 0], rotation: [0, 0, 0], groupRotation: [0, 0, 0] },
  ],
  addChirals: ({ position, rotation, groupRotation }) =>
    set((state) => ({
      chirals: [...state.chirals, { position, rotation, groupRotation }],
    })),
}));

export default useChiralStore;
