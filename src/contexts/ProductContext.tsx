import { ReactNode, createContext, useContext, useReducer } from "react";
import { recommendedProducts } from "../pages/product/ProductListPage";

export type Goal = {
  userGoalId: number;
  goalAlias: string;
  goalTypeCd: string;
  goalSpecificId: number;
  goalBeginDate: string;
  duration: number;
  amount: number;
};

type GoalProducts = {
  goal: Goal;
  products: recommendedProducts[];
};

type GoalsProducts = {
  goalsProducts: GoalProducts[] | null;
};

type GoalsProductsContextProp = {
  goalsProducts: GoalsProducts | null;
  setGoal: (goals: Goal[]) => void;
  createGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  setProduct: (goalId: number, products: recommendedProducts[]) => void;
  out: () => void;
};

type ProviderProp = {
  children: ReactNode;
};

type Action =
  | { type: "setGoal"; payload: Goal[] } //goal 채우기
  | { type: "createGoal"; payload: Goal } //goal 추가하기
  | { type: "updateGoal"; payload: Goal } //goal 그대로, product 비우기
  | {
      type: "setProduct";
      payload: { goalId: number; products: recommendedProducts[] };
    } //해당 goal에 대해서 product 없을 때, product 채우기
  | { type: "out"; payload: null }; //둘 다 비우기

const GPKEY = "goalsProducts";
const DefaultGoalsProuducts: GoalsProducts = {
  goalsProducts: null,
};

function setStorage(goalsProducts: GoalsProducts | null) {
  localStorage.setItem(GPKEY, JSON.stringify(goalsProducts));
}

function getStorage() {
  const storedGoalsProducts = localStorage.getItem(GPKEY);
  if (storedGoalsProducts) {
    return JSON.parse(storedGoalsProducts) as GoalsProducts;
  }
  setStorage(DefaultGoalsProuducts);
  return DefaultGoalsProuducts;
}

const GoalsProductsContext = createContext<GoalsProductsContextProp>({
  goalsProducts: null,
  setGoal: () => {},
  createGoal: () => {},
  updateGoal: () => {},
  setProduct: () => {},
  out: () => {},
});

const reducer = (goalsProducts: GoalsProducts, { type, payload }: Action) => {
  let newer: GoalsProducts = { ...goalsProducts };
  switch (type) {
    case "setGoal":
      newer = {
        goalsProducts: payload.map((goal) => ({ goal, products: [] })),
      };
      break;
    case "createGoal":
      newer = {
        goalsProducts: newer.goalsProducts
          ? [...newer.goalsProducts, { goal: payload, products: [] }]
          : [{ goal: payload, products: [] }],
      };
      break;
    case "updateGoal":
      newer = {
        goalsProducts:
          newer.goalsProducts?.map((gp) =>
            gp.goal.userGoalId === payload.userGoalId
              ? { goal: payload, products: [] }
              : gp
          ) || null,
      };
      break;
    case "setProduct":
      newer = {
        goalsProducts:
          newer.goalsProducts?.map((gp) =>
            gp.goal.userGoalId === payload.goalId
              ? { ...gp, products: payload.products }
              : gp
          ) || null,
      };
      break;
    case "out":
      newer = DefaultGoalsProuducts;
      break;
    default:
      return goalsProducts;
  }
  setStorage(newer);
  return newer;
};

export const GoalsProductsProvider = ({ children }: ProviderProp) => {
  const [goalsProducts, dispatch] = useReducer(reducer, getStorage());

  const setGoal = (goals: Goal[]) => {
    dispatch({ type: "setGoal", payload: goals });
  };

  const createGoal = (goal: Goal) => {
    dispatch({ type: "createGoal", payload: goal });
  };

  const updateGoal = (goal: Goal) => {
    dispatch({ type: "updateGoal", payload: goal });
  };

  const setProduct = (goalId: number, products: recommendedProducts[]) => {
    dispatch({ type: "setProduct", payload: { goalId, products } });
  };

  const out = () => {
    dispatch({ type: "out", payload: null });
  };
  return (
    <GoalsProductsContext.Provider
      value={{
        goalsProducts,
        setGoal,
        createGoal,
        updateGoal,
        setProduct,
        out,
      }}
    >
      {children}
    </GoalsProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGoalsProducts = () => useContext(GoalsProductsContext);
