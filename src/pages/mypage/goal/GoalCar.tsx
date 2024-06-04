import { GreenButton } from "../../../components/ui/GreenButton";
import { Car, UserGoalDetailGetResponse } from "./GoalDetailPage";

type Props = {
  goal: UserGoalDetailGetResponse;
  goalDetail: Car;
};

export const GoalCar = ({ goal, goalDetail }: Props) => {
  return (
    <>
      <div className="mx-10 mb-5">
        <label className="text-customGreen font-bold text-lg">차 이름</label>
        <br />
        <input
          className="border-b border-gray-400 h-8 mt-3 mb-5"
          value={goalDetail.carNm}
        />
        <br />
        <label className="text-customGreen font-bold text-lg">목표 기간</label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={goal.duration}
        />
        개월
        <label className="text-customGreen font-bold text-lg">
          예상 목표 달성 금액
        </label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-10"
          value={goalDetail.carPrice}
        />
        <GreenButton path={"/mypage/goal"} name={"저장"} />
      </div>
    </>
  );
};
