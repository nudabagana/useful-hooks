import * as React from 'react';
import useStateWithLocalStorage from './useStateLocalStorage';

interface IAuth {
  token: string;
  setToken: (token: string) => void;
}

const TOKEN_NAME = 'token'

const AuthCtx = React.createContext<IAuth>({ token: '', setToken: (token: string) => {} });

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useStateWithLocalStorage(TOKEN_NAME,'');

  return <AuthCtx.Provider value={{token, setToken}}>{children}</AuthCtx.Provider>;
};
export default AuthProvider;

export const useAuth = () => React.useContext(AuthCtx);
