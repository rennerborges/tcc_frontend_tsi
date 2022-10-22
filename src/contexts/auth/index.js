import React, { useEffect } from 'react';

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthState({
      token: token || null,
    });
  }, []);

  const setUserAuthInfo = (data) => {
    localStorage.setItem('token', data);

    setAuthState({
      token: data,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    return Boolean(authState.token);
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: setUserAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
