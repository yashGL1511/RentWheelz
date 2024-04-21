import React, { useState, createContext, useContext, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component for the AuthContext
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const logIn = () => {
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);}
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
export { AuthProvider };