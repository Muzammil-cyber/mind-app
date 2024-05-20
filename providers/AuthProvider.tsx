import { USERS } from "@/assets/data/user";
import { User } from "@/types/user";
import { auth } from "@/utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: typeof auth.currentUser;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async (email: string, password: string) => {},
  logout: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(auth.currentUser);
  console.log("init", user);

  async function login(email: string, password: string) {
    // login logic
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      setUser(userCredential.user);
    });
  }

  async function logout() {
    // logout logic
    await auth.signOut();
    setUser(auth.currentUser);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
