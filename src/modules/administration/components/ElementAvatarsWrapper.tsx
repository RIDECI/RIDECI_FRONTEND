// src/modules/administration/components/ElementAvatarsWrapper.tsx
import React from 'react';
import avatar1 from '../assets/avatar-1.png';
import avatar2 from '../assets/avatar-2.png';
import avatar3 from '../assets/avatar-3.png';

interface User {
  name: string;
  avatar: string;
  status?: string;
}

const mockUsers: User[] = [
  { name: "Carlos Ruiz", avatar: avatar1, status: "Pendiente de validación" },
  { name: "María Gómez", avatar: avatar2, status: "Pendiente de validación" },
  { name: "Juan Sánchez", avatar: avatar3, status: "Pendiente de validación" },
];

export const ElementAvatarsWrapper: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex gap-4 flex-wrap ${className ?? ""}`}>
      {mockUsers.map((user, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow w-full sm:w-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>

            <div className="text-center">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.status}</p>
            </div>

            <div className="flex gap-2 w-full mt-2">
              <button
                className="flex-1 px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                onClick={() => console.log(`Aprobar ${user.name}`)}
              >
                Aprobar
              </button>
              <button
                className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                onClick={() => console.log(`Rechazar ${user.name}`)}
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElementAvatarsWrapper;
