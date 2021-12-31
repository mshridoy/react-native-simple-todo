import React, { useState } from "react";

export const MainContext = React.createContext();

export default function Provider(props) {
  const [taskItems, setTaskItems] = useState([]);

  return (
    <MainContext.Provider
      value={{
        taskItems,
        setTaskItems,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
