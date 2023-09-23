import React, { createContext, useRef, useState } from "react";
import { useEffect } from "react";

export const GlobalToolsContext = createContext();

const GlobalToolsProvider = ({ children }) => {
  //Manage side cart
  const [isOpen, setIsOpen] = useState(true);
  const toggleSideCart = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  //Manage side menu for Mobile
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleSideMenu = () => {
    setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  //Manage side filters for Mobile
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const toggleFilterMenu = () => {
    setIsFilterOpen((prevIsOpen) => !prevIsOpen);
  };

  //Manage Mobile - Desktop components by width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Manage states for Loading Top Bar component
  const [progress, setProgress] = useState(5);
  const [buffer, setBuffer] = useState(12);
  const [visible, setVisible] = useState(false);

  const value = {
    isOpen,
    toggleSideCart,
    isMenuOpen,
    toggleSideMenu,
    isFilterOpen,
    toggleFilterMenu,
    windowWidth,
    progress,
    setProgress,
    buffer,
    setBuffer,
    visible,
    setVisible,
  };

  return (
    <GlobalToolsContext.Provider value={value}>
      {children}
    </GlobalToolsContext.Provider>
  );
};

export default GlobalToolsProvider;
