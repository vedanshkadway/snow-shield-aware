import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enhanced validation
    const errors = [];
    
    if (!email.trim()) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Attempting to login with email:", email);
      await login(email, password);
      // Don't navigate here - let the auth state change trigger navigation
      console.log("Login successful, waiting for auth state change");
    } catch (error: any) {
      console.error("Login error in component:", error);
      
      // Handle specific error cases
      if (error.message?.includes("Invalid login credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message?.includes("Email not confirmed")) {
        toast.error("Please verify your email before logging in");
      } else {
        toast.error(error.message || "Failed to login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
        <p className="mt-4 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <Logo className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mt-4 text-white">Welcome to Snow Shield</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-white">Login</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-red-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In"}
              </Button>

              <p className="text-sm text-gray-400 mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:underline">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;