import { GreenButton } from "../../../../components/ui/GreenButton";
import { TopLine } from "../../../../components/ui/TopLine";

export const AccountCreatePage = () => {
  return (
    <>
      <div className="container">
        <TopLine name={"입출금 통장"} />
        <div className="h-1 bg-gray-200">
          <div className="w-1/4 hana-color h-1"></div>
        </div>
        <br />
        <div className="mx-7">
          <div className="flex justify-center gap-x-3 my-10 items-center">
            <div>
              <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
                <img
                  src="\img-hana-symbol-m.png"
                  alt="하나은행"
                  className="w-9/12"
                />
              </div>
            </div>
            <p className="text-xl font-hana-cm">입출금 계좌</p>
          </div>
          <div className="grid grid-cols-2 text-bold text-center pb-3 cursor-pointer">
            <div
              className={
                "px-4 py-2 border-customGreen border-b-2 font-bold text-customGreen"
              }
            >
              상품 안내
            </div>
          </div>
          <div className="h-[400px] overflow-y-auto p-5 mb-5 rounded-xl border bg-white shadow-lg">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-2 font-bold text-customGreen">
                상품 특징
              </div>
              <div className="col-span-5">
                급여이체 하나만으로 우대금리 및 수수료 면제 서비스를 제공하는
                급여 통장
              </div>
              <div className="col-span-2 font-bold text-customGreen">
                가입 대상
              </div>
              <div className="col-span-5">
                만 14세 이상 실명의 개인 또는 개인사업자(1인 1계좌)
              </div>
              <div className="col-span-2 font-bold text-customGreen">
                이자지급 <br />및 <br />
                이자지급
                <br />
                방법
              </div>
              <div className="col-span-5">
                이자계산기간동안 매일의 최종잔액에 고시금리를 적용한 월별이자를
                합산하여 지급 이자계산기간: 예금일(또는 원가일)부터 원가일(또는
                지급일) 전날까지의 기간 이자결산일: 매월 제3금요일
                이자지급일(원가일): 이자결산일의 익영업일
              </div>
              <div className="col-span-2 font-bold text-customGreen">
                기본금리
              </div>
              <div className="col-span-5">
                (2024-06-09 기준, 연율, 세전) <br /> 금액이 5천만원 미만일 때
                금리 0.1% <br /> 금액이 5천만원 이상일 때 금리 0.1%
              </div>
            </div>
          </div>

          <GreenButton path={`/mypage/account/term`} name={"계좌 개설하기"} />
        </div>
      </div>
    </>
  );
};
