// src/components/StatsCard.tsx
import React from 'react';
import type { Stat } from '../types/Dashboard';

interface StatsCardProps {
  stat: Stat;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  return (
    <div className="stat-card">
      <p className="stat-value">
        **{stat.value}**
        {stat.unit && <span className="stat-unit">{stat.unit}</span>}
      </p>
      <p className="stat-title">{stat.title}</p>
      
      {/* Styling for the card */}
      <style >{`
        .stat-card {
          border: 1px solid #ffffffff;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
        }
        .stat-value {
          font-size: 24px;
          color: #111e3b;
          font-weight: bold;
        }
        .stat-unit {
          font-size: 16px;
          margin-left: 5px;
        }
        .stat-title {
          font-size: 12px;
          color: #ffffffff;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default StatsCard;