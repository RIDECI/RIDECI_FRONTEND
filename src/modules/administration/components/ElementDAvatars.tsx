// src/modules/administration/components/ElementDAvatars.tsx
import React from "react";

interface Props { 
  className?: string; 
}

export const ElementDAvatars: React.FC<Props> = ({ className }) => {
  const avatars = [
    { initials: "JG", color: "from-indigo-500 to-indigo-600" },
    { initials: "MP", color: "from-pink-500 to-pink-600" },
    { initials: "CR", color: "from-teal-500 to-teal-600" },
  ];

  return (
    <div className={`flex gap-4 items-center ${className ?? ""}`}>
      {avatars.map((avatar, i) => (
        <div 
          key={i} 
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center shadow-lg border-2 border-white`}
        >
          <span className="text-white text-sm font-bold">{avatar.initials}</span>
        </div>
      ))}
    </div>
  );
};

export default ElementDAvatars;