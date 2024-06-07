import { useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import ConsumptionChart from './ConsumptionChart';
import { addCommas, dateToYYYYMM, getDateParseForLifePage } from '../../components/utils/formatters';
import { useUser } from '../../contexts/UserContext';
import { API_BASE_URL } from '../../constants';


const TodayDate = (): Date => {
  return new Date();
};

const AdjustMonth = (date: Date, adjustValue: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + adjustValue);
  return newDate;
};

const icon = (transactionType: string): string => {
  switch (transactionType) {
    case "SHOPPING":
      return "🛍️";
    case "FOOD":
      return "🍔";
    case "TRANSPORT":
      return "🚌";
    case "LEISURE":
      return "🎮";
    default:
      return "💸"; 
  }
};

const transactionTypeKor = (transactionType: string): string => {
  switch (transactionType) {
    case "SHOPPING":
      return "쇼핑";
    case "FOOD":
      return "음식";
    case "TRANSPORT":
      return "교통";
    case "LEISURE":
      return "문화";
    default:
      return "소비";
  }
};

const groupByDate = (
  data: DailyTransaction[]
): { [key: string]: DailyTransaction[] } => {
  return data.reduce((acc, curr) => {
    const date = curr.transactionDay;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {} as { [key: string]: DailyTransaction[] });
};

const calculateTotalAmount = (data: DailyTransaction[]): number => {
  return data.reduce((acc, curr) => acc + curr.amount, 0);
};

const getLifeAccount = async (jwt: string|null, setAccountId: (id: number) => void) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/accounts/checking`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: AccountGetResponse[] = await response.json();
    const lifeAccount = data.find(account => account.accountTypeCd === 'LIFE');
    if (lifeAccount) {
      setAccountId(lifeAccount.accountId);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export const LifePage = () => {
  const [date, setDate] = useState<Date>(TodayDate());
  const [accountId, setAccountId] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<MonthlyTransaction>();
  const [amountByType, setAmountByType] = useState<AmountByType>({});
  const [dailyTransaction, setDailyTransaction] = useState<DailyTransaction[]>([]);
  const { user } = useUser();

  const getAccountTransaction = async (yearMonth:string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/accounts/${accountId}/transactions?transactionYearMonth=${yearMonth}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: MonthlyTransaction = await response.json();
      setMonthlyData(data);
      setAmountByType(data.amountByType);
      setDailyTransaction(data.dailyTransactionList);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };



  useEffect(() => {
    if (accountId === 0) {
      getLifeAccount(user.jwt, setAccountId);
    }else{
      getAccountTransaction(dateToYYYYMM(date));
    }
  }, [accountId, date]);

  const handlePreviousMonth = () => {
    setDate(AdjustMonth(date, -1));
  };

  const handleNextMonth = () => {
    setDate(AdjustMonth(date, 1));
  };

  const groupedData = groupByDate(dailyTransaction);
  const sortedDates = Object.keys(groupedData).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="bg-white">
      <div className="px-7 pt-7 ">
        <h1 className="text-2xl font-bold mb-4 ml-2 font-hana-b">생활</h1>
        <div className="flex justify-start items-center gap-4">
          <div onClick={handlePreviousMonth} className="cursor-pointer">
            <SlArrowLeft />
          </div>
          <span className="text-lg">{date.getMonth() + 1}월</span>
          <div onClick={handleNextMonth} className="cursor-pointer">
            <SlArrowRight />
          </div>
        </div>
        <h3 className="text-gray-500 mt-5 font-hana-m">지출 통계</h3>
        <div className="rounded-2xl bg-stone-100 p-3 px-5">
          <div className="grid grid-cols-7 items-center">
            <div className="col-span-4">
              {dailyTransaction.length!=0?(
                <ConsumptionChart amountByType={amountByType} />
              ):(
                <img src="byul2.png" alt="transaction_is_none" className='m-auto w-2/3' />
              )}
              
            </div>
            <div className="col-span-3 text-center ml-3">
              <p className="text-sm font-hana-m">현재 사용액</p>
              <p className="text-xl font-semibold mt-1">
              {monthlyData?.monthlyTotalSpending ? (
                  Math.abs(monthlyData?.monthlyTotalSpending).toLocaleString()
                ):0}원
              </p>
              <p className="text-gray-400 mt-1 text-md">
                / {monthlyData?.autoDebitTotalAmount ? (
                  Math.abs(monthlyData?.autoDebitTotalAmount).toLocaleString()
                ):0}원
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-7 py-3 bg-white">
        <div>
          <h3 className="text-gray-500 mt-5 mb-3 font-hana-m">지출 내역</h3>
          {dailyTransaction.length!=0?(
            <>
            {sortedDates.map((day) => (
              <div key={day} className="mb-10">
                <p className='font-semibold mb-1 bg-indigo-50 p-1'>{getDateParseForLifePage(date, day)}</p>
                <div className="inline-block px-2 text-sm font-semibold text-red-500 bg-gray-200 rounded-full">
                  {addCommas(calculateTotalAmount(groupedData[day]))}원
                </div>
                {groupedData[day].map((item, index) => (
                  <div key={index} className="mt-5 grid grid-cols-7 items-center">
                    <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
                        <p className='text-lg mb-2'>{icon(item.accountTransactionType)}</p>
                      </div>
                    <div className="col-span-4 ml-3">
                      <p className="font-bold">{item.targetNm}</p>
                      <p className="text-sm">{transactionTypeKor(item.accountTransactionType)}</p>
                    </div>
                    <div className="col-span-2 font-bold text-right mr-4">
                      {addCommas(item.amount)}원
                    </div>
                  </div>
                ))}
              </div>
            ))}
            </>
          ):(
            <>
              <div className='text-red-400 text-center font-hana-m my-10'>
                이번 달 소비내역이 없습니다.
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default LifePage;
