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
      <div className="container m-10">
        <TopLine name={"목표 관리"} />

        <div className="flex flex-col items-center">
          <div className=" bg-slate-200 mt-10 w-3/4 h-200 rounded-lg">
            <span className="text-sm text-customGreen font-bold p-5">
              목표 {count}
            </span>
            <br />
            <br />
            <span className="flex justify-center text-xl text-customGreen font-bold">
              목표 이름 다시 fetch 해오기~
            </span>
          </div>

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

            <label className="m-3 text-customGreen">아파트 이름</label>
            <br />
            <span className="m-3 bg-slate-100">아파트 이름</span>
            <br />
            <br />
            <label className="m-3 text-customGreen">아파트 평수</label>
            <br />
            <input
              type="text"
              className="m-3 bg-slate-100"
              value="original value"
            />
            <br />
            <br />
            <label className="m-3 text-customGreen">달성목표일</label>
            <br />
            <input
              type="text"
              className="m-3 bg-slate-100"
              value="original value"
            />
            <br />
            <br />
            <label className="m-3 text-customGreen">예상 목표 달성 금액</label>
            <br />
            <input
              type="text"
              className="m-3 bg-slate-100"
              value="original value"
            />
            <br />
            <br />
          </div>
          <GreenButton path={"/mypage"} name={"저장"} />
        </div>
      </div>
    </>
  );
};
