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
  amount:number;
  transactionDate:string;
}