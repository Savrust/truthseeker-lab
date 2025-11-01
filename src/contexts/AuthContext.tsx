import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; userNotFound?: boolean }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "truthseeker_users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load users from localStorage
  const getUsers = (): User[] => {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  };

  // Save users to localStorage
  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("current_user");
    if (savedEmail) {
      setIsAuthenticated(true);
      setCurrentUser(savedEmail);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; userNotFound?: boolean }> => {
    if (!email || !password) {
      return { success: false };
    }

    const users = getUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      // User exists, verify password
      if (existingUser.password === password) {
        setIsAuthenticated(true);
        setCurrentUser(email);
        localStorage.setItem("current_user", email);
        return { success: true, userNotFound: false };
      } else {
        // Wrong password
        return { success: false, userNotFound: false };
      }
    } else {
      // User not found - should redirect to signup
      return { success: false, userNotFound: true };
    }
  };

  const register = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    const users = getUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return { 
        success: false, 
        message: "Email already exists" 
      };
    }

    // Create new user
    const newUser: User = { email, password };
    users.push(newUser);
    saveUsers(users);
    setIsAuthenticated(true);
    setCurrentUser(email);
    localStorage.setItem("current_user", email);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("current_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

