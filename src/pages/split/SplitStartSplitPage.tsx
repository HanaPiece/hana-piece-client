import { useLocation, useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { Ratio } from "./SplitMainPage";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions } from "../../hooks/fetch";
import { API_BASE_URL } from "../../constants";

export const SplitStartSplitPage = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const salary = Number(user.salary);

  //통장 설정 페이지에서 받아온 값
  const location = useLocation();
  const { selectedAccounts } = location.state || {};

  const [ratio, setRatio] = useState<Ratio>({
    saving: 50,
    life: 23,
    reserve: 27,
  });
  
  // 추천 받은 비율 저장 -> 추천 비율 받아오는 fetch 후 useEffect로 setRecommendRatio 설정 필요!!!!!!!!!!!!!!!!!!!!!!!!!
  const recommendRatio:Ratio ={
    saving: 50,
    life: 23,
    reserve: 27,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRatio((prevRatio) => ({
      ...prevRatio,
      [name]: Number(value),
    }));
  };

  const calcAmount = (ratio:number, salary:number) : number => {
    return 0.01*ratio*salary;
  };

  const setCancle = () => {
    setRatio(recommendRatio);
    setIsEditing(false);
  };

  const adjustComplete = () => {
    const sum = ratio.saving + ratio.life + ratio.reserve;
    if(sum!=100){
      setIsCorrect(false);
      return false;
    }
    setAccountType();
    setAutoDebit();
    navigate("/split/start/complete",{ state: { splitRatio: ratio } });
  };

  // 통장 쪼개기 (자동이체 설정)
  const setAutoDebit = async () => {
    console.log(selectedAccounts.saving, calcAmount(ratio.saving,salary))
    const postOptions: FetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        savingAccountAutoDebitId: selectedAccounts.saving,
        savingAutoDebitAmount:calcAmount(ratio.saving,salary),
        lifeAccountAutoDebitId: selectedAccounts.spending,
        lifeAutoDebitAmount:calcAmount(ratio.life,salary),
        spareAccountAutoDebitId: selectedAccounts.reserve,
        spareAutoDebitAmount:calcAmount(ratio.reserve,salary)
      }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/auto-debit/adjust`, postOptions);
      if (!response.ok) {
        console.error('Failed to set account types');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 계좌 타입 요청
  const setAccountType = async () => {
    const postOptions: FetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        salaryAccountId: selectedAccounts.salary,
        savingAccountId: selectedAccounts.saving,
        lifeAccountId: selectedAccounts.spending,
        spareAccountId: selectedAccounts.reserve,
      }),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/account-type-reg`, postOptions);
      if (!response.ok) {
        console.error('Failed to set account types');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div className="container">
        <TopLine name={"통장 쪼개기 시작하기"} />
        <div className="h-1 bg-gray-200">
            <div className="w-2/3 hana-color h-1"></div>
        </div>
        <div className="m-10">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">
              <span className="text-green-600 mr-2">하나</span>님을 위한
              <br />
              통장 쪼개기 추천 비율
            </h3>
            <div>
              <img
                src="\src\assets\byul5.png"
                className="w-20"
                alt="하나은행"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="w-full flex h-5 rounded-full bg-gray-300">
            <div
              style={{ width: `${ratio.saving}%` }}
              className="h-5 rounded-s-full bg-lime-200 text-center text-sm"
            >
              {ratio.saving}%
            </div>
            <div
              style={{ width: `${ratio.life}%` }}
              className="h-5 bg-yellow-300 text-center text-sm"
            >
              {ratio.life}%
            </div>
            <div
              style={{ width: `${ratio.reserve}%` }}
              className="h-5 rounded-e-full bg-rose-300 text-center text-sm"
            >
              {ratio.reserve}%
            </div>
          </div>
          <div className="flex mt-5 gap-x-3 justify-start items-center">
            <div className="w-3 h-3 bg-lime-200 rounded-full"></div>
            <div className="text-xs">저축</div>
            <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
            <div className="text-xs">생활비</div>
            <div className="w-3 h-3 bg-rose-300 rounded-full"></div>
            <div className="text-xs">예비비</div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💰저축 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
              {!isEditing?(
                  `${ratio.saving}%`
              ):(
                <>
                    <input
                      type="number"
                      name="saving"
                      value={ratio.saving}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="p-2 border rounded w-2/3 h-10" /> %
                </>
              )}
              </div>
              
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {calcAmount(ratio.saving,salary).toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💳소비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
              {!isEditing?(
                  `${ratio.life}%`
              ):(
                <>
                    <input
                      type="number"
                      name="life"
                      value={ratio.life}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="p-2 border rounded w-2/3 h-10" /> %
                </>
              )}  
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
              {calcAmount(ratio.life,salary).toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
              {!isEditing?(
                  `${ratio.reserve}%`
              ):(
                <>
                    <input
                      type="number"
                      name="reserve"
                      value={ratio.reserve}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="p-2 border rounded w-2/3 h-10" /> %
                </>
              )}
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {calcAmount(ratio.reserve,salary).toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-gray-200 border-0 w-16 mx-auto mt-8 mb-5 h-px" />
        {isCorrect?(
          null
        ):(<>
            <div className="text-red-600 text-xs my-4 mb-10">
              총합을 100%로 맞춰주세요
            </div>
          </>
        )}
        <div className="flex justify-between gap-x-2 font-bold">
          {!isEditing?(
            <button className="py-2 bg-slate-200 rounded-md text-gray-600 w-1/2" onClick={()=>setIsEditing(true)}>조정하기</button>
          ):(
            <button className="py-2 bg-slate-200 rounded-md text-gray-600 w-1/2" onClick={()=>setCancle()}>취소하기</button>
          )}
          
          <button className="py-2 bg-customGreen rounded-md text-white w-1/2" onClick={()=>adjustComplete()}>완료하기</button>
        </div>
        </div>
      </div>
    </>
  );
};