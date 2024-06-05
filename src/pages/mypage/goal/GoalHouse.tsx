import { useEffect, useState } from "react";
// import { GreenButton } from "../../../components/ui/GreenButton";
import { House, UserGoalDetailGetResponse } from "./GoalDetailPage";
import { FetchOptions, useFetch } from "../../../hooks/fetch";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Goal, useGoalsProducts } from "../../../contexts/ProductContext";

type Props = {
  goal: UserGoalDetailGetResponse;
  goalDetail: House;
};

type ApartmentGetResponse = {
  apartmentId: number;
  apartmentNm: string;
  apartmentPrice: number;
  regionCd: number;
  regionNm: string;
  exclusiveArea: number;
};

export const GoalHouse = ({ goal, goalDetail }: Props) => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState<ApartmentGetResponse[]>([]);
  const [selectedApartment, setSelectedApartment] =
    useState<ApartmentGetResponse | null>(null);
  const [search, setSearch] = useState<string>(goalDetail.apartmentNm);
  const [alias, setAlias] = useState<string>(goal.goalAlias);
  const [duration, setDuration] = useState<number>(goal.duration);
  const [price, setPrice] = useState<number>(goalDetail.apartmentPrice);

  const { goalId } = useParams();
  const { user } = useUser();
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };

  const { createGoal, updateGoal } = useGoalsProducts();

  const { data, error, loading } = useFetch<ApartmentGetResponse[]>(
    `http://43.201.157.250:8080/api/v1/user-goals/apartments`,
    fetchOptions
  );

  // 아파트 리스트
  useEffect(() => {
    if (data) {
      setApartments(data);
      console.log(apartments);
      const defaultApartment = data.find(
        (apartment) => apartment.apartmentNm === goalDetail.apartmentNm
      );
      if (defaultApartment) {
        setSelectedApartment(defaultApartment);
      }
    }
  }, [data, goalDetail.apartmentNm]);

  // 아파트 시세
  const fetchPredictedPrice = async () => {
    if (!selectedApartment || !duration) return;
    try {
      const response = await fetch(
        `http://43.201.157.250:8080/api/v1/user-goals/apartments/predict`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
          body: JSON.stringify({
            region: selectedApartment.regionNm,
            apartmentNm: selectedApartment.apartmentNm,
            price: selectedApartment.apartmentPrice,
            area: selectedApartment.exclusiveArea,
            date: "2030-06",
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch predicted price");
      const result = await response.json();
      setPrice(result.predictedPrice); // 새로운 아파트 선택 시 가격 업데이트
    } catch (error) {
      console.error("Error fetching predicted price:", error);
    }
  };

  const handleApartmentSelect = (apartment: ApartmentGetResponse) => {
    setSelectedApartment(apartment);
    setSearch(apartment.apartmentNm); // 선택 후 검색창을 아파트 이름으로 설정하여 드롭다운 숨기기
    fetchPredictedPrice();
  };

  useEffect(() => {
    fetchPredictedPrice();
  }, [selectedApartment, duration]);

  const filteredApartments = apartments.filter((apartment) =>
    apartment.apartmentNm.toLowerCase().includes(search.toLowerCase())
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
                goalTypeCd: "HOUSE",
                goalSpecificId: selectedApartment?.apartmentId,
                goalBeginDate: "20240612",
                duration: duration,
                amount: price,
              }),
            }
          );
          if (response.ok) {
            const json = await response.json();
            console.log(json);
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
        <label className="text-customGreen font-bold text-lg">
          아파트 이름
        </label>
        <br />
        <input
          className="border-b border-gray-400 h-8 mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search &&
          filteredApartments.length > 0 &&
          search !== selectedApartment?.apartmentNm && (
            <div className="border border-gray-400 mt-2 max-h-24 overflow-y-auto">
              {filteredApartments.map((apartment) => (
                <div
                  key={apartment.apartmentId}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleApartmentSelect(apartment)}
                >
                  {apartment.apartmentNm}
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
        <label className="text-customGreen font-bold text-lg">
          예상 목표 달성 금액
        </label>
        <input
          type="number"
          className="w-full border-b border-gray-400 h-8 mt-3 mb-10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <button onClick={buttonClicked}>
          {Number(goalId) === 0 ? "생성" : "수정"}
        </button>
      </div>
    </>
  );
};
