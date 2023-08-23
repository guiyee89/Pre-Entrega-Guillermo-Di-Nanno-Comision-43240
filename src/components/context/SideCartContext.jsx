import React, { createContext, useState } from "react";

export const SideCartContext = createContext();

export const SideCartProvider = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  const togglecart = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const value = {
    isOpen,
    togglecart,
  };


  return (
    <SideCartContext.Provider value={value}>{children}</SideCartContext.Provider>
  );
};

export default SideCartProvider;