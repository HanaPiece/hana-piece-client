// import { useState } from "react";
import { GreenButton } from "../../../components/ui/GreenButton";
import { House, UserGoalDetailGetResponse } from "./GoalDetailPage";

type Props = {
  goal: UserGoalDetailGetResponse;
  goalDetail: House;
};

export const GoalHouse = ({ goal, goalDetail }: Props) => {
  // const [apartmentNm, setApartmentm] = useState<string>();
  // const [apartmentPrice, setApartmentPrice] = useState<number>();
  // const [duration, setDuration] = useState<number>();
  return (
    <>
      <div className="mx-10 mb-5">
        <label className="text-customGreen font-bold text-lg">
          아파트 이름
        </label>
        <br />
        <input
          className="border-b border-gray-400 h-8 mt-3 mb-5"
          value={goalDetail.apartmentNm}
        />
        <br />
        <label className="text-customGreen font-bold text-lg">
          예상 목표 달성 금액
        </label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-10"
          value={goalDetail.apartmentPrice}
        />
        <label className="text-customGreen font-bold text-lg">목표 기간</label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={goal.duration}
          // onClick={setDuration()}
        />
        개월
        <GreenButton path={"/mypage/goal"} name={"저장"} />
      </div>
    </>
  );
};
