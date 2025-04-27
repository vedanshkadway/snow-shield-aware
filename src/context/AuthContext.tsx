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
    // Check current session first
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setIsLoading(false);
          return;
        }
        
        if (!session) {
          console.log('No active session');
          setIsLoading(false);
          return;
        }

        console.log('Found session for user:', session.user.id);
        
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          // If no profile exists yet but we have a session, we might create one
          if (profileError.code === 'PGRST116') {
            console.log('Profile not found, creating one...');
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.name || '',
                phone: session.user.user_metadata?.phone || '',
                pin_code: session.user.user_metadata?.pinCode || '',
                role: 'user'
              });
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
            } else {
              // Retry fetching the profile
              const { data: newProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (newProfile) {
                setUser({
                  id: session.user.id,
                  email: newProfile.email,
                  name: newProfile.name || '',
                  phone: newProfile.phone || '',
                  pinCode: newProfile.pin_code || '',
                  role: (newProfile.role as User['role']) || 'user'
                });
                setIsAuthenticated(true);
              }
            }
          }
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

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }
        
        if (!session) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        setIsLoading(true);
        
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

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
        } finally {
          setIsLoading(false);
        }
      }
    );

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
        console.error("Login error:", error);
        if (error.message.includes('Email not confirmed')) {
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
      return;
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
      // Step 1: Create the auth user with metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            pinCode
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (authError) {
        console.error("Auth error:", authError);
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
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }
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