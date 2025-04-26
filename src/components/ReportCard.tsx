
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import { formatDistanceToNow } from "date-fns";

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  imageUrl?: string;
  riskLevel: "safe" | "moderate" | "high" | "extreme";
  className?: string;
  onViewDetails?: (id: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  id,
  title,
  description,
  location,
  timestamp,
  imageUrl,
  riskLevel,
  className,
  onViewDetails,
}) => {
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base">{title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <RiskBadge level={riskLevel} />
        </div>
      </CardHeader>
      
      {imageUrl && (
        <div className="px-6">
          <div className="aspect-video w-full rounded-md overflow-hidden bg-gray-100">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      <CardContent className="py-3">
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between">
        <span className="text-xs text-gray-500">{timeAgo}</span>
        {onViewDetails && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(id)}
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
