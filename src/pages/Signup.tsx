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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated, isLoading } = useAuth();

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
    
    if (!name.trim()) errors.push("Name is required");
    if (!email.trim()) errors.push("Email is required");
    if (!phone.trim()) errors.push("Phone number is required");
    if (!pinCode.trim()) errors.push("PIN code is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    // Password validation
    if (!password) {
      errors.push("Password is required");
    } else if (password.length < 6) {
      errors.push("Password should be at least 6 characters");
    }

    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Attempting to signup with:", { name, email, phone, pinCode });
      await signup(name, email, phone, pinCode, password);
      toast.success("Account created! Please check your email to verify your account.");
      // Navigate to login page after successful signup
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific error cases
      if (error.message?.includes("already registered")) {
        toast.error("This email is already registered. Try logging in instead.");
      } else if (error.message?.includes("weak password")) {
        toast.error("Please use a stronger password");
      } else {
        toast.error(error.message || "Failed to create account. Please try again.");
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <Logo className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mt-4 text-white">Create Your Snow Shield Account</h1>
          <p className="text-gray-400 mt-2">Sign up to get started with Snow Shield</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-white">Sign Up</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

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
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-gray-300">PIN Code</Label>
                <Input
                  id="pincode"
                  placeholder="12345"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password (min. 6 characters)</Label>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Creating Account...
                  </>
                ) : "Create Account"}
              </Button>

              <p className="text-sm text-gray-400 mt-4 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:underline">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;