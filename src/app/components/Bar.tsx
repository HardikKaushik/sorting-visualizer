// components/Bar.tsx
'use client'
import React from 'react';

interface BarProps {
  height: number;
}

const Bar: React.FC<BarProps> = ({ height }) => {
  return (
    <div
      className="inline-block bg-blue-500 mx-0.5"
      style={{ height: `${height}px`, width: '20px' }}
    ></div>
  );
};

export default Bar;
