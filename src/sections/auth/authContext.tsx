import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string, username: string, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('authtoken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, username: string, isAdmin: boolean) => {
    sessionStorage.setItem('authtoken', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('IsAdmin', String(isAdmin))
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro do AuthProvider');
  }
  return context;
};
