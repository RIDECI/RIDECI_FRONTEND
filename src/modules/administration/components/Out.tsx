import React from "react";

interface OutProps {
  className?: string;
  componentVariantHoverTrueClassName?: string;
  hasVector?: boolean;
  property1?: string;
}

export const Out: React.FC<OutProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className ?? ""}`}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-sm" />
    </div>
  );
};

export default Out;