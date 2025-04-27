
import { Outlet, useNavigate, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Bell, Users, MapPin, AlertTriangle, FileText, Settings } from "lucide-react";
import Logo from "@/components/Logo";

const AdminLayout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Bell, label: "Alerts", path: "/admin/alerts" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: MapPin, label: "Locations", path: "/admin/locations" },
    { icon: AlertTriangle, label: "Reports", path: "/admin/reports" },
    { icon: FileText, label: "Content", path: "/admin/content" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <Sidebar className="border-r border-gray-800">
          <SidebarHeader className="border-b border-gray-800 p-4">
            <Link to="/admin" className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-red-600" />
              <span className="font-semibold text-lg text-white">Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link to={item.path} className="text-gray-300 hover:text-white">
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="text-gray-400 hover:text-white" />
                <h1 className="text-xl font-semibold text-white">Snow Shield Admin</h1>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => navigate("/login")}
              >
                Logout
              </Button>
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
