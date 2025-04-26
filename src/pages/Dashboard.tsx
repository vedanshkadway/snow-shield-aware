
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskBadge } from "@/components/RiskBadge";
import { useAuth } from "@/context/AuthContext";
import WeatherCard from "@/components/WeatherCard";
import ReportCard from "@/components/ReportCard";
import { Search } from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockReports = [
  {
    id: "1",
    title: "Fresh Snowfall on North Peak",
    description: "Approximately 20cm of fresh snow accumulation in the last 12 hours. Conditions are stable but caution advised on steep slopes.",
    location: "North Ridge, Pin 12345",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    riskLevel: "moderate" as const
  },
  {
    id: "2",
    title: "Avalanche Sighted",
    description: "Small avalanche observed on eastern slope around 2:30 PM. Area has been marked as dangerous. Please avoid travel in this area.",
    location: "East Valley, Pin 23456",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    riskLevel: "high" as const
  },
  {
    id: "3",
    title: "Safe Conditions Reported",
    description: "Trail conditions are good with packed snow and no signs of instability. Good visibility and moderate temperatures.",
    location: "South Trail, Pin 34567",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    riskLevel: "safe" as const
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [searchLocation, setSearchLocation] = useState(user?.pinCode || "");
  const [riskLevel, setRiskLevel] = useState<"safe" | "moderate" | "high" | "extreme">("moderate");
  
  const handleLocationSearch = () => {
    toast.info(`Fetching data for location: ${searchLocation}`);
    // In a real app, this would make an API call and update the risk level and weather data
    // For now, we'll just simulate a result
    const randomRisk = ["safe", "moderate", "high", "extreme"][Math.floor(Math.random() * 4)] as "safe" | "moderate" | "high" | "extreme";
    setRiskLevel(randomRisk);
  };
  
  const handleViewReport = (id: string) => {
    toast.info(`Viewing details for report ${id}`);
    // This would navigate to a detailed view in a real app
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Assessment Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Current Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
              <RiskBadge level={riskLevel} size="lg" className="mb-4" />
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium mb-2">Location: {searchLocation || "Not specified"}</h3>
                <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleTimeString()}</p>
              </div>
              
              <div className="w-full flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="location" className="sr-only">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter PIN code or location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button onClick={handleLocationSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Weather Conditions */}
        <WeatherCard 
          temperature={-5} 
          snowfall={15} 
          windSpeed={20} 
          riskLevel={riskLevel} 
        />
      </div>
      
      {/* Risk Factors & Reports Tabs */}
      <Tabs defaultValue="factors" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 w-[400px]">
          <TabsTrigger value="factors">Risk Factors</TabsTrigger>
          <TabsTrigger value="reports">Recent Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="factors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Snowfall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Recent heavy snowfall (15cm in 24h) increases risk
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-risk-moderate rounded-full" 
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Stable temperatures around -5°C
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Wind</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-risk-high rounded-full" 
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  High winds (20 km/h) causing snow drift
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-lg mb-3">Model Confidence</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Confidence Level</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: "85%" }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Based on 24 weather data points and terrain analysis
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReports.map((report) => (
              <ReportCard 
                key={report.id}
                {...report}
                onViewDetails={handleViewReport}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>3-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-medium">Today</p>
              <RiskBadge level={riskLevel} className="my-2" />
              <p className="text-sm">-5°C / 15cm snow</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-medium">Tomorrow</p>
              <RiskBadge level="high" className="my-2" />
              <p className="text-sm">-3°C / 20cm snow</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-medium">Day After</p>
              <RiskBadge level="moderate" className="my-2" />
              <p className="text-sm">-2°C / 5cm snow</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
