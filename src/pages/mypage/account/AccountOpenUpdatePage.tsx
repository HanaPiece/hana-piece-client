import { useEffect, useState } from "react";
import { TopLine } from "../../../components/ui/TopLine";
import { useUser } from "../../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../../hooks/fetch";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../constants";

type AccountGetResponse = {
  accountId: number;
  accountNumber: string;
  accountTypeCd: string;
};

export const AccountOpenUpdatePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [accounts, setAccounts] = useState<AccountGetResponse[] | null>(null);
  const [selectedAccounts, setSelectedAccounts] = useState<{
    SALARY: number | null;
    SAVING: number | null;
    LIFE: number | null;
    SPARE: number | null;
  }>({
    SALARY: null,
    SAVING: null,
    LIFE: null,
    SPARE: null,
  });

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
      const salaryAccount = data.find(
        (account) => account.accountTypeCd === "SALARY"
      );
      const savingAccount = data.find(
        (account) => account.accountTypeCd === "SAVING"
      );
      const lifeAccount = data.find(
        (account) => account.accountTypeCd === "LIFE"
      );
      const spareAccount = data.find(
        (account) => account.accountTypeCd === "SPARE"
      );

      setSelectedAccounts({
        SALARY: salaryAccount ? salaryAccount.accountId : null,
        SAVING: savingAccount ? savingAccount.accountId : null,
        LIFE: lifeAccount ? lifeAccount.accountId : null,
        SPARE: spareAccount ? spareAccount.accountId : null,
      });
    }
  }, [data]);

  const allSelected = Object.values(selectedAccounts).every(
    (value) => value !== null
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    const value = parseInt(event.target.value, 10);
    setSelectedAccounts({
      ...selectedAccounts,
      [type]: value,
    });
  };

  const getFilteredAccounts = (excludeType: string) => {
    const selectedIds = Object.keys(selectedAccounts)
      .filter((key) => key !== excludeType)
      .map((key) => selectedAccounts[key as keyof typeof selectedAccounts])
      .filter((id) => id !== null);

    const filteredAccounts = accounts?.filter(
      (account) => !selectedIds.includes(account.accountId)
    );

    return filteredAccounts || [];
  };

  const renderSelectOptions = (type: keyof typeof selectedAccounts) => {
    const options = getFilteredAccounts(type).map((account) => (
      <option key={account.accountId} value={account.accountId}>
        {account.accountNumber}
      </option>
    ));

    if (!selectedAccounts[type]) {
      options.unshift(
        <option key="placeholder" value="" disabled>
          선택하세요
        </option>
      );
    }

    return options;
  };

  const buttonClicked = () => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `http://43.201.157.250:8080/api/v1/accounts/account-type-reg`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
              body: JSON.stringify({
                salaryAccountId: selectedAccounts.SALARY,
                savingAccountId: selectedAccounts.SAVING,
                lifeAccountId: selectedAccounts.LIFE,
                spareAccountId: selectedAccounts.SPARE,
              }),
            }
          );
          if (response.ok) {
            navigate("/mypage");
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  };

  return (
    <>
      <div>
        <TopLine name={"입출금 통장 설정"} />
        <div className="m-10">
          <span className="text-xl font-hana-m">입출금 통장</span>
          <div className="mt-8">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💸 월급 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">
                  계좌
                </div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.SALARY || ""}
                    onChange={(e) => handleSelectChange(e, "SALARY")}
                  >
                    {renderSelectOptions("SALARY")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💰 저축 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">
                  계좌
                </div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.SAVING || ""}
                    onChange={(e) => handleSelectChange(e, "SAVING")}
                  >
                    {renderSelectOptions("SAVING")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💳 소비 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">
                  계좌
                </div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.LIFE || ""}
                    onChange={(e) => handleSelectChange(e, "LIFE")}
                  >
                    {renderSelectOptions("LIFE")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="font-bold text-gray-400 text-md">💡 예비 통장</h3>
              <div className="grid grid-cols-7 items-end mt-1 border rounded-lg py-2 px-4">
                <div className="font-semibold text-gray-400 text-sm mb-1">
                  계좌
                </div>
                <div className="col-span-6 text-md font-bold">
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedAccounts.SPARE || ""}
                    onChange={(e) => handleSelectChange(e, "SPARE")}
                  >
                    {renderSelectOptions("SPARE")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button onClick={() => buttonClicked()} disabled={!allSelected} className="green-button">
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
