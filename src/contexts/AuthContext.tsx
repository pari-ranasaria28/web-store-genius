
import { createContext, useContext, ReactNode } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";

export type User = {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, userId } = useClerkAuth();
  const { user: clerkUser } = useUser();
  
  // For demo purposes, we'll consider any authenticated user as admin
  // In a real app, you'd check for specific roles or permissions
  const user: User | null = userId && clerkUser ? {
    id: userId,
    email: clerkUser.primaryEmailAddress?.emailAddress || "",
    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
    isAdmin: true  // In a real app, you would determine this based on user roles
  } : null;
  
  const login = async (email: string, password: string) => {
    // This function is kept for compatibility but won't be used
    // Clerk handles login through its own components
    throw new Error("Use Clerk components for authentication");
  };
  
  const logout = () => {
    // This is kept for compatibility but won't be used directly
    // Clerk handles logout through its SignOutButton component
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading: !isLoaded,
      error: null
    }}>
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
