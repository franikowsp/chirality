import create from "zustand";

// First node
const start = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  groupRotation: [0, 0, 0],
  direction: "up",
  parentGeneration: 0,
  parentGenerationId: 0,
};

const useChiralStore = create((set) => ({
  chirals: [start],
  addChirals: ({
    position,
    rotation,
    groupRotation,
    parentGeneration,
    parentGenerationId,
    direction,
  }) =>
    set((state) => ({
      chirals: [
        ...state.chirals,
        {
          position,
          rotation,
          groupRotation,
          parentGeneration,
          parentGenerationId,
          direction,
        },
      ],
    })),
  removeChirals: ({ parentGeneration, parentGenerationId, direction }) =>
    set((state) => {
      if (parentGeneration === 0) {
        return { chirals: [start] };
      } else {
        const reducedArray = [...state.chirals].filter((d) => {
          return (
            d.parentGeneration !== parentGeneration ||
            d.parentGenerationId !== parentGenerationId ||
            d.direction !== direction
          );
        });
        return { chirals: reducedArray };
      }
    }),
}));

export default useChiralStore;
