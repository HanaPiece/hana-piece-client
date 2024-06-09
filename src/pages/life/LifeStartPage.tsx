import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const LifeStartPage = () => {
  return (
    <>
      <TopLine name={""} />
      <div className="m-10">
        <div className=" mt-14 mb-8 text-center">
          <p className="font-hana-b text-2xl mb-4">생활 시작 하기</p>
          <p className="font-hana-r">소비 내역을 확인하려면<br />소비 통장을 먼저 설정해주세요!</p>
        </div>
        <div className="mb-7">
          <img src="/life_start.png" alt="소비내역조회_시작" className="w-full" />
        </div>
        <GreenButton path={"/mypage/account/setting/open/update"} name={"설정하러 가기"} />
      </div>
    </>
  );
};