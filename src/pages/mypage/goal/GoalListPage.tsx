import { useNavigate } from "react-router-dom";
import { TopLine } from "../../../components/ui/TopLine";
import { SlPlus } from "react-icons/sl";

const goals = [
  { id: 1, name: "아파트 이름" },
  { id: 2, name: "차 이름" },
  { id: 3, name: "냄비 사기" },
  { id: 4, name: "여행 가기" },
];

type Props = {
  id: number;
  count: number;
  name: string;
};

const Goal = ({ id, count, name }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`${id}`, { state: { count } })}
        className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
      >
        <span className="text-sm text-customGreen font-bold">목표 {count}</span>
        <span className="ml-5">{name}</span>
      </div>
    </>
  );
};

export const GoalListPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex">
          <TopLine name={"목표 관리"} />
          <SlPlus
            className="ml-auto m-8 w-7 h-7 cursor-pointer"
            onClick={() => navigate("create")}
          />
        </div>
        <div>
          {goals.map((goal, count) => (
            <Goal
              key={goal.id}
              id={goal.id}
              count={count + 1}
              name={goal.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};
