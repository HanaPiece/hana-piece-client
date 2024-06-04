type Product = {
  id: number;
  name: string;
  rate: number;
  info: string;
  term_year: number;
  cautions: string;
  deposit_protection: string;
  contract_terms: string;
};

// enum GOAL {
//   HOUSE = "house",
//   CAR = "car",
//   WISH = "wish",
// }

type GoalProducts = {
  id: number;
  goal: string;
  products: Product[];
};

export type { Product, GoalProducts };
