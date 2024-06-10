import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../hooks/fetch";
import { addCommas } from '../../components/utils/formatters';
import { API_BASE_URL } from '../../constants';
import { LoadingPage } from '../LoadingPage';

export type Ratio = {
  saving: number;
  life: number;
  reserve: number;
};

export type SplitAccounts = {
  savingAccountId: number;
  lifeAccountId: number;
  reserveAccountId: number;
};

const calcSplitRatio = (amount: Ratio, userSalary: string): Ratio => {
  const salary = Number(userSalary);
  
  const saving = amount.saving/salary*100;
  const life = amount.life/salary*100;
  const reserve = amount.reserve/salary*100;

  return {
    saving: saving,
    life: life,
    reserve: reserve
  };
};

const calcSplitAmount = (data: AccountAutoDebitAdjustGetResponse[]): Ratio =>{
  let saving = 0;
  let life = 0;
  let reserve = 0;

  data.forEach((account) => {
    if (account.accountType === 'SAVING') {
      saving = Math.abs(account.autoDebitAmount);
    } else if (account.accountType === 'LIFE') {
      life = Math.abs(account.autoDebitAmount);
    } else if (account.accountType === 'SPARE') {
      reserve = Math.abs(account.autoDebitAmount);
    }
  });

  return {
    saving: saving,
    life: life,
    reserve: reserve
  };
};

const setSplitAccounts = (data: AccountAutoDebitAdjustGetResponse[]): SplitAccounts =>{
  let saving = 0;
  let life = 0;
  let reserve = 0;

  data.forEach((account) => {
    if (account.accountType === 'SAVING') {
      saving = account.accountId;
    } else if (account.accountType === 'LIFE') {
      life = account.accountId;
    } else if (account.accountType === 'SPARE') {
      reserve = account.accountId;
    }
  });

  return {
    savingAccountId: saving,
    lifeAccountId: life,
    reserveAccountId: reserve
  };
};

export const SplitMainPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [ratio, setRatio] = useState<Ratio>({ saving: 0, life: 0, reserve: 0 });
  const [amount, setAmount] = useState<Ratio>({ saving: 0, life: 0, reserve: 0 });
  const [accounts, setAccounts] = useState<SplitAccounts>({ savingAccountId: 0, lifeAccountId: 0, reserveAccountId: 0 });

  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<AccountAutoDebitAdjustGetResponse[]>(`${API_BASE_URL}/api/v1/accounts/auto-debit/adjust`, fetchOptions);

  const onAdjust = () => {
    navigate("manual", { state: { splitRatio: ratio, splitAccounts: accounts } });
  };

  useEffect(()=>{
    if (!loading){
      console.log(data);
      // 자동이체 기록이 없거나 3개가 등록되어 있지 않을 때 -> 통장 쪼개기 처음 화면으로
      if(data && data.length>2){
        const salary = user.salary ? user.salary : "0";
        const settedAccounts = setSplitAccounts(data);
        setAccounts(settedAccounts);
        const calculatedAmount = calcSplitAmount(data);
        setAmount(calculatedAmount);
        const calculatedRatio = calcSplitRatio(calculatedAmount, salary);
        setRatio(calculatedRatio);
      }else{
        navigate("start");
      }
    }
  },[data, navigate, user.salary, loading]);



  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-white px-10">
        <img src="\logo.png" className="w-1/5" alt="" />
      </div>
      <div className="mx-5 mt-10 px-5 bg-white pb-20 rounded-2xl">
        <div className="pt-10">
          <h3 className="font-bold text-xl">
            다음 달 <br />
            통장 쪼개기 비율
          </h3>
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
              <div className="col-span-2 text-2xl font-bold">{ratio.saving}%</div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {addCommas(amount.saving)}원
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
              <div className="col-span-2 text-2xl font-bold">{ratio.life}%</div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {addCommas(amount.life)}원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.reserve}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {addCommas(amount.reserve)}원
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-14 gap-4">
          <button
            onClick={() => onAdjust()}
            className="bg-gray-200 w-full rounded-md h-13 font-bold text-gray-600"
          >
            비율 설정하기
          </button>
          <button
            onClick={() => navigate("auto")}
            className="green-button"
          >
            비율 추천받기
          </button>
        </div>
      </div>
    </>
  );
};
