import React, { createContext, useState } from "react";

export const SideMenuContext = createContext();

const SideMenuProvider = ({ children }) => {

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

  const value = {
    isOpen,
    toggleSideCart,
    isMenuOpen,
    toggleSideMenu,
    isFilterOpen,
    toggleFilterMenu
  };


  return (
    <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>
  );
};

export default SideMenuProvider;