import React, { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({children}){
    
  const [userEmail, setUserEmail] = useState(null);

  function setUser(email){
    setUserEmail(email);
  };

  return (
    <UserContext.Provider value={{userEmail, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
