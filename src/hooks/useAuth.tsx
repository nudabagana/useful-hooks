import * as React from "react";
import useStateWithLocalStorage from "./useStateWithLocalStorage";

const TOKEN_NAME = "token";

const AuthCtx = React.createContext<[string, (token: string) => void]>([
  "",
  (token: string) => {},
]);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useStateWithLocalStorage(TOKEN_NAME, "");

  return (
    <AuthCtx.Provider value={[token, setToken]}>{children}</AuthCtx.Provider>
  );
};

export const useAuth = () => React.useContext(AuthCtx);
