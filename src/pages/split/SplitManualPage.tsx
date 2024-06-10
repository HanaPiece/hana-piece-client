import { useLocation, useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useEffect, useState } from "react";
import { Ratio } from "./SplitMainPage";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions } from "../../hooks/fetch";
import { API_BASE_URL } from "../../constants";



export const SplitManualPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const salary = Number(user.salary);
  const [ratio, setRatio] = useState<Ratio>({ saving: 0, life: 0, reserve: 0 });
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const [accountAutoDebitId, setAccountAutoDebitId] = useState<Ratio>({ saving: 0, life: 0, reserve: 0 });

  //통장 쪼개기 메인 페이지에서 받아온 값 - 현재 쪼개기 비율
  const location = useLocation();
  const { splitRatio } = location.state || {};

  useEffect(() => {
    if (splitRatio) {
      setRatio(splitRatio);
    }
  }, [splitRatio]);

  const handleRatioChange = (field: keyof Ratio, value: string) => {
    const newValue = parseFloat(value) || 0;
    setRatio((prevRatio) => ({
      ...prevRatio,
      [field]: newValue,
    }));
  };

  const calcTotalAmount = (): number => {
    const savingAmount = salary * ratio.saving * 0.01;
    const lifeAmount = salary * ratio.life * 0.01;
    const reserveAmount = salary * ratio.reserve * 0.01;

    return savingAmount + lifeAmount + reserveAmount;
  }

  const adjustComplete = () => {
    const sum = ratio.saving + ratio.life + ratio.reserve;
    if (sum !== 100) {
      setIsCorrect(false);
      return false;
    }

    getAccounts();
  };

  // 사용자 계좌 가져오기
  const getAccounts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/auto-debit/adjust`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: AccountAutoDebitAdjustGetResponse[] = await response.json();
      const testData = setAccountId(data);
      setAccountAutoDebitId(testData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  // 타입별 통장 번호 저장
  const setAccountId = (accounts: AccountAutoDebitAdjustGetResponse[]): Ratio => {
    let saving = 0;
    let life = 0;
    let reserve = 0;
    accounts.forEach((account) => {
      if (account.accountType === "SAVING") {
        saving = account.accountAutoDebitId;
      } else if (account.accountType === "LIFE") {
        life = account.accountAutoDebitId;
      } else if (account.accountType === "SPARE") {
        reserve = account.accountAutoDebitId;
      }
    });

    return {
      saving: saving,
      life: life,
      reserve: reserve
    };
  };

  useEffect(() => {
    if (accountAutoDebitId.saving !== 0 && accountAutoDebitId.life !== 0 && accountAutoDebitId.reserve !== 0) {
      setAutoDebit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountAutoDebitId]);

  // 통장 쪼개기 (자동이체 설정)
  const setAutoDebit = async () => {
    const postOptions: FetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        "savingAccountAutoDebitId": accountAutoDebitId.saving,
        "savingAutoDebitAmount": calcAmount(ratio.saving, salary),
        "lifeAccountAutoDebitId": accountAutoDebitId.life,
        "lifeAutoDebitAmount": calcAmount(ratio.life, salary),
        "spareAccountAutoDebitId": accountAutoDebitId.reserve,
        "spareAutoDebitAmount": calcAmount(ratio.reserve, salary)
      }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/auto-debit/adjust`, postOptions);
      if (!response.ok) {
        console.error('Failed to set account types');
      } else {
        navigate("/split");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const calcAmount = (ratio: number, salary: number): number => {
    return 0.01 * ratio * salary;
  };



  return (
    <>
      <TopLine name={"통장쪼개기 수동 설정"} />
      <div className="m-8">
        <div>
          <h3 className="font-bold text-xl">통장 쪼개기</h3>
          <p className="text-xs mt-3 font-semibold">
            월 소득 <span className="text-lg">{salary.toLocaleString()}</span>원
          </p>
        </div>

        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💰 저축 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1  border rounded-lg py-2 px-4">
              <div className="font-semibold text-gray-400 text-sm  align-bottom mb-1">
                비율
              </div>
              <div className="col-span-2 text-xl font-bold">
                <input
                  type="number"
                  className="border rounded w-14 h-10 pl-2"
                  value={ratio.saving}
                  min="0"
                  max="100"
                  onChange={(e) => handleRatioChange("saving", e.target.value)}
                />{" "}
                %
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right mb-1">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                <span className="w-24 text-center border-black focus:outline-none">
                  {(salary*ratio.saving*0.01).toLocaleString()}
                </span>
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💳 소비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1  border rounded-lg py-2 px-4">
              <div className="font-semibold text-gray-400 text-sm  align-bottom mb-1">
                비율
              </div>
              <div className="col-span-2 text-xl font-bold">
                <input
                  type="number"
                  className="border rounded w-14 h-10 pl-2"
                  value={ratio.life}
                  min="0"
                  max="100"
                  onChange={(e) => handleRatioChange("life", e.target.value)}
                />{" "}
                %
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right mb-1">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                <span className="w-24 text-center border-black focus:outline-none">
                  {(salary*ratio.life*0.01).toLocaleString()}
                </span>
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡 예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1  border rounded-lg py-2 px-4">
              <div className="font-semibold text-gray-400 text-sm  align-bottom mb-1">
                비율
              </div>
              <div className="col-span-2 text-xl font-bold">
                <input
                  type="number"
                  className="border rounded w-14 h-10 pl-2"
                  value={ratio.reserve}
                  min="0"
                  max="100"
                  onChange={(e) => handleRatioChange("reserve", e.target.value)}
                />{" "}
                %
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right mb-1">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                <span className="w-24 text-center border-black focus:outline-none">
                  {(salary*ratio.reserve*0.01).toLocaleString()}
                </span>
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 text-sm">
          <div>
            합 <span>{ratio.saving+ratio.life+ratio.reserve}</span>%
          </div>
          <div>
            총 <span>{calcTotalAmount().toLocaleString()}</span>원
          </div>
        </div>
        {isCorrect?(null):(
          <div className="text-red-600 text-xs my-4">
            총합을 100%로 맞춰주세요
          </div>
        )}
        <div className="mt-10">
          <button className="green-button" onClick={()=>adjustComplete()}>
            변경하기
          </button>
        </div>
      </div>
    </>
  );
};
