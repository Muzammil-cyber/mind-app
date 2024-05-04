import { USERS } from "@/assets/data/user";
import { User } from "@/types/user";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  function login() {
    // login logic
    setUser(USERS[0]);
  }

  function logout() {
    // logout logic
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
