import { UserGoalAccountGetResponse } from "./homeType";
import { addCommas } from "../../components/utils/formatters";

export const GoalProductDetail = ({data}:{data:UserGoalAccountGetResponse}) => {
  return (
    <>
      <div className="rounded-2xl hana-color text-white p-4 my-7 shadow-md">
              <p className="font-bold text-lg mb-2">{data.productNm}</p>
              <div className="flex justify-between text-xs mb-2">
                <p>계좌번호: {data.accountNumber}</p>
                <p className="text-right">
                  개설일 <br /> {data.openingDate}
                </p>
              </div>
              <p className="text-sm">
                원금: <span className="font-extrabold">{addCommas(data.principal)}원</span>
              </p>
              <p className="text-sm">
                목표 금액: <span className="font-extrabold">{addCommas(data.targetAmount)}원</span>
              </p>
              <p className="text-sm">
                쌓인 이자: <span className="font-extrabold">{addCommas(data.interestAmount)}원</span>
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
    </>
  );
}