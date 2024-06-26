export interface UserGoalAccountGetResponse {
  accountId: number;
  productNm: string;
  accountNumber: string;
  openingDate: string;
  principal: number;
  targetAmount: number;
  interestAmount: number;
}

export interface UserGoalTransactionResponse {
  amount: number;
  transactionDate: string;
}

export interface enrolled {
  enrolledProductId: number;
  enrolledProductName: string;
}

export interface UserGoalGetResponse {
  userGoalId: number;
  goalAlias: string;
  goalTypeCd: "CAR" | "HOUSE" | "WISH";
  goalSpecificId: number;
  goalBeginDate: string;
  duration: number;
  amount: number;
  enrolledProducts: enrolled[];
  savingMoney: number;
}
