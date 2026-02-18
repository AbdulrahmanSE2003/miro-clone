import { create } from "zustand";

const defaultValues = { id: "", title: "" };
interface RenameModal {
  isOpen: boolean;
  initialState: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<RenameModal>((set) => ({
  isOpen: false,
  initialState: defaultValues,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialState: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialState: defaultValues,
    }),
}));
