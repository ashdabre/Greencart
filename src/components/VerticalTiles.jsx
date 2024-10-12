// src/components/VerticalTiles.jsx
import React, { useEffect, useState } from 'react';
import './VerticalTiles.css'; // Ensure this path is correct

const VerticalTiles = ({ animationDelay, animationDuration, minTileWidth, stagger, tileClassName, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000); // Convert to milliseconds

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <div className={`${tileClassName} ${isVisible ? 'visible' : ''}`} style={{ animationDuration: `${animationDuration}s` }}>
      {children}
    </div>
  );
};

export default VerticalTiles;