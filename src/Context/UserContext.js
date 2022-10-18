import React, { createContext } from 'react';
import app from '../Firebase Configuration/firebase.config';
import { getAuth } from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const authInfo = {};
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default UserContext;
