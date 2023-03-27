import { createContext, useState } from "react";

export const SidebarContext = createContext({
  isActive: "",
  setActive: () => {},
});

const SidebarProvider = ({ children }) => {
  const [isActive, setIsActive] = useState("dashboard");

  const setSidebarActive = (name) => setIsActive(name);

  return (
    <SidebarContext.Provider value={{ isActive, setActive: setSidebarActive }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
