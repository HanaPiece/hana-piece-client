import { useNavigate, useParams } from "react-router-dom";
import { UserGoalDetailGetResponse, Wish } from "./GoalDetailPage";
import { useUser } from "../../../contexts/UserContext";
import { useState } from "react";
import { formatDateToYyyyMmDd, formatDateToYyyymmdd } from "./GoalUtil";
import { Goal, useGoalsProducts } from "../../../contexts/ProductContext";

type Props = {
  goal: UserGoalDetailGetResponse;
  goalDetail: Wish;
};

export const GoalWish = ({ goal, goalDetail }: Props) => {
  const navigate = useNavigate();
  const { goalId } = useParams<{ goalId: string }>();
  const { user } = useUser();
  const { createGoal, updateGoal } = useGoalsProducts();

  const [alias, setAlias] = useState<string>(goal.goalAlias);
  const [duration, setDuration] = useState<number>(goal.duration);
  const [price, setPrice] = useState<number>(goalDetail.wishPrice);
  const [begin, setBegin] = useState<string>(
    formatDateToYyyyMmDd(goal.goalBeginDate)
  );

  const buttonClicked = () => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            "http://43.201.157.250:8080/api/v1/user-goals",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
              body: JSON.stringify({
                userGoalId: goalId !== "0" ? goalId : null,
                goalAlias: alias,
                goalTypeCd: "WISH",
                goalSpecificId: goal.goalSpecificId,
                goalBeginDate: formatDateToYyyymmdd(begin),
                duration: duration,
                amount: price,
              }),
            }
          );
          if (response.ok) {
            const json = await response.json();
            const goal: Goal = {
              userGoalId: json["userGoalId"],
              goalAlias: json["goalAlias"],
              goalTypeCd: json["goalTypeCd"],
              goalSpecificId: json["goalSpecificId"],
              goalBeginDate: json["goalBeginDate"],
              duration: json["duration"],
              amount: json["amount"],
            };
            if (goalId === "0") {
              createGoal(goal);
            } else {
              updateGoal(goal);
            }
            navigate("/mypage/goal");
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err.message})`);
          }
        }
      })();
    }
  };

  return (
    <>
      <div className="mx-10 mb-5">
        <label className="text-customGreen font-bold text-lg">목표 이름</label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <br />

        <label className="text-customGreen font-bold text-lg">목표 기간</label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <br />
        <label className="text-customGreen font-bold text-lg">소원 가격</label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label className="text-customGreen font-bold text-lg">시작 날짜</label>
        <input
          type="date"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={begin}
          onChange={(e) => goalId === "0" && setBegin(e.target.value)}
          disabled={goalId !== "0"}
        />
        <br />
        <button onClick={buttonClicked}>
          {Number(goalId) === 0 ? "생성" : "수정"}
        </button>
      </div>
    </>
  );
};
