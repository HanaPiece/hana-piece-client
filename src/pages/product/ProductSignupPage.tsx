import { useState } from "react";
import { Checkbox } from "../../components/ui/Checkbox";
import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const ProductSignupPage = () => {
  const id = 4;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div className="h-1 bg-gray-200">
          <div className="w-4/5 hana-color h-1"></div>
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
          <br />
          <div className="grid grid-cols-5 mb-10 gap-y-4">
            <label className="text-customGreen font-semibold col-span-2">
              가입 금액
            </label>
            <input type="text" className="bg-slate-300 col-span-3" />
            <label className="text-customGreen font-semibold col-span-2">
              납부일
            </label>
            <input type="text" className="bg-slate-300 col-span-3" />
            <label className="text-customGreen font-semibold col-span-2">
              만기 설정
            </label>
            <input type="text" className="bg-slate-300 col-span-3" />
            <label className="text-customGreen font-semibold col-span-2">
              출금 계좌
            </label>
            <input type="text" className="bg-slate-300 col-span-3" />
            <label className="text-customGreen font-semibold  col-span-2">
              자동이체 여부
            </label>
            <div className="col-span-2">
              <Checkbox checked={isChecked} onChange={setIsChecked} name="설정하기" />
            </div>
          </div>
          
          <GreenButton
            path={`/product/${id}/complete`}
            name={"적금 개설하기"}
          />
        </div>
      </div>
    </>
  );
};
