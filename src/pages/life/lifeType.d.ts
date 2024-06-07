interface AccountGetResponse {
  accountId: number;
  accountNumber: string;
  accountTypeCd: string;
}

interface MonthlyTransaction{
  autoDebitTotalAmount:number;
  monthlyTotalSpending:number;
  amountByType:AmountByType;
  amountByDay:AmountByDay;
  dailyTransactionList:DailyTransaction[];
}

interface DailyTransaction{
  transactionDay:number;
  amount:number;
  accountTransactionType:string;
  targetNm:string;
}

type AmountByType = {
  [key : string]: number;
}

interface AmountByDay {
  [key: string]: number;
}