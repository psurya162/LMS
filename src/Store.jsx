import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Get user data from localStorage if available, or set to default value
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : "";
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
