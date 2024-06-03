import { useLocation } from "react-router-dom";
import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

export const GoalDetailPage = () => {
  const location = useLocation();
  const { count } = location.state;
  const [category, setCategory] = useState<string>("fetch한 카테고리");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategorySelect = (category: string) => {
    setCategory(category);
    setIsOpen(false);
  };

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
              🚗🏠🙏🧙🪄
            </span>
          </div>

          <div className="mx-10 mb-5">
            <label className="text-customGreen font-bold text-lg">목표 카테고리</label>
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
                      onClick={() => handleCategorySelect("집")}
                    >
                      집
                    </span>
                    <span
                      className="block px-4 py-2 text-sm cursor-pointer"
                      role="menuitem"
                      onClick={() => handleCategorySelect("차")}
                    >
                      차
                    </span>
                    <span
                      className="block px-4 py-2 text-sm cursor-pointer"
                      role="menuitem"
                      onClick={() => handleCategorySelect("소원")}
                    >
                      소원
                    </span>
                  </div>
                </div>
              )}
            </div>
            <br />
            <br />

            <label className="text-customGreen font-bold text-lg">아파트 이름</label>
            <p className="border-b border-gray-400 h-8 mt-3 mb-5">아파트 이름</p>

            <label className="text-customGreen font-bold text-lg">아파트 평수</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
              value="28 평"
            />
            <label className="text-customGreen font-bold text-lg">달성목표일</label>
            <input
              type="date"
              className="w-full border-b border-gray-400 h-8 mt-3 mb-5"
              value="2024-05-29"
            />
            <label className="text-customGreen font-bold text-lg">예상 목표 달성 금액</label>
            <input
              type="text"
              className="w-full border-b border-gray-400 h-8 mt-3 mb-10"
              value="300000"
            />
            <GreenButton path={"/mypage/goal"} name={"저장"} />
          </div>
        </div>
      </div>
    </>
  );
};
