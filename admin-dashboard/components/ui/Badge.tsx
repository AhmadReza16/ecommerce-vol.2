"use client";

import React from "react";

type BadgeColor = "green" | "red" | "blue" | "gray" | "yellow" | "purple";

type BadgeProps = {
  children?: React.ReactNode;
  label?: string;
  color?: BadgeColor;
  variant?: string;
};

const colorStyles: Record<BadgeColor, string> = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
  yellow: "bg-yellow-100 text-yellow-800",
  purple: "bg-purple-100 text-purple-700",
};

const Badge: React.FC<BadgeProps> = ({ children, label, color = "gray" }) => {
  const content = label || children;

  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-0.5 rounded text-xs font-medium
        ${colorStyles[color]}
      `}
    >
      {content}
    </span>
  );
};

export default Badge;
