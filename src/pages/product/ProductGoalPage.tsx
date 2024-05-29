import { useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";

const goals = [
  { id: 1, name: "아파트 이름" },
  { id: 2, name: "차 이름" },
  { id: 3, name: "냄비 사기" },
  { id: 4, name: "여행 가기" },
];

type Props = {
  count: number;
  name: string;
};

const Goal = ({ count, name }: Props) => {
  const productId = 3;
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/product/${productId}/detail`)}
        className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
      >
        <span className="text-sm text-customGreen font-bold">목표 {count}</span>
        <span className="ml-5">{name}</span>
      </div>
    </>
  );
};

export const ProductGoalPage = () => {
  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div>
          {goals.map((goal, cnt) => (
            <Goal key={goal.id} count={cnt + 1} name={goal.name}></Goal>
          ))}
        </div>
      </div>
    </>
  );
};
