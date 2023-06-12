/* eslint-disable no-param-reassign */
import { useCallback, useMemo } from "react";
import _ from "lodash";
import api from "../api";
import create from "zustand";
import { produce } from "immer";
type Contact = any;

export interface ContactState {
  contacts: {
    [ship: string]: Contact;
  };
  /** subscribes to profile updates */
  fetchAll: () => Promise<void>;
  start: () => Promise<void>;
}

const useContactState = create<ContactState>((set, get) => ({
  contacts: {},
  fetchAll: async () => {
    const contacts = await api.scry({
      app: "contacts",
      path: "/all",
    });
    console.log(contacts);

    set((state) => ({ contacts: { ...contacts, ...state.contacts } }));
  },
  start: async () => {
    await get().fetchAll();

    api.subscribe({
      app: "contacts",
      path: "/news",
      event: (event: any) => {
        set(
          produce((draft: ContactState) => {
            if (event.con) {
              draft.contacts[event.who] = event.con;
            } else {
              delete draft.contacts[event.who];
            }
          })
        );
      },
    });
  },
}));

export const emptyContact = {
  nickname: "",
  bio: "",
  status: "",
  color: "0x0",
  avatar: null,
  cover: null,
  groups: [] as string[],
};

const selContacts = (s: ContactState) => s.contacts;
export function useContacts() {
  return useContactState(selContacts);
}

export function useMemoizedContacts() {
  return useMemo(() => useContactState.getState().contacts, []);
}

export function useContact(ship: string) {
  return useContactState(
    useCallback((s) => s.contacts[ship] || emptyContact, [ship])
  );
}

export function useOurContact() {
  return useContact((window as any).our as string);
}

export default useContactState;
