import { useLocation } from "react-router-dom";
import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";
import { useUser } from "../../contexts/UserContext";

export const SplitStartCompletePage = () => {
  const {user} = useUser();
  const salary = Number(user.salary);
  const location = useLocation();
  const { splitRatio } = location.state || {};

  const calcAmount=(ratio:number):number=>{
    return ratio*0.01*salary;
  };

  return(
    <>
      <div className="container">
        <TopLine name={"통장 쪼개기 시작하기"} />
        <div className="h-1 bg-gray-200">
            <div className="w-full hana-color h-1"></div>
        </div>
        <div className="mx-10">
          <div className="my-20 text-center">
              <h2 className="text-4xl mb-5">✔️</h2>
              <h2 className="text-3xl font-bold">통장쪼개기<br />완료 !</h2>
          </div>
          <div className="border rounded-xl p-3 mb-20">
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                저축 통장
              </label>
              <span className="m-3 col-span-2">{calcAmount(splitRatio.saving).toLocaleString()}원 ({splitRatio.saving}%)</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                소비 통장
              </label>
              <span className="m-3 col-span-2">{calcAmount(splitRatio.life).toLocaleString()}원 ({splitRatio.life}%)</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                예비 통장
              </label>
              <span className="m-3 col-span-2">{calcAmount(splitRatio.reserve).toLocaleString()}원 ({splitRatio.reserve}%)</span>
            </div>
          </div>
          <GreenButton path={"/split"} name={"확인"} />
        </div>
      </div>
    </>
  );
};