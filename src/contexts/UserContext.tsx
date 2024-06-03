import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type User = {
  jwt: string | null;
  nickname: string | null;
  salary: string | null;
};

type UserContextProp = {
  user: User;
  login: (jwt: string, nickname: string, salary: string) => void;
  logout: () => void;
  updateSalary: (salary: string) => void;
};

type ProviderProp = {
  children: ReactNode;
};

type Action =
  | { type: "login"; payload: User }
  | { type: "logout"; payload: null }
  | { type: "updateSalary"; payload: string };

const UKEY = "user";
const DefaultUser: User = { jwt: null, nickname: null, salary: null };

function setStorage(user: User | null) {
  localStorage.setItem(UKEY, JSON.stringify(user));
}

function getStorage() {
  const storedUser = localStorage.getItem(UKEY);
  if (storedUser) {
    return JSON.parse(storedUser) as User;
  }
  setStorage(DefaultUser);
  return DefaultUser;
}

const UserContext = createContext<UserContextProp>({
  user: { jwt: null, nickname: null, salary: null },
  login: () => {},
  logout: () => {},
  updateSalary: () => {},
});

const reducer = (user: User, { type, payload }: Action) => {
  let newer: User;
  switch (type) {
    case "login":
      newer = { ...payload };
      break;
    case "logout":
      newer = { jwt: payload, nickname: payload, salary: payload };
      break;
    case "updateSalary":
      newer = { ...user, salary: payload };
      break;
    default:
      return user;
  }
  setStorage(newer);
  return newer;
};

export const UserProvider = ({ children }: ProviderProp) => {
  const [user, dispatch] = useReducer(reducer, getStorage());

  const login = useCallback((jwt: string, nickname: string, salary: string) => {
    dispatch({ type: "login", payload: { jwt, nickname, salary } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout", payload: null });
  }, []);

  const updateSalary = useCallback((salary: string) => {
    dispatch({ type: "updateSalary", payload: salary });
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateSalary }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
