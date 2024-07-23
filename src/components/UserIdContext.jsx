import React from "react";
import { useState } from "react";
import { createContext } from "react";
const UserIdContext = createContext();


const UserIdProvider = ({ children }) => {
  const [UserId, setUserId] = useState('')


  return (
    <UserIdContext.Provider value={{ UserId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export { UserIdProvider };
export default UserIdContext;
