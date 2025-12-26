"use client";

import React from "react";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

const Loader: React.FC<LoaderProps> = ({ size = "md", fullScreen = false }) => {
  const spinner = (
    <div
      className={`
        animate-spin rounded-full
        border-gray-300 border-t-primary
        ${sizeMap[size]}
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
