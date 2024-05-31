import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { GreenButton } from "../../components/ui/GreenButton";

const goals = [
  { id: 1, name: "아파트 이름" },
  { id: 2, name: "차 이름" },
  { id: 3, name: "냄비 사기" },
  { id: 4, name: "여행 가기" },
];

type Props = {
  count: number;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
};

const Goal = ({ count, name, isSelected, onSelect }: Props) => {
  return (
    <div
      onClick={onSelect}
      className={`flex p-4 mb-2 rounded-lg bg-white shadow-sm cursor-pointer border border-gray-300 hover:shadow-md ${
        isSelected ? "border-lime-500 border-4" : "border-gray-300"
      }`}
    >
      <span className="text-sm text-customGreen font-bold">목표 {count}</span>
      <span className="ml-5">{name}</span>
    </div>
  );
};

export const ProductGoalPage = () => {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const handleSelectGoal = (goalId: number) => {
    setSelectedGoal(goalId);
  };


  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div className="h-1 bg-gray-200">
          <div className="w-1/5 hana-color h-1"></div>
        </div>
        <div className="m-10">
          <div className="text-center">
            <p className="text-3xl mb-2 ml-3">🚩</p>
            <h2 className="font-bold text-xl">목표 선택</h2>
          </div>
          <div className="my-10">
            {goals.map((goal, cnt) => (
              <Goal
                key={goal.id}
                count={cnt + 1}
                name={goal.name}
                isSelected={goal.id === selectedGoal}
                onSelect={() => handleSelectGoal(goal.id)}
              />
            ))}
          </div>
          <GreenButton path={`/product/${selectedGoal}/detail`} name={"선택하기"} />
        </div>
      </div>
    </>
  );
};
