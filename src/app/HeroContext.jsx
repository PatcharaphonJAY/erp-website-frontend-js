// src/app/HeroContext.jsx
"use client";

import React, { createContext, useState, useContext } from 'react';

const HeroContext = createContext();

export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  // State สำหรับควบคุมการมองเห็น Hero Section
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Function สำหรับสลับสถานะการเปิด/ปิด
  const toggleHero = () => {
    setIsHeroVisible(prev => !prev);
  };

  return (
    <HeroContext.Provider value={{ isHeroVisible, toggleHero }}>
      {children}
    </HeroContext.Provider>
  );
};