
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  pinCode: string;
  role: "user" | "admin" | "rescue";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, pinCode: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setIsLoading(true);
        
        if (session) {
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (error) {
              console.error('Error fetching profile:', error);
              setIsLoading(false);
              return;
            }

            if (profile) {
              setUser({
                id: session.user.id,
                email: profile.email,
                name: profile.name || '',
                phone: profile.phone || '',
                pinCode: profile.pin_code || '',
                role: (profile.role as User['role']) || 'user'
              });
              setIsAuthenticated(true);
            } else {
              console.warn('No profile found for user:', session.user.id);
              setUser(null);
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    // Then check current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile during initialization:', error);
          setIsLoading(false);
          return;
        }

        if (profile) {
          setUser({
            id: session.user.id,
            email: profile.email,
            name: profile.name || '',
            phone: profile.phone || '',
            pinCode: profile.pin_code || '',
            role: (profile.role as User['role']) || 'user'
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error during session check:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Email not confirmed') {
          toast.error("Please verify your email before logging in");
        } else {
          toast.error(error.message || "Failed to login");
        }
        throw error;
      }

      if (!data.user) {
        toast.error("No user data returned");
        throw new Error("No user data returned");
      }

      toast.success("Logged in successfully");
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, phone: string, pinCode: string, password: string) => {
    setIsLoading(true);
    try {
      // Step 1: Create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        toast.error(authError.message || "Failed to create account");
        throw authError;
      }
      
      if (!authData.user) {
        toast.error("User creation failed");
        throw new Error("User creation failed");
      }
      
      console.log("Auth user created:", authData.user.id);
      
      // Step 2: Create the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name,
          phone,
          pin_code: pinCode,
          email,
          role: 'user'
        });
      
      if (profileError) {
        console.error("Error creating profile:", profileError);
        toast.error("Account created but profile setup failed. Please contact support.");
        throw profileError;
      }
      
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
