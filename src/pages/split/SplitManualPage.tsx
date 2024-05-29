import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

export const SplitManualPage = () => {
  return (
    <>
      <TopLine name={""} />
      <div className="m-10">
        <div>
          <h3 className="font-bold text-xl">통장 쪼개기</h3>
          <p className="text-xs mt-3 font-semibold">
            월 소득 <span className="text-lg">1,800,000</span>원
          </p>
        </div>

        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💰 저축 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1  border rounded-lg py-2 px-4">
              <div className="font-semibold text-gray-400 text-sm  align-bottom mb-1">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                <input
                  type="text"
                  className="w-8 border-b-2 border-black focus:outline-none"
                  value="23"
                />{" "}
                %
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right mb-1">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                <input
                  type="text"
                  className="w-24 border-b-2 text-center border-black focus:outline-none"
                  value="900000"
                />
                원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💳 소비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1  border rounded-lg py-2 px-4">
              <div className="font-semibold text-gray-400 text-sm  align-bottom mb-1">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                <input
                  type="text"
                  className="w-8 border-b-2 border-black focus:outline-none"
                  value="27"
                />{" "}
                %
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right mb-1">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                <input
                  type="text"
                  className="w-24 border-b-2 text-center border-black focus:outline-none"
                  value="414000"
                />
                원
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡 예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1  border rounded-lg py-2 px-4">
              <div className="font-semibold text-gray-400 text-sm  align-bottom mb-1">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                <input
                  type="text"
                  className="w-8 border-b-2 border-black focus:outline-none"
                  value="50"
                />{" "}
                %
              </div>
              <div className="font-semibold text-gray-400 text-sm text-right mb-1">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                <input
                  type="text"
                  className="w-24 border-b-2 text-center border-black focus:outline-none"
                  value="486000"
                />
                원
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 text-sm">
          <div>
            합 <span>100</span>%
          </div>
          <div>
            총 <span>1,800,000</span>원
          </div>
        </div>
        <div className="text-red-600 text-xs my-4 mb-10">
          총합을 100%로 맞춰주세요
        </div>
        <GreenButton name={"변경하기"} path={"/split"} />
      </div>
    </>
  );
};
