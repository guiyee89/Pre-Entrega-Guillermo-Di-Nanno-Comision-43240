import React, { createContext, useState } from "react";
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

  //Manage state for Loading spinner on page change
  const [loading, setLoading] = useState(false);

  //Manage states for Loading Top Bar component (LoadingTopBar)
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [visible, setVisible] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  //Manage state for Spinner Loaders on navigating to ItemDetail
  const [filterLoading, setFilterLoading] = useState(false);
  //Manage state for Skeleton Loading on Images when filter color change
  const [imgLoader, setImgLoader] = useState(false); //ItemImageMobile component

  
  const value = {
    isOpen,
    toggleSideCart,
    isMenuOpen,
    toggleSideMenu,
    isFilterOpen,
    toggleFilterMenu,
    windowWidth,
    loading,
    setLoading,
    progress,
    setProgress,
    buffer,
    setBuffer,
    visible,
    setVisible,
    progressComplete,
    setProgressComplete,
    filterLoading,
    setFilterLoading,
    imgLoader,
    setImgLoader,
  };

  return (
    <GlobalToolsContext.Provider value={value}>
      {children}
    </GlobalToolsContext.Provider>
  );
};

export default GlobalToolsProvider;
