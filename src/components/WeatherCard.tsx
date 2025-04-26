
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/RiskBadge";

interface WeatherCardProps {
  temperature: number;
  snowfall: number;
  windSpeed: number;
  riskLevel: "safe" | "moderate" | "high" | "extreme";
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  snowfall,
  windSpeed,
  riskLevel,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Current Conditions</CardTitle>
          <RiskBadge level={riskLevel} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Temperature</div>
            <div className="mt-1 text-2xl font-semibold">{temperature}°C</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Snowfall</div>
            <div className="mt-1 text-2xl font-semibold">{snowfall} cm</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Wind</div>
            <div className="mt-1 text-2xl font-semibold">{windSpeed} km/h</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
