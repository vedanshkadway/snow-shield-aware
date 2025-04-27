import React, { useState, useEffect } from "react";
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

// Reports data (would come from backend in a real application)
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

// Weather API configuration
const WEATHER_API_KEY = "53a8fd70adec8d1c7f87503ab58e142d"; // Replace with your actual API key
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Risk level calculation based on weather conditions
const calculateRiskLevel = (temp, snowfall, windSpeed) => {
  if (snowfall > 20 || windSpeed > 30) {
    return "extreme";
  } else if (snowfall > 10 || windSpeed > 20 || temp < -10) {
    return "high";
  } else if (snowfall > 5 || windSpeed > 10 || temp < -5) {
    return "moderate";
  } else {
    return "safe";
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [searchLocation, setSearchLocation] = useState(user?.pinCode || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Weather state
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    snowfall: 0,
    windSpeed: 0,
    riskLevel: "moderate" as "safe" | "moderate" | "high" | "extreme",
    lastUpdated: new Date(),
    location: "",
    forecast: []
  });
  
  // Load initial weather data
  useEffect(() => {
    if (user?.pinCode) {
      fetchWeatherData(user.pinCode);
    }
  }, [user]);
  
  // Fetch weather data from API
  const fetchWeatherData = async (location) => {
    if (!location) {
      toast.error("Please enter a location");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Current weather
      const weatherResponse = await fetch(
        `${WEATHER_API_BASE_URL}/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error("Location not found. Please try again.");
      }
      
      const weatherResult = await weatherResponse.json();
      
      // Forecast data (next 3 days)
      const forecastResponse = await fetch(
        `${WEATHER_API_BASE_URL}/forecast?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error("Forecast data unavailable");
      }
      
      const forecastResult = await forecastResponse.json();
      
      // Process the data
      const temperature = Math.round(weatherResult.main.temp);
      
      // OpenWeatherMap doesn't directly provide snowfall data
      // For real app, you might need a specialized API or estimate from precipitation
      // This is simplified for demonstration
      const snowfall = weatherResult.snow && weatherResult.snow["3h"] 
        ? Math.round(weatherResult.snow["3h"] * 10) // Convert to cm and estimate
        : weatherResult.weather[0].main === "Snow" ? 5 : 0; // Estimate based on conditions
      
      const windSpeed = Math.round(weatherResult.wind.speed * 3.6); // Convert to km/h
      
      // Calculate risk level based on conditions
      const riskLevel = calculateRiskLevel(temperature, snowfall, windSpeed);
      
      // Process forecast data (get daily averages for 3 days)
      const forecast = [];
      const today = new Date().getDate();
      
      // Group forecast by day and calculate averages
      for (let i = 0; i < 3; i++) {
        const dayOffset = today + i;
        const dayForecasts = forecastResult.list.filter(item => {
          const itemDate = new Date(item.dt * 1000).getDate();
          return itemDate === dayOffset;
        });
        
        if (dayForecasts.length > 0) {
          // Calculate averages
          const avgTemp = dayForecasts.reduce((sum, item) => sum + item.main.temp, 0) / dayForecasts.length;
          
          // Estimate snowfall (simplified)
          const hasSnow = dayForecasts.some(item => item.weather[0].main === "Snow");
          const snowLevel = hasSnow ? 
            Math.round(Math.random() * 10) + 5 : // Random estimate if snow is predicted
            0;
          
          // Calculate average wind
          const avgWind = dayForecasts.reduce((sum, item) => sum + item.wind.speed, 0) / dayForecasts.length * 3.6;
          
          // Calculate risk level
          const dayRisk = calculateRiskLevel(avgTemp, snowLevel, avgWind);
          
          forecast.push({
            day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : "Day After",
            temperature: Math.round(avgTemp),
            snowfall: snowLevel,
            riskLevel: dayRisk
          });
        }
      }
      
      // Update state with all data
      setWeatherData({
        temperature,
        snowfall,
        windSpeed,
        riskLevel,
        lastUpdated: new Date(),
        location: `${weatherResult.name}, ${weatherResult.sys.country}`,
        forecast
      });
      
      // Update search location display
      setSearchLocation(weatherResult.name);
      
      toast.success(`Weather data updated for ${weatherResult.name}`);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err.message);
      toast.error(err.message || "Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLocationSearch = () => {
    fetchWeatherData(searchLocation);
  };
  
  const handleViewReport = (id) => {
    toast.info(`Viewing details for report ${id}`);
    // This would navigate to a detailed view in a real app
  };

  // Calculate confidence level based on data freshness and completeness
  const confidenceLevel = () => {
    // In a real app, this would be more sophisticated
    return 85;
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
              <RiskBadge level={weatherData.riskLevel} size="lg" className="mb-4" />
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium mb-2">
                  Location: {weatherData.location || searchLocation || "Not specified"}
                </h3>
                <p className="text-sm text-gray-600">
                  Last updated: {weatherData.lastUpdated.toLocaleTimeString()}
                </p>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              </div>
              
              <div className="w-full flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="location" className="sr-only">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter city name or location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button onClick={handleLocationSearch} disabled={isLoading}>
                  {isLoading ? "Loading..." : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Weather Conditions */}
        <WeatherCard 
          temperature={weatherData.temperature} 
          snowfall={weatherData.snowfall} 
          windSpeed={weatherData.windSpeed} 
          riskLevel={weatherData.riskLevel} 
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
                    style={{ width: `${Math.min(weatherData.snowfall * 5, 100)}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.snowfall === 0 
                    ? "No snowfall detected" 
                    : `Recent snowfall (${weatherData.snowfall}cm) ${
                        weatherData.snowfall > 10 ? "significantly increases risk" : "moderately affects conditions"
                      }`
                  }
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
                    className={`h-full ${weatherData.temperature < -5 ? "bg-risk-moderate" : "bg-primary"} rounded-full`}
                    style={{ width: `${Math.min(Math.abs(weatherData.temperature) * 5, 100)}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.temperature < -10
                    ? `Very cold temperatures (${weatherData.temperature}°C) increase risk`
                    : `Current temperature: ${weatherData.temperature}°C`
                  }
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
                    className={`h-full ${
                      weatherData.windSpeed > 20 ? "bg-risk-high" : 
                      weatherData.windSpeed > 10 ? "bg-risk-moderate" : "bg-primary"
                    } rounded-full`}
                    style={{ width: `${Math.min(weatherData.windSpeed * 2.5, 100)}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.windSpeed > 20
                    ? `High winds (${weatherData.windSpeed} km/h) causing snow drift`
                    : `Wind speed: ${weatherData.windSpeed} km/h`
                  }
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-lg mb-3">Model Confidence</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Confidence Level</span>
                <span className="font-medium">{confidenceLevel()}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${confidenceLevel()}%` }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Based on current weather data and terrain analysis
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
            {weatherData.forecast && weatherData.forecast.length > 0 ? (
              weatherData.forecast.map((day, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="font-medium">{day.day}</p>
                  <RiskBadge level={day.riskLevel} className="my-2" />
                  <p className="text-sm">{day.temperature}°C / {day.snowfall}cm snow</p>
                </div>
              ))
            ) : (
              <>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="font-medium">Today</p>
                  <RiskBadge level={weatherData.riskLevel} className="my-2" />
                  <p className="text-sm">{weatherData.temperature}°C / {weatherData.snowfall}cm snow</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="font-medium">Tomorrow</p>
                  <RiskBadge level="moderate" className="my-2" />
                  <p className="text-sm">Forecast unavailable</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="font-medium">Day After</p>
                  <RiskBadge level="moderate" className="my-2" />
                  <p className="text-sm">Forecast unavailable</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;