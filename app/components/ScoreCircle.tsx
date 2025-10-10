import React, { useId } from "react";

interface ScoreCircleProps {
  value: number;
  max?: 5;
  size?: number;
  strokeWidth?: number;
  gradient?: [string, string]; // e.g. ["#34d399", "#3b82f6"]
  backgroundColor?: string;
  className?: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  value,
  max = 100,
  size = 90,
  strokeWidth = 10,
  gradient = ["#FF97AD", "#5171FF"], // default: green to blue
  backgroundColor = "#e5e7eb", // gray-200
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), max);
  const offset = circumference - (clampedValue / max) * circumference;
  const id = useId();
  const gradientId = `gradient-${id}`; // unique per instance

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Gradient Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Score Text */}
      <div className={`absolute text-xl font-semibold ${className}`}>
        {Math.round((clampedValue / max) * 100).toFixed(2)}
      </div>
    </div>
  );
};
