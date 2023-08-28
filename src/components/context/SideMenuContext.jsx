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
 
  const value = {
    isOpen,
    toggleSideCart,
    isMenuOpen,
    toggleSideMenu
  };


  return (
    <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>
  );
};

export default SideMenuProvider;