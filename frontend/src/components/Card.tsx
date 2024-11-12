import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm mt-2">
      {children}
    </div>
  );
};

