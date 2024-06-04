import { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import ConsumptionChart from './ConsumptionChart';
import { addCommas, dateParse } from '../../components/utils/formatters';


type consumptionDetail = {
  amount: number;
  createdAt: string;
  targetNm: string;
  accountTransactionTypeNm: string;
};

const TodayDate = (): Date => {
  return new Date();
};

const AdjustMonth = (date: Date, adjustValue: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + adjustValue);
  return newDate;
};

const groupByDate = (
  data: consumptionDetail[]
): { [key: string]: consumptionDetail[] } => {
  return data.reduce((acc, curr) => {
    const date = curr.createdAt;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {} as { [key: string]: consumptionDetail[] });
};

const calculateTotalAmount = (data: consumptionDetail[]): number => {
  return data.reduce((acc, curr) => acc + curr.amount, 0);
};

export const LifePage = () => {
  const [date, setDate] = useState<Date>(TodayDate());

  const handlePreviousMonth = () => {
    setDate(AdjustMonth(date, -1));
  };

  const handleNextMonth = () => {
    setDate(AdjustMonth(date, 1));
  };

  const consumptionData: consumptionDetail[] = [
    {
      amount: -13800,
      createdAt: "2024-05-24",
      targetNm: "Apple Store",
      accountTransactionTypeNm: "쇼핑",
    },
    {
      amount: -15000,
      createdAt: "2024-05-24",
      targetNm: "Apple Store",
      accountTransactionTypeNm: "음악",
    },
    {
      amount: -10000,
      createdAt: "2024-05-23",
      targetNm: "Apple Store",
      accountTransactionTypeNm: "쇼핑",
    },
    {
      amount: -68500,
      createdAt: "2024-05-23",
      targetNm: "후불 교통카드 이용 대금",
      accountTransactionTypeNm: "교통",
    },
  ];

  const groupedData = groupByDate(consumptionData);

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
              <ConsumptionChart />
            </div>
            <div className="col-span-3 text-center ml-3">
              <p className="text-sm font-hana-m">현재 사용액</p>
              <p className="text-xl font-semibold mt-1">
                {addCommas(346500)}원
              </p>
              <p className="text-gray-400 mt-1 text-md">
                / {addCommas(600000)}원
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-7 py-3 bg-white">
        <div>
          <h3 className="text-gray-500 mt-5 mb-3 font-hana-m">지출 내역</h3>
          {Object.keys(groupedData).map((date) => (
            <div key={date} className="mb-5">
              <p className='font-semibold mb-1 bg-indigo-50 p-1'>{dateParse(date)}</p>

              <div className="inline-block px-2 text-sm font-semibold text-red-500 bg-gray-200 rounded-full">
                {addCommas(calculateTotalAmount(groupedData[date]))}원
              </div>
              {groupedData[date].map((item, index) => (
                <div key={index} className="mt-5 grid grid-cols-7 items-center">
                  <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
                    <img
                      src="/src/assets/img-hana-symbol-m.png"
                      alt="하나은행"
                      className="w-9/12"
                    />
                  </div>
                  <div className="col-span-4">
                    <p className="font-bold">{item.targetNm}</p>
                    <p className="text-sm">{item.accountTransactionTypeNm}</p>
                  </div>
                  <div className="col-span-2 font-bold">
                    {addCommas(item.amount)}원
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifePage;
