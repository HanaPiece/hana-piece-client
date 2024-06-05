import { useState } from "react";
import { TopLine } from "../../components/ui/TopLine";
import { GreenButton } from "../../components/ui/GreenButton";
import { useGoalsProducts } from "../../contexts/ProductContext";

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
  const { goalsProducts } = useGoalsProducts();

  const handleSelectGoal = (goalId: number) => {
    setSelectedGoal(goalId);
  };

  return (
    <>
      <div>
        <TopLine name={"목표 선택"} />
        <div className="m-10">
          <div className="text-center">
            <p className="text-3xl mb-2 ml-3">🚩</p>
            <h2 className="font-bold text-xl">목표 선택</h2>
          </div>
          <div className="my-10">
            {goalsProducts?.goalsProducts?.map((goalProduct, index) => (
              <Goal
                key={goalProduct.goal.userGoalId}
                count={index + 1}
                name={goalProduct.goal.goalAlias}
                isSelected={index + 1 === selectedGoal}
                onSelect={() => handleSelectGoal(goalProduct.goal.userGoalId)}
              />
            ))}
          </div>
          <GreenButton path={`/product/${selectedGoal}`} name={"선택하기"} />
        </div>
      </div>
    </>
  );
};
