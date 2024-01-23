import { Auth, getAuth } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  auth: Auth;
}

export const useAuth = create<AuthState>(() => ({
  auth: getAuth(),
}));
