import { SlCreditCard } from "react-icons/sl";
import { UserGoalTransactionResponse } from "./homeType";
import {
  addCommas,
  getMonthFromDateString,
} from "../../components/utils/formatters";
import { FetchOptions, useFetch } from "../../hooks/fetch";
import { useUser } from "../../contexts/UserContext";

export const GoalProductTransactionDetail = ({
  accountId,
}: {
  accountId: number;
}) => {
  const { user } = useUser();

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<UserGoalTransactionResponse[]>(
    `http://43.201.157.250:8080/api/v1/accounts/${accountId}/transactions/goal-installment-saving`,
    fetchOptions
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <div className="flex justify-between my-4">
          <h3 className="font-extrabold text-xl">납부 내역</h3>
          <button className="border-none text-blue-700 text-sm">최신순</button>
        </div>
        {data?.map((transaction, index) => (
          <div className="grid grid-cols-6 gap-2 my-5" key={index}>
            <div className="bg-gray-300 w-10 rounded-full grid place-items-center">
              <SlCreditCard className="nav-icon" />
            </div>
            <div className="col-span-2">
              <p className="font-semibold">
                {getMonthFromDateString(transaction.transactionDate)}월 납부금
              </p>
              <p className="text-xs text-gray-400">
                {transaction.transactionDate}
              </p>
            </div>
            <div className="col-span-3 text-right font-semibold">
              {transaction.amount < 0 ? "" : "+"}
              {addCommas(transaction.amount)} 원
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
