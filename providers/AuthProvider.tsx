import { USERS } from "@/assets/data/user";
import { User } from "@/types/user";
import { auth } from "@/utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string) => {},
  logout: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(auth.currentUser);

  async function login(email: string, password: string) {
    // login logic
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      setUser(userCredential.user);
    });
  }

  async function register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          setUser(userCredential.user);
        }
      );
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  async function logout() {
    // logout logic
    await auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
