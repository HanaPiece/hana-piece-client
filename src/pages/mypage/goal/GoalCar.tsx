import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../../hooks/fetch";
import { Car, UserGoalDetailGetResponse } from "./GoalDetailPage";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToYyyyMmDd, formatDateToYyyymmdd } from "./GoalUtil";
import { Goal, useGoalsProducts } from "../../../contexts/ProductContext";

type Props = {
  goal: UserGoalDetailGetResponse;
  goalDetail: Car;
};

type CarGetResponse = {
  carId: number;
  carNm: string;
  carPrice: number;
};

export const GoalCar = ({ goal, goalDetail }: Props) => {
  const navigate = useNavigate();
  const { goalId } = useParams<{ goalId: string }>();
  const { user } = useUser();
  const { createGoal, updateGoal } = useGoalsProducts();

  const [cars, setCars] = useState<CarGetResponse[]>([]);
  const [search, setSearch] = useState<string>(goalDetail.carNm);
  const [selectedCar, setSelectedCar] = useState<CarGetResponse | null>(null);
  const [alias, setAlias] = useState<string>(goal.goalAlias);
  const [duration, setDuration] = useState<number>(goal.duration);
  const [price, setPrice] = useState<number>(goalDetail.carPrice);
  const [begin, setBegin] = useState<string>(
    formatDateToYyyyMmDd(goal.goalBeginDate)
  );

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<CarGetResponse[]>(
    `http://43.201.157.250:8080/api/v1/user-goals/cars`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      setCars(data);
      const defaultCar = data.find((car) => car.carNm === goalDetail.carNm);
      if (defaultCar) {
        setSelectedCar(defaultCar);
      }
    }
  }, [data, goalDetail.carNm]);

  const handleCarSelect = (car: CarGetResponse) => {
    setSelectedCar(car);
    setPrice(car.carPrice);
    setSearch(car.carNm); // 드롭다운 항목 클릭 시 검색창 업데이트 및 드롭다운 숨기기
  };

  const filteredCars = cars.filter((car) =>
    car.carNm.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                goalTypeCd: "CAR",
                goalSpecificId: selectedCar?.carId,
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

        <label className="text-customGreen font-bold text-lg">차 이름</label>
        <br />
        <input
          className="border-b border-gray-400 h-8 mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && filteredCars.length > 0 && search !== selectedCar?.carNm && (
          <div className="border border-gray-400 mt-2 max-h-24 overflow-y-auto">
            {filteredCars.map((car) => (
              <div
                key={car.carId}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleCarSelect(car)}
              >
                {car.carNm}
              </div>
            ))}
          </div>
        )}
        <br />
        <label className="text-customGreen font-bold text-lg">목표 기간</label>
        <input
          type="text"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <br />
        <label className="text-customGreen font-bold text-lg">차 가격</label>
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
