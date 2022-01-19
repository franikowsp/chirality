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

// # Get value of nested array

// [1, 0].reduce((acc, current) => acc.at(current), findArray)

// 0

// 1 - up 1 0 = (0 + 1)
// 2 - up 1 1 = (1 + 1)
// 3 - up 1 2 = (2 + 1)

// 4 - up 2 0 0 = 3 * (0 + 1) + (0 + 1)
// 5 - up 2 0 1 = 3 * (0 + 1) + (1 + 1)
// 6 - up 2 0 2 = 3 * (0 + 1) + (2 + 1)

// 7 - up 2 1 0 = 3 * (1 + 1) + (0 + 1)
// 8 - up 2 1 1 = 3 * (1 + 1) + (1 + 1)
// 9 - up 2 1 2 = 3 * (1 + 1) + (2 + 1)

// 10 - up 2 2 0 = 3 * (2 + 1) + (0 + 1)
// 11 - up 2 2 1 = 3 * (2 + 1) + (1 + 1)
// 12 - up 2 2 2 = 3 * (2 + 1) + (2 + 1)

// 13 - down 1 0 = 12 + (0 + 1)
// 14 - down 1 1 = 12 + (1 + 1)
// 15 - down 1 2 = 12 + (2 + 1)

// 16 - down 2 0 0 = 12 + 3 * (0 + 1) + (0 + 1)
// 17 - down 2 0 1 = 12 + 3 * (0 + 1) + (1 + 1)
// 18 - down 2 0 2 = 12 + 3 * (0 + 1) + (2 + 1)

// 19 - down 2 1 0 = 12 + 3 * (1 + 1) + (0 + 1)
// 20 - down 2 1 1 = 12 + 3 * (1 + 1) + (1 + 1)
// 21 - down 2 1 2 = 12 + 3 * (1 + 1) + (2 + 1)

// 22 - down 2 2 0 = 12 + 3 * (2 + 1) + (0 + 1)
// 23 - down 2 2 1 = 12 + 3 * (2 + 1) + (1 + 1)
// 24 - down 2 2 2 = 12 + 3 * (2 + 1) + (2 + 1)

// Regel:

// generation === 0:
// 	const id = 0;
// else:
// 	const directionCode === "up" ? 0 : 12;
// 	generation === 1:
// 		const id = directionCode + (0 + i)
// 	generation === 2:
// 		const id = directionCode + 3 * (parentGenerationId + 1) + (generationId + 1)

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
