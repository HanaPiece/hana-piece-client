import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../hooks/fetch";
import { UserGoalAccountGetResponse } from "./homeType";
import { useEffect, useState } from "react";

export const GoalProductDetail = ({ accountId }: { accountId: number }) => {
  const { user } = useUser();
  const { goalId } = useParams<{ goalId: string }>();

  const [goalAccount, setGoalAccount] =
    useState<UserGoalAccountGetResponse | null>(null);

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<UserGoalAccountGetResponse[]>(
    `${API_BASE_URL}/api/v1/accounts/user-goal/${goalId}`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      const filteredAccount = data.find(
        (account) => account.accountId === accountId
      );
      setGoalAccount(filteredAccount || null);
    }
  }, [data, accountId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!goalAccount) return <div>해당 계좌를 찾을 수 없습니다.</div>;

  return (
    <>
      <div className="rounded-2xl hana-color text-white p-4 my-7 shadow-md">
        <p className="font-bold text-lg mb-2">
          {goalAccount.productNm || "상품명 없음"}
        </p>
        <div className="flex justify-between text-xs mb-2">
          <p>계좌번호: {goalAccount.accountNumber || "정보 없음"}</p>
          <p className="text-right">
            개설일 <br /> {goalAccount.openingDate || "정보 없음"}
          </p>
        </div>
        <p className="text-sm">
          원금:{" "}
          <span className="font-extrabold">
            {goalAccount.principal
              ? `${goalAccount.principal.toLocaleString()} 원`
              : "-"}
          </span>
        </p>
        <p className="text-sm">
          목표 금액:{" "}
          <span className="font-extrabold">
            {goalAccount.targetAmount
              ? `${goalAccount.targetAmount.toLocaleString()} 원`
              : "-"}
          </span>
        </p>
        <p className="text-sm">
          쌓인 이자:{" "}
          <span className="font-extrabold">
            {goalAccount.interestAmount
              ? `${goalAccount.interestAmount.toLocaleString()} 원`
              : "-"}
          </span>
        </p>
        <div className="flex justify-between">
          <div className="mt-10 text-xs">
            만기일 <br /> 2030.3.12
          </div>
          <img
            src="/src/assets/byul1.png"
            alt="하나주택청약종합저축"
            className="w-2/5"
          />
        </div>
      </div>
    </>
  );
};
