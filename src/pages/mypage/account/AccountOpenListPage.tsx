import { useEffect, useState } from "react";
import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";
import { useUser } from "../../../contexts/UserContext";

type AccountGetResponse = {
  accountId: number;
  accountNumber: string;
  accountTypeCd: string;
};

type Props = {
  count: number;
  number: string;
  state: string;
};

const Account = ({ count, number, state }: Props) => {
  return (
    <>
      <div className="flex p-4 mb-2 border rounded-lg shadow-sm bg-white items-center">
        <span className="text-sm text-customGreen font-bold">계좌 {count}</span>
        <span className="ml-5">{number}</span>
        {state !== "null" && (
          <span className="ml-auto px-2 py-1 text-sm text-white bg-lime-500 rounded">
            {state}
          </span>
        )}
      </div>
    </>
  );
};

export const AccountOpenListPage = () => {
  const { user } = useUser();
  const [accounts, setAccounts] = useState<AccountGetResponse[] | null>(null);
  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `http://172.16.20.217:8080/api/v1/accounts/checking`,
            {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            setAccounts(json);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. ${err}`);
          }
        }
      })();
    }
  }, [user.jwt]);
  return (
    <>
      <div>
        <TopLine name={"입출금 통장 설정"} />
        <div>
          <div className="m-10">
            <span className="text-xl font-hana-m">입출금 통장</span>
            <div className="mt-4 space-y-4">
              {accounts?.map((account, count) => (
                <Account
                  key={account.accountId}
                  count={count + 1}
                  number={account.accountNumber}
                  state={account.accountTypeCd}
                />
              ))}
            </div>
            <div className="mt-10">
              <GreenButton path={"update"} name={"수정하기"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
