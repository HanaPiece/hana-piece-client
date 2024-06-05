interface AccountGetResponse {
  accountId: number;
  accountNumber: string;
  accountTypeCd: string;
}

interface MonthlyTransaction{
  sumAutoDebitAmount:number;
  monthlyNegativeSum:number;
  amountByType:AmountByType;
  amountByDay:AmountByDay;
  dailyTransactionList:DailyTransaction[];
}

interface DailyTransaction{
  transactionDay:number;
  amount:number;
  accountTransactionType:string;
}

interface AmountByType {
  [key: string]: number;
}

interface AmountByDay {
  [key: string]: number;
}