import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const ProductSignupPage = () => {
  const id = 4;
  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div>
          <div className="text-3xl font-bold">적금 이름</div>
          <br />
          <div className="grid grid-cols-4">
            <label className="m-3 text-customGreen font-semibold col-span-1">
              가입 금액
            </label>
            <input type="text" className="m-3 bg-slate-300 col-span-3" />
            <label className="m-3 text-customGreen font-semibold col-span-1">
              납부일
            </label>
            <input type="text" className="m-3 bg-slate-300 col-span-3" />
            <label className="m-3 text-customGreen font-semibold col-span-1">
              만기 설정
            </label>
            <input type="text" className="m-3 bg-slate-300 col-span-3" />
            <label className="m-3 text-customGreen font-semibold col-span-1">
              출금 계좌
            </label>
            <input type="text" className="m-3 bg-slate-300 col-span-3" />
            <label className="m-3 text-customGreen font-semibold  col-span-2">
              자동이체 여부
            </label>
            <input type="checkbox" className="col-span-2" /> <br />
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
