import { SlCreditCard } from "react-icons/sl";
import { UserGoalTransactionResponse } from "./homeType";
import { useEffect, useState } from "react";
import { addCommas, getMonthFromDateString } from "../../components/utils/formatters";

export const GoalProductTransactionDetail = ({accountId}:{accountId:number}) => {
  const [productTransactions, setProductTransactions] = useState<UserGoalTransactionResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchGoalProductTransaction = async (accountId: number): Promise<UserGoalTransactionResponse[]> => {
    const response = await fetch(`/api/v1/accounts/${accountId}/transactions/goal-installment-saving`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: UserGoalTransactionResponse[] = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGoalProductTransaction(accountId);
        setProductTransactions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [accountId]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <div className="flex justify-between my-4">
          <h3 className="font-extrabold text-xl">납부 내역</h3>
          <button className="border-none text-blue-700 text-sm">최신순</button>
        </div>
        {productTransactions.map((transaction, index) => (
          <div className="grid grid-cols-6 gap-2" key={index}>
            <div className="bg-gray-300 w-10 rounded-full grid place-items-center">
              <SlCreditCard className="nav-icon" />
            </div>
            <div className="col-span-3">
              <p className="font-semibold">{getMonthFromDateString(transaction.transactionDate)}월 납부금</p>
              <p className="text-xs text-gray-400">{transaction.transactionDate}</p>
            </div>
            <div className="col-span-2 text-right font-semibold">{addCommas(transaction.amount)}{transaction.amount<0?"":"+"}{addCommas(transaction.amount)}원</div>
          </div>
        ))}
      </div>
    </>
  );
};
