import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const SplitStartCompletePage = () => {
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
              <span className="m-3 col-span-2">value</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                소비 통장
              </label>
              <span className="m-3 col-span-2">value</span>
            </div>
            <div className="flex justify-between">
              <label className="m-3 text-customGreen font-semibold col-span-2">
                예비 통장
              </label>
              <span className="m-3 col-span-2">value</span>
            </div>
          </div>
          <GreenButton path={"/split"} name={"확인"} />
        </div>
      </div>
    </>
  );
};