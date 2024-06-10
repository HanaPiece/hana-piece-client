// import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { GoalCar } from "./GoalCar";
import { House, Car, Wish, UserGoalDetailGetResponse } from "./GoalDetailPage";
import { GoalHouse } from "./GoalHouse";
import { GoalWish } from "./GoalWish";

export const GoalCreatePage = () => {
  const [category, setCategory] = useState<string>("카테고리를 선택해주세요.");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategorySelect = (category: string) => {
    setCategory(category);
    setIsOpen(false);
  };

  const houseInit: UserGoalDetailGetResponse = {
    goalAlias: "",
    goalTypeCd: "HOUSE",
    goalSpecificId: 0,
    goalBeginDate: "",
    duration: 0,
    detail: {
      apartmentNm: "",
      apartmentPrice: 0,
      regionNm: "",
      exclusiveArea: 0,
    },
  };
  const carInit: UserGoalDetailGetResponse = {
    goalAlias: "",
    goalTypeCd: "Car",
    goalSpecificId: 0,
    goalBeginDate: "",
    duration: 0,
    detail: { carNm: "", carPrice: 0 },
  };
  const wishInit: UserGoalDetailGetResponse = {
    goalAlias: "",
    goalTypeCd: "Wish",
    goalSpecificId: 0,
    goalBeginDate: "",
    duration: 0,
    detail: { wishNm: "", wishPrice: 0 },
  };

  const [goal, setGoal] = useState<UserGoalDetailGetResponse>(wishInit);

  return (
    <>
      <div className="container ">
        <TopLine name={"목표 생성"} />
        <div className="flex flex-col items-center m-10">
          <div className="">
            <label className="m-3 text-customGreen">목표 카테고리</label>
            <br />

            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-80 justify-center rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  {category}
                  <SlArrowDown className="ml-auto m-1" />
                </button>
              </div>

              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <span
                      className="block px-4 py-2 text-sm cursor-pointer"
                      role="menuitem"
                      onClick={() => {
                        setGoal(houseInit);
                        handleCategorySelect("집");
                      }}
                    >
                      집
                    </span>
                    <span
                      className="block px-4 py-2 text-sm cursor-pointer"
                      role="menuitem"
                      onClick={() => {
                        setGoal(carInit);
                        handleCategorySelect("차");
                      }}
                    >
                      차
                    </span>
                    <span
                      className="block px-4 py-2 text-sm cursor-pointer"
                      role="menuitem"
                      onClick={() => {
                        setGoal(wishInit);
                        handleCategorySelect("소원");
                      }}
                    >
                      소원
                    </span>
                  </div>
                </div>
              )}
            </div>
            <br />
            <br />

            {category === "집" && (
              <GoalHouse goal={goal} goalDetail={goal.detail as House} />
            )}
            {category === "차" && (
              <GoalCar goal={goal} goalDetail={goal.detail as Car} />
            )}
            {category === "소원" && (
              <GoalWish goal={goal} goalDetail={goal.detail as Wish} />
            )}
            {/* <GreenButton path={"/mypage/goal"} name={"목표 생성하기"} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
