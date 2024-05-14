import React, { useState } from "react";
import InfoContext from "./InfoContext";

const InfoProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <InfoContext.Provider value={{ language, setLanguage }}>
      {children}
    </InfoContext.Provider>
  );
};

export default InfoProvider;
