import React, { createContext, useContext, useCallback } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, user, setUser, checkAuth }) => {
  const value = { user, setUser, checkAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;