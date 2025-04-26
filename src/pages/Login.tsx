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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Link
                    to="#"
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
                {isLoading ? "Signing in..." : "Sign In"}
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
