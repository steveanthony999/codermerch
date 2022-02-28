import React, { useContext, useState } from 'react';

const MobileMenuContext = React.createContext();
const MobileMenuUpdateContext = React.createContext();

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

export function useMobileMenuUpdate() {
  return useContext(MobileMenuUpdateContext);
}

export function MobileMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <MobileMenuContext.Provider value={isOpen}>
      <MobileMenuUpdateContext.Provider value={toggleMenu}>
        {children}
      </MobileMenuUpdateContext.Provider>
    </MobileMenuContext.Provider>
  );
}
