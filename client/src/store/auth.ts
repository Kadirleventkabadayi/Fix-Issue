import { atom } from "jotai";
import { User, Session } from "@/lib/auth";

export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
export const isLoadingAtom = atom(true);
