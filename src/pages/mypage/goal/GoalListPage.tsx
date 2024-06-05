import { useNavigate } from "react-router-dom";
import { TopLine } from "../../../components/ui/TopLine";
// import { GreenButton } from "../../../components/ui/GreenButton";
import { useGoalsProducts } from "../../../contexts/ProductContext";

type Props = {
  id: number;
  count: number;
  name: string;
};

const Goal = ({ id, count, name }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex p-4 mb-2 border rounded-lg shadow-sm bg-white items-center cursor-pointer hover:shadow-md"
      onClick={() => navigate(`${id}`, { state: { count } })}
    >
      <span className="text-sm text-customGreen font-bold">목표 {count}</span>
      <span className="ml-5">{name}</span>
    </div>
  );
};

export const GoalListPage = () => {
  const { goalsProducts } = useGoalsProducts();
  const navigate = useNavigate();
  const goalId = 0;

  return (
    <div>
      <TopLine name="목표 관리" />
      <div className="m-10">
        <span className="text-xl font-hana-m">🚩 목표</span>
        <div className="my-4 space-y-4">
          {goalsProducts?.goalsProducts?.map((goalProduct, index) => (
            <Goal
              key={goalProduct.goal.userGoalId}
              id={goalProduct.goal.userGoalId}
              count={index + 1}
              name={goalProduct.goal.goalAlias}
            />
          ))}
        </div>
        <button onClick={() => navigate(`${goalId}/create`)}>
          + 목표 추가
        </button>
        {/* <GreenButton path=`{}/create` name="+ 목표 추가" /> */}
      </div>
    </div>
  );
};
