import { useCallback } from "react";
import { create } from "zustand";
import api from "../api";
import { Goad, Load, toLoad } from "../types";

interface GoonStore {
  goon: Load[];
  fetch: () => Promise<void>;
  stab: (path: string, data: any) => Promise<void>;
}
export const useGoonStore = create<GoonStore>((set, get) => ({
  goon: [],
  stab: async (path: string, data: any) => {
    api.poke({
      app: "goon-web",
      mark: "json",
      json: {
        path,
        blade: data,
      },
    });
    await get().fetch();
  },
  fetch: async () => {
    const result = await api.scry<Goad>({
      app: "goon-web",
      path: "/goon",
    });

    set(() => ({ goon: [toLoad(result)] }));
  },
}));

const selGoon = (s: GoonStore) => s.goon;
export const useGoon = () => useGoonStore(selGoon);

export function useGoonClick(path: string) {
  return useCallback(() => {
    console.log("click on", path);
    useGoonStore.getState().stab(path, { click: null });
  }, [path]);
}

export function goonEdit(path: string, mode: EditMode, value: Page) {
  return useGoonStore.getState().stab(path, { [mode]: value });
}

export function goonAct(path: string, term: string) {
  return useGoonStore.getState().stab(path, { act: term });
}
