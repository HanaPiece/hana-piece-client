import { useEffect, useState } from "react";
import { TopLine } from "../../../components/ui/TopLine";
import { useUser } from "../../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../../hooks/fetch";
import { API_BASE_URL } from "../../../constants";
import { LoadingPage } from "../../LoadingPage";

type AccountGetResponse = {
  accountId: number;
  accountNumber: string;
  accountTypeCd: string;
};

type Props = {
  count: number;
  number: string;
};

const Account = ({ count, number }: Props) => {
  return (
    <>
      <div className="flex p-4 mb-2 border rounded-lg shadow-sm bg-white items-center">
        <span className="text-sm text-customGreen font-bold">적금 {count}</span>
        <span className="ml-5">{number}</span>
      </div>
    </>
  );
};

export const AccountSavingListPage = () => {
  const { user } = useUser();
  const [accounts, setAccounts] = useState<AccountGetResponse[] | null>(null);

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };
  const { data, error, loading } = useFetch<AccountGetResponse[]>(
    `${API_BASE_URL}/api/v1/accounts/installment-saving`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data]);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <TopLine name={"적금 설정"} />
        <div className="m-10">
          <span className="text-xl font-hana-m">적금 통장</span>
          <div className="mt-4 space-y-4">
            {accounts?.map((account, count) => (
              <Account
                key={account.accountId}
                count={count + 1}
                number={account.accountNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
