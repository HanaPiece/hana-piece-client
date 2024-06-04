import { useLocation, useParams } from "react-router-dom";
import { TopLine } from "../../../components/ui/TopLine";
import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../../hooks/fetch";
import { GoalHouse } from "./GoalHouse";
import { GoalCar } from "./GoalCar";
import { GoalWish } from "./GoalWish";

export type Car = {
  carNm: string;
  carPrice: number;
};

export type House = {
  apartmentNm: string;
  apartmentPrice: number;
  regionNm: string;
  exclusiveArea: number;
};

export type Wish = {
  wishNm: string;
  wishPrice: number;
};

export type UserGoalDetailGetResponse = {
  goalAlias: string;
  goalTypeCd: string;
  goalSpecificId: number;
  goalBeginDate: string;
  duration: number;
  detail: Car | House | Wish;
};

export const GoalDetailPage = () => {
  const location = useLocation();
  const { count } = location.state;
  const { goalId } = useParams();

  const { user } = useUser();
  const init: UserGoalDetailGetResponse = {
    goalAlias: "",
    goalTypeCd: "",
    goalSpecificId: 0,
    goalBeginDate: "",
    duration: 0,
    detail: { wishNm: "", wishPrice: 0 },
  };
  const [goal, setGoal] = useState<UserGoalDetailGetResponse>(init);

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };
  const { data, error, loading } = useFetch<UserGoalDetailGetResponse>(
    `http://43.201.157.250:8080/api/v1/user-goals/${goalId}`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      setGoal(data);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container">
        <TopLine name={"목표 수정"} />
        <div className="flex flex-col items-center">
          <div className=" bg-slate-200 mt-10 w-3/4 h-200 rounded-3xl p-5 mb-8">
            <p className="text-sm text-customGreen font-bold mb-5">
              목표 {count}
            </p>
            <span className="flex justify-center text-xl text-customGreen font-bold">
              {goal?.goalAlias}
              <br />
              🚗🏠🙏🧙🪄
            </span>
          </div>
          {goal?.goalTypeCd === "HOUSE" && (
            <GoalHouse goal={goal} goalDetail={goal.detail as House} />
          )}
          {goal?.goalTypeCd === "Car" && (
            <GoalCar goal={goal} goalDetail={goal.detail as Car} />
          )}
          {goal?.goalTypeCd === "Wish" && (
            <GoalWish goal={goal} goalDetail={goal.detail as Wish} />
          )}
        </div>
      </div>
    </>
  );
};
