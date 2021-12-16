import create from "zustand";

const useInterfaceStore = create((set) => ({
  add: false,
  toggleAdd: () =>
    set((state) => ({
      add: !state.add,
      remove: !state.add === false && state.remove === true,
    })),
  remove: false,
  toggleRemove: () =>
    set((state) => ({
      remove: !state.remove,
      add: !state.remove === false && state.add === true,
    })),
}));

export default useInterfaceStore;
