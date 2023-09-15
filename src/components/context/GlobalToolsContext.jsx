import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const GlobalToolsContext = createContext();

const GlobalToolsProvider = ({ children }) => {


  const [isOpen, setIsOpen] = useState(true);
  const toggleSideCart = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };


  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleSideMenu = () => {
    setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  }
 

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const toggleFilterMenu = () => {
    setIsFilterOpen((prevIsOpen) => !prevIsOpen);
  }


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

  const [itemLoader, setItemLoader] = useState()
  const loadingItems = () => {
    
  }

  
  const value = {
    isOpen,
    toggleSideCart,
    isMenuOpen,
    toggleSideMenu,
    isFilterOpen,
    toggleFilterMenu,
    windowWidth
  };


  return (
    <GlobalToolsContext.Provider value={value}>{children}</GlobalToolsContext.Provider>
  );
};

export default GlobalToolsProvider;