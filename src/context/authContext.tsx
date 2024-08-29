import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect, use } from 'react';

interface User {
  username: string;
  token: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: () => number;
  isLogged: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const isLogged = () => {
    if (loading) return 0;
    if (!user) {
      return -1;
    }
    return 1;
  };

  const isAdmin = () => {
    if (loading) return 0;
    if (!user) {
      return -1;
    }
    return user.role == 'admin' ? 1 : 2;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
