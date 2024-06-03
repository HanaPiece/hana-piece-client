// import { ReactNode, createContext, useContext } from "react";
// import { Product } from "../types/ProductType";

// type Goal = {
//   id: number;
//   name: string;
// };

// type GoalProducts = {
//   goal: Goal;
//   products: Product[];
// };

// type GoalsProducts = {
//   goalsProducts: GoalProducts[] | null;
// };

// type GoalsProductsContextProp = {
//   goalsProducts: GoalsProducts | null;
//   set: () => void;
//   updateGoal: () => void;
//   updateProduct: () => void;
//   //   deleteGoal: () => void;
// };

// type ProviderProp = {
//   children: ReactNode;
// };

// type Action =
//   | { type: "set"; payload: GoalsProducts }
//   | { type: "addGoal"; payload: Goal }
//   | { type: "updateProduct"; payload: Product[] };

// const GPKEY = "goalsProducts";
// const DefaultGoalsProuducts: GoalsProducts = {
//   goalsProducts: null,
// };

// function setStorage(goalsProducts: GoalsProducts | null) {
//   localStorage.setItem(GPKEY, JSON.stringify(goalsProducts));
// }

// function getStorage() {
//   const storedGoalsProducts = localStorage.getItem(GPKEY);
//   if (storedGoalsProducts) {
//     return JSON.parse(storedGoalsProducts) as GoalsProducts;
//   }
//   setStorage(DefaultGoalsProuducts);
//   return DefaultGoalsProuducts;
// }

// const GoalsProductsContext = createContext<GoalsProductsContextProp>({
//   goalsProducts: null,
//   set: () => {},
//   updateGoal: () => {},
//   updateProduct: () => {},
// });

// const reducer = (goalsProducts: GoalsProducts, { type, payload }: Action) => {
//   let newer: GoalsProducts;
//   switch (type) {
//     case "set":
//       newer = { ...payload };
//       break;
//     case "addGoal":
//       newer = {
//         ...goalsProducts,
//         goalsProducts:
//           goalsProducts.goalsProducts?.map((gp) =>
//             gp.goal.id === payload.id ? { ...gp, goal: payload } : gp
//           ) || null,
//       };
//       break;
//     case "updateProduct":
//       newer = { ...goalsProducts, ...payload };
//       break;
//     default:
//       return goalsProducts;
//   }
//   setStorage(newer);
//   return newer;
// };

// export const GoalsProductsProvider = ({ children }: ProviderProp) => {
//   return (
//     <GoalsProductsContext.Provider
//       value={{ goalsProducts, set, updateGoal, updateProduct, deleteGoal }}
//     >
//       {children}
//     </GoalsProductsContext.Provider>
//   );
// };

// export const useGoalsProducts = () => useContext(GoalsProductsContext);
