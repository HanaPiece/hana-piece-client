import { useEffect, useState } from "react";
import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";
import { useUser } from "../../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../../hooks/fetch";
import { API_BASE_URL } from "../../../constants";

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
        {state !== "CHECKING" && (
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
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };
  const { data, error, loading } = useFetch<AccountGetResponse[]>(
    `${API_BASE_URL}/api/v1/accounts/checking`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
