import { create } from "zustand";

interface State {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;

  setSession: (id: string, name: string, email: string) => void;
  cleanSession: () => void;
}

const initialState = {
  user: null,
};

export const useCurrentUserStore = create<State>((set) => ({
  ...initialState,
  setSession: (id, name, email) => set({ user: { id, name, email } }),
  cleanSession: () => set({ ...initialState }),
}));
