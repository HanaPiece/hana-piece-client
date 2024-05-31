import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const ProductCompletePage = () => {
  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div className="h-1 bg-gray-200">
          <div className="w-full hana-color h-1"></div>
        </div>
        <div className="mx-7">
          <div className="flex justify-center gap-x-3 my-10 items-center">
            <div>
              <div className='bg-gray-200 w-8 h-8 rounded-full grid place-items-center'>
                  <img src='\img-hana-symbol-m.png' alt='하나은행' className='w-9/12' />
              </div>
            </div>
            <p className="text-xl font-hana-cm">청년 주택드림 청약통장</p>
          </div>
          <div className="my-20 text-center">
            <h2 className="text-4xl mb-5">✔️</h2>
            <h2 className="text-3xl font-bold">적금 개설 완료</h2>
          </div>

          <div className="border rounded-xl p-3 mb-20">
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                가입 금액
              </label>
              <span className="m-3 col-span-2">value</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                자동 이체
              </label>
              <span className="m-3 col-span-2">value</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                만기 일자
              </label>
              <span className="m-3 col-span-2">value</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                적용 금리
              </label>
              <span className="m-3 col-span-2">value</span>
            </div>
          </div>
          <GreenButton path={"/home"} name={"확인"} />
        </div>
      </div>
    </>
  );
};
