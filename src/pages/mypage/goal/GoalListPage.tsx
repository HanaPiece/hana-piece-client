import { useNavigate } from "react-router-dom";
import { TopLine } from "../../../components/ui/TopLine";
import { SlPlus } from "react-icons/sl";
import { GreenButton } from "../../../components/ui/GreenButton";

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
        className="flex p-4 mb-2 border rounded-lg shadow-sm bg-white items-center cursor-pointer hover:shadow-md"
        onClick={() => navigate(`${id}`, { state: { count } })}
      >
        <span className="text-sm text-customGreen font-bold">목표 {count}</span>
        <span className="ml-5">{name}</span>
      </div>
    </>
  );
};

export const GoalListPage = () => {
  return (
    <>
      <div>
        <TopLine name={"목표 관리"} />
        <div className="m-10">
          <span className="text-xl font-hana-m">🚩 목표</span>
          <div className="my-4 space-y-4">
            {goals.map((goal, count) => (
              <Goal
                key={goal.id}
                id={goal.id}
                count={count + 1}
                name={goal.name}
              />
            ))}
          </div>
          <GreenButton path={"create"} name={"+ 목표 추가"} />
        </div>
      </div>
    </>
  );
};
