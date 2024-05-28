import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";

export const SalaryPage = () => {
  return (
    <>
      <div className="container m-10">
        <TopLine name={"월급 관리"} />

        <div>
          <div className="grid grid-cols-4">
            <label className="m-3 text-customGreen font-semibold col-span-1">
              은행 이름
            </label>
            <span className="m-3 bg-slate-100 col-span-3">하나은행</span>
            <label className="m-3 text-customGreen font-semibold col-span-1">
              납부일
            </label>
            <span className="m-3 bg-slate-100 col-span-3">고정 계좌번호</span>
            <label className="m-3 text-customGreen font-semibold col-span-1">
              만기 설정
            </label>
            <input
              type="text"
              className="m-3 bg-slate-100 col-span-3"
              value="original value"
            />
            <label className="m-3 text-customGreen font-semibold col-span-1">
              출금 계좌
            </label>
            <input
              type="text"
              className="m-3 bg-slate-100 col-span-3"
              value="original value"
            />
          </div>
          <GreenButton path={"/mypage"} name={"저장"} />
        </div>
      </div>
    </>
  );
};
