import { useNavigate } from "react-router-dom";
import {
  getMonthFromDateString,
  getYearFromDateString,
  goalDateParse,
} from "../../components/utils/formatters";
import { FaPlus } from "react-icons/fa";
import { FetchOptions, useFetch } from "../../hooks/fetch";
import { UserGoalGetResponse } from "./homeType";
import { useUser } from "../../contexts/UserContext";
import { API_BASE_URL } from "../../constants";
import { useEffect } from "react";

const GoalBox = ({ goal }: { goal: UserGoalGetResponse }) => {
  const navigate = useNavigate();
  const goToSelect = (userGoalId: number) => {
    navigate(`${userGoalId}`);
  };

  const beginDate = (date: string) => {
    const goalDate = goalDateParse(date);
    return (
      getYearFromDateString(goalDate) + "." + getMonthFromDateString(goalDate)
    );
  };

  const gradientClass =
    goal.goalTypeCd === "CAR"
      ? "bg-violet-50"
      : goal.goalTypeCd === "HOUSE"
      ? "bg-sky-50"
      : goal.goalTypeCd === "WISH"
      ? "bg-lime-50"
      : "bg-stone-50";

  const icon =
    goal.goalTypeCd === "CAR"
      ? "🚗"
      : goal.goalTypeCd === "HOUSE"
      ? "🏠"
      : goal.goalTypeCd === "WISH"
      ? "🙏"
      : "💰";

  return (
    <>
      <div
        className={`relative ${gradientClass} border-2 border-customGreen rounded-2xl p-3 mt-5 mb-7 shadow-xl cursor-pointer`}
        onClick={() => goToSelect(goal.userGoalId)}
      >
        <div className="absolute top-0 left-0 bg-customGreen w-1/5 text-white p-1 text-sm text-center font-hana-r rounded-br-xl rounded-tl-xl">
          목표 {goal.userGoalId}
        </div>
        <div className="grid grid-cols-5 text-md font-semibold mb-8 mt-3">
          <div className="align-bottom col-span-3 flex">
            <div className="text-lg self-center">
              <span
                className={`bg-gradient-to-t from-yellow-200 from-50% to-${gradientClass} to-50%`}
              >
                {goal.goalAlias}
              </span>
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-medium text-right">
              {beginDate(goal.goalBeginDate)} ~
            </div>
            <div className="text-right">
              {goal.enrolledProducts.length >= 1
                ? goal.enrolledProducts[0].enrolledProductName +
                  (goal.enrolledProducts.length === 1
                    ? ``
                    : ` 외 ${goal.enrolledProducts.length - 1}개`)
                : null}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <div className="col-start-1 col-end-3">현재 저축 금액</div>
        </div>
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">
            {goal.savingMoney.toLocaleString()} 원
          </div>

          <div className="absolute -right-3 -bottom-4 bg-white rounded-full w-20 h-20 border-4 border-customGreen text-center text-5xl">
            <div className="pt-2 pl-1">{icon}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const calcTotalAmount = (goals: UserGoalGetResponse[] = []) => {
  let totalAmount = 0;
  goals.forEach((goal) => {
    totalAmount += goal.savingMoney;
  });
  return totalAmount;
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<UserGoalGetResponse[]>(
    `${API_BASE_URL}/api/v1/user-goals/list`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const totalAmount = calcTotalAmount(data || []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-white px-10">
        <img src="logo.png" className="w-1/5" alt="" />
      </div>
      <div className="mx-10 my-5">
        <div className="font-hana-r">
          <p className="text-gray-400 text-xs">반갑습니다</p>
          <h3 className="font-semibold text-lg pt-1">{user.name} 님</h3>
        </div>

        <div className="px-5 py-3 mt-3 bg-gray-200 rounded-2xl flex justify-between items-end">
          <h2 className="font-hana-b text-lg">💰현재 저축액 :</h2>
          <h2 className="font-hana-b text-xl">
            {Math.ceil(totalAmount / 10000).toLocaleString()}{" "}
            <span className="text-lg">만원</span>
          </h2>
        </div>

        {data?.map((goal) => (
          <div key={goal.userGoalId}>
            <GoalBox goal={goal} />
          </div>
        ))}

        <div
          className="py-5 bg-white rounded-2xl p-3 mt-5 mb-7 shadow-xl cursor-pointer text-center"
          onClick={() => navigate("/mypage/goal/create")}
        >
          <div className="m-auto mb-5 w-14 h-14 rounded-full bg-slate-300 flex justify-center items-center">
            <FaPlus className="text-customGreen text-xl" />
          </div>
          <p className="font-hana-cm text-customGreen">목표를 추가해보세요!</p>
        </div>
      </div>
    </>
  );
};
