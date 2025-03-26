// components/AnimatedBackground.tsx
"use client";

import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export default function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return <div className="animated-bg min-h-screen">{children}</div>;
}
