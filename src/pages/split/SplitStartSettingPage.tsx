import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../hooks/fetch";

export const SplitStartSettingPage = () => {
  const { user } = useUser();
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<AccountGetResponse[]>('http://43.201.157.250:8080/api/v1/accounts/checking', fetchOptions);

  const [selectedAccounts, setSelectedAccounts] = useState<{
    salary: number | null;
    saving: number | null;
    spending: number | null;
    reserve: number | null;
  }>({
    salary: null,
    saving: null,
    spending: null,
    reserve: null,
  });

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
    if (!data) return [];
    
    const selectedIds = Object.keys(selectedAccounts)
      .filter((key) => key !== excludeType)
      .map((key) => selectedAccounts[key as keyof typeof selectedAccounts])
      .filter((id) => id !== null);

    return data.filter((account) => !selectedIds.includes(account?.accountId));
  };

  const setAccountType = async () => {
    if (Object.values(selectedAccounts).includes(null)){
      setIsCheck(false);
      return false;
    }
    navigate("/split/start/split", { state: { selectedAccounts } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <TopLine name={"통장 쪼개기 시작하기"} />
      <div className="h-1 bg-gray-200">
        <div className="w-1/3 hana-color h-1"></div>
      </div>
      <div className="m-10">
        <span className="text-2xl font-hana-b">통장 설정하기</span>
        <p className="text-gray-400 text-sm">해당 통장으로 사용하실 계좌를 선택해주세요!</p>
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
                  value={selectedAccounts.salary || ""}
                  onChange={(e) => handleSelectChange(e, "salary")}
                >
                  <option value="" disabled>
                    선택하세요
                  </option>
                  {getFilteredAccounts("salary").map((account) => (
                    <option key={account.accountId} value={account.accountId}>
                      {account.accountNumber}
                    </option>
                  ))}
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
                  value={selectedAccounts.saving || ""}
                  onChange={(e) => handleSelectChange(e, "saving")}
                >
                  <option value="" disabled>
                    선택하세요
                  </option>
                  {getFilteredAccounts("saving").map((account) => (
                    <option key={account.accountId} value={account.accountId}>
                      {account.accountNumber}
                    </option>
                  ))}
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
                  value={selectedAccounts.spending || ""}
                  onChange={(e) => handleSelectChange(e, "spending")}
                >
                  <option value="" disabled>
                    선택하세요
                  </option>
                  {getFilteredAccounts("spending").map((account) => (
                    <option key={account.accountId} value={account.accountId}>
                      {account.accountNumber}
                    </option>
                  ))}
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
                  value={selectedAccounts.reserve || ""}
                  onChange={(e) => handleSelectChange(e, "reserve")}
                >
                  <option value="" disabled>
                    선택하세요
                  </option>
                  {getFilteredAccounts("reserve").map((account) => (
                    <option key={account.accountId} value={account.accountId}>
                      {account.accountNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {isCheck?(
          null
        ):(<>
            <div className="text-red-600 text-xs my-4 mb-10">
              모든 계좌를 선택해 주세요
            </div>
          </>
        )}
        <div className="mt-10">
          <button onClick={()=>setAccountType()} className="green-button font-hana-m text-lg">설정하기</button>
        </div>
      </div>
    </div>
  );
};
