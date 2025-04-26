import React, { useState } from "react";
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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !pinCode || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, phone, pinCode, password);
      navigate("/dashboard");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
