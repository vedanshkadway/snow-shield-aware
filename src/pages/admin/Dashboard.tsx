
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, Users, MapPin } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Active Alerts",
      value: "5",
      icon: Bell,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Risk Zones",
      value: "8",
      icon: MapPin,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Recent Reports",
      value: "26",
      icon: AlertTriangle,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50"
                >
                  <div className={`p-2 rounded-full bg-red-500/10`}>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">
                      High Risk Alert - Zone {i}
                    </h4>
                    <p className="text-xs text-gray-400">
                      2 minutes ago • Pin Code: 1234{i}0
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Active Risk Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50"
                >
                  <div className={`p-2 rounded-full bg-yellow-500/10`}>
                    <MapPin className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">
                      Zone {i} - Mountain Range
                    </h4>
                    <p className="text-xs text-gray-400">
                      Risk Level: High • 150 users in area
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
