import { useEffect, useState } from "react";
import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";
import { Ratio } from "./SplitMainPage";
import { Checkbox } from "../../components/ui/Checkbox";
import { useUser } from "../../contexts/UserContext";
import { API_BASE_URL } from "../../constants";

export const SplitAutoPage = () => {
  const [mode, setMode] = useState<boolean>(true);

  const [ratio, setRatio] = useState<Ratio>({
    saving: 50,
    life: 23,
    reserve: 27,
  });

  const { user } = useUser();

  useEffect(() => {
    let type: string = "";
    if (mode) type = "lux";
    else type = "save";

    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/accounts/auto-debit/suggestions/${type}`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            setRatio({
              saving: json["saving"],
              life: json["life"],
              reserve: json["reserve"],
            });
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  }, [user.jwt, mode]);

  return (
    <>
      <TopLine name={""} />
      <div className="mb-10 mx-10 mt-5">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">
              <span className="text-green-600 mr-2">{user.name}</span>님을 위한
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
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-x-2 rounded-xl text-center font-hana-m">
            <div
              className={`flex items-center p-1 place-content-center border-2 rounded-xl cursor-pointer ${
                mode === true
                  ? " border-customGreen bg-green-50"
                  : " border-gray-300"
              }`}
              onClick={() => setMode(true)}
            >
              <Checkbox checked={mode} onChange={setMode} name={""} />
              럭셔리 모드
            </div>
            <div
              className={`flex items-center p-1 place-content-center border-2 rounded-xl cursor-pointer ${
                mode === false
                  ? "border-customGreen bg-green-50"
                  : "border-gray-300"
              }`}
              onClick={() => setMode(false)}
            >
              <Checkbox checked={!mode} onChange={setMode} name={""} />
              짠돌이 모드
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💰저축 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.saving}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-center">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {(Number(user.salary) * 0.01 * ratio.saving).toLocaleString()}
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💳소비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">{ratio.life}%</div>
              <div className="font-semibold text-gray-400 text-sm text-center">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {(Number(user.salary) * 0.01 * ratio.life).toLocaleString()}
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.reserve}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-center">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {(Number(user.salary) * 0.01 * ratio.reserve).toLocaleString()}
                <span className="text-lg">원</span>
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
