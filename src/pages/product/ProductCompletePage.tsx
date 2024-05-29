import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const ProductCompletePage = () => {
  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div>
          <div className="text-3xl font-bold">적금 이름</div>
          <br />
          <div className="text-3xl font-bold">적금 개설 완료</div>
          <br />
          <div className="grid grid-cols-4">
            <label className="m-3 text-customGreen font-semibold col-span-2">
              가입 금액
            </label>
            <span className="m-3 col-span-2">value</span>
            <label className="m-3 text-customGreen font-semibold col-span-2">
              자동 이체
            </label>
            <span className="m-3 col-span-2">value</span>
            <label className="m-3 text-customGreen font-semibold col-span-2">
              만기 일자
            </label>
            <span className="m-3 col-span-2">value</span>
            <label className="m-3 text-customGreen font-semibold col-span-2">
              적용금리
            </label>
            <span className="m-3 col-span-2">value</span>
          </div>
          <GreenButton path={"/home"} name={"확인"} />
        </div>
      </div>
    </>
  );
};
