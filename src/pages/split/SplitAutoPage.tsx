import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";
import { Ratio } from "./SplitMainPage";

export const SplitAutoPage = () => {
  const ratio: Ratio = {
    saving: 50,
    life: 23,
    reserve: 27,
  };

  return (
    <>
      <TopLine name={""} />
      <div className="m-10">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">
              <span className="text-green-600 mr-2">하나</span>님을 위한
              <br />
              통장 쪼개기 추천 비율
            </h3>
            <div>
              <img
                src="\src\assets\byul5.png"
                className="w-20"
                alt="하나은행"
              />
            </div>
          </div>
          <p className="text-gray-400 text-xs">
            최근 한 달간 소비 패턴을 분석해서 추천해드렸어요
          </p>
        </div>
        <div className="mt-5">
          <div className="w-full flex h-5 rounded-full bg-gray-300">
            <div
              style={{ width: `${ratio.saving}%` }}
              className="h-5 rounded-s-full bg-lime-200 text-center text-sm"
            >
              {ratio.saving}%
            </div>
            <div
              style={{ width: `${ratio.life}%` }}
              className="h-5 bg-yellow-300 text-center text-sm"
            >
              {ratio.life}%
            </div>
            <div
              style={{ width: `${ratio.reserve}%` }}
              className="h-5 rounded-e-full bg-rose-300 text-center text-sm"
            >
              {ratio.reserve}%
            </div>
          </div>
          <div className="flex mt-5 gap-x-3 justify-start items-center">
            <div className="w-3 h-3 bg-lime-200 rounded-full"></div>
            <div className="text-xs">저축</div>
            <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
            <div className="text-xs">생활비</div>
            <div className="w-3 h-3 bg-rose-300 rounded-full"></div>
            <div className="text-xs">예비비</div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💰저축 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.saving}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                900,000원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💳소비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">{ratio.life}%</div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                414,000원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm  align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.reserve}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                486,000원
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-gray-200 border-0 w-16 mx-auto my-8 h-px" />
        <GreenButton name={"이대로 설정하기"} path={"/split"} />
      </div>
    </>
  );
};
