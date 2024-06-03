// import { useState } from "react";
import { SlCreditCard } from "react-icons/sl";
import GoalProductRecommend from "./GoalProductRecommend";

export const GoalProductDetailPage = () => {
  const name = "김하나";
  const isRecommend = true;
  // const [isRecommend, setRecommend] = useState<boolean>(true);

  return (
    <>
      <div className="bg-white px-10">
        <img src="/logo.png" className="w-1/5" alt="하나피스" />
      </div>
      <div className="mx-10 my-5">
        <div className="font-hana-r">
          <p className='text-gray-400 text-xs'>반갑습니다</p>
          <h3 className='font-semibold text-lg pt-1'>{name} 님</h3>
        </div>
        {isRecommend ? (
          <>
            {/* 상품 정보 */}
            <div className="rounded-2xl hana-color text-white p-4 my-7 shadow-md">
              <p className="font-bold text-lg mb-2">하나주택청약종합저축</p>
              <div className="flex justify-between text-xs mb-2">
                <p>계좌번호: 111-22222-33333</p>
                <p className="text-right">
                  개설일 <br /> 2020.02.12
                </p>
              </div>
              <p className="text-sm">
                원금: <span className="font-extrabold">3,0000,000원</span>
              </p>
              <p className="text-sm">
                목표 금액: <span className="font-extrabold">5,0000,000원</span>
              </p>
              <p className="text-sm">
                쌓인 이자: <span className="font-extrabold">45,666원</span>
              </p>
              <div className="flex justify-between">
                <div className="mt-10 text-xs">
                  만기일 <br /> 2030.3.12
                </div>
                <img
                  src="\src\assets\byul1.png"
                  alt="하나주택청약종합저축"
                  className="w-2/5"
                />
              </div>
            </div>
            {/* 납부 내역 */}
            <div>
              <div className="flex justify-between my-4">
                <h3 className="font-extrabold text-xl">납부 내역</h3>
                <button className="border-none text-blue-700 text-sm">
                  최신순
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="bg-gray-300 w-10 rounded-full grid place-items-center">
                  <SlCreditCard className="nav-icon" />
                </div>
                <div className="col-span-3">
                  <p className="font-semibold">하나오픈월부금</p>
                  <p className="text-xs text-gray-400">5월 1일 월요일</p>
                </div>
                <div className="col-span-2 text-right font-semibold">
                  +300,000원
                </div>
              </div>
            </div>
          </>
        ) : (
          <GoalProductRecommend />
        )}
      </div>
    </>
  );
};
