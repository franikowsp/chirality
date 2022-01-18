import create from "zustand";

const useInterfaceStore = create((set) => ({
  add: false,
  remove: false,
  colorClick: true,
  toggleAdd: () =>
    set((state) => ({
      add: !state.add,
      remove: state.add && state.remove && state.colorClick,
      colorClick: false,
    })),
  toggleRemove: () =>
    set((state) => ({
      remove: !state.remove,
      add: state.remove && state.add && state.colorClick,
      colorClick: false,
    })),
  activateColorClick: () =>
    set(() => ({
      colorClick: true,
      add: false,
      remove: false,
    })),
}));

export default useInterfaceStore;
