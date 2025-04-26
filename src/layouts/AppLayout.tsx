
import React, { useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bell,
  User,
  MessageSquare,
  Map,
  ArrowRight,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { SOSButton } from "@/components/SOSButton";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <Bell className="h-5 w-5" /> },
    { path: "/map", label: "Map", icon: <Map className="h-5 w-5" /> },
    { path: "/reports", label: "Reports", icon: <MessageSquare className="h-5 w-5" /> },
    { path: "/education", label: "Education", icon: <ArrowRight className="h-5 w-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-semibold text-lg">Snow Shield</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{user?.pinCode || "No location"}</span>
            </div>
            <SOSButton />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-b border-gray-200 animate-slide-in">
          <div className="container mx-auto px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100",
                  isActive(item.path) && "bg-primary/10 text-primary font-medium"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <SOSButton className="w-full" />
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar and content */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100",
                    isActive(item.path) && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700">Emergency Contacts</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-700" />
                  <span className="text-sm">Emergency: 911</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-700" />
                  <span className="text-sm">Rescue Team: 800-123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto py-4 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
