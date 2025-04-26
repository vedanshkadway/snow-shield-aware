
import React from "react";
import { cn } from "@/lib/utils";

type RiskLevel = "safe" | "moderate" | "high" | "extreme";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const RiskBadge = ({ 
  level, 
  className, 
  iconOnly = false,
  size = "md" 
}: RiskBadgeProps) => {
  const levelText = {
    safe: "Safe",
    moderate: "Moderate Risk",
    high: "High Risk",
    extreme: "Extreme Danger"
  };

  const bgColor = {
    safe: "bg-risk-safe",
    moderate: "bg-risk-moderate",
    high: "bg-risk-high",
    extreme: "bg-risk-extreme"
  };
  
  const textColor = {
    safe: "text-green-800",
    moderate: "text-yellow-800",
    high: "text-orange-800",
    extreme: "text-white"
  };
  
  const borderColor = {
    safe: "border-green-300",
    moderate: "border-yellow-300",
    high: "border-orange-400",
    extreme: "border-red-600"
  };
  
  const sizeClasses = {
    sm: iconOnly ? "w-2 h-2" : "text-xs px-2 py-0.5",
    md: iconOnly ? "w-3 h-3" : "text-sm px-2.5 py-1",
    lg: iconOnly ? "w-4 h-4" : "text-base px-3 py-1.5"
  };

  if (iconOnly) {
    return (
      <span 
        className={cn(
          "inline-block rounded-full",
          bgColor[level],
          sizeClasses[size],
          className
        )}
        title={levelText[level]}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        bgColor[level],
        textColor[level],
        borderColor[level],
        sizeClasses[size],
        className
      )}
    >
      <span className={cn("inline-block w-2 h-2 rounded-full", bgColor[level])} />
      {levelText[level]}
    </span>
  );
};
