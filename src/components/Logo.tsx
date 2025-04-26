
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 3L18 9L12 15L6 9L12 3Z" 
        fill="#9B87F5" 
      />
      <path 
        d="M18 15L12 21L6 15L12 9L18 15Z" 
        fill="#7E69AB" 
      />
    </svg>
  );
};

export default Logo;
