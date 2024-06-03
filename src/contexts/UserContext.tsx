import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

export type User = {
  jwt: string | null;
  name: string | null;
  salary: string | null;
};

type UserContextProp = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
  updateSalary: (salary: string) => void;
};

type ProviderProp = {
  children: ReactNode;
};

type Action =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "updateSalary"; payload: string };

const UKEY = "user";
const DefaultUser: User = { jwt: null, name: null, salary: null };

function setStorage(user: User) {
  console.log("Setting storage:", user);
  localStorage.setItem(UKEY, JSON.stringify(user));
}

function getStorage(): User {
  const storedUser = localStorage.getItem(UKEY);
  if (storedUser) {
    console.log("Getting storage:", JSON.parse(storedUser));
    return JSON.parse(storedUser) as User;
  }
  return DefaultUser;
}

const UserContext = createContext<UserContextProp>({
  user: DefaultUser,
  login: () => {},
  logout: () => {},
  updateSalary: () => {},
});

const reducer = (user: User, action: Action) => {
  let newer: User;
  switch (action.type) {
    case "login":
      newer = { ...action.payload };
      setStorage(newer);

      break;
    case "logout":
      newer = DefaultUser;
      setStorage(newer);
      break;
    case "updateSalary":
      newer = { ...user, salary: action.payload };
      setStorage(newer);
      break;
    default:
      return user;
  }
  return newer;
};

export const UserProvider = ({ children }: ProviderProp) => {
  const [user, dispatch] = useReducer(reducer, getStorage());

  const login = useCallback((user: User) => {
    console.log("Dispatch login:", user);
    dispatch({ type: "login", payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout" });
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
