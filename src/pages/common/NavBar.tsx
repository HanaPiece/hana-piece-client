import { useState } from "react";
// import { SlArrowRight } from "react-icons/sl";
import { SlBookOpen, SlWallet, SlCreditCard, SlUser } from "react-icons/sl";

export const NavBar = () => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index: number) => {
    setSelected(index);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="sticky flex justify-between bottom-0 left-0 w-full">
          <div
            className={`nav-item ${selected === 0 ? "selected" : ""}`}
            onClick={() => handleClick(0)}
          >
            <SlBookOpen className="nav-icon" />
            <p className="text-xs flex-1 align-middle justify-center">상품</p>
          </div>
          <div
            className={`nav-item ${selected === 1 ? "selected" : ""}`}
            onClick={() => handleClick(1)}
          >
            <SlWallet className="nav-icon" />
            <p className="text-xs">통장쪼개기</p>
          </div>
          <div
            className={`nav-item ${selected === 2 ? "selected" : ""}`}
            onClick={() => handleClick(2)}
          >
            <img src="/home.png" alt="Home Image" />
          </div>
          <div
            className={`nav-item ${selected === 3 ? "selected" : ""}`}
            onClick={() => handleClick(2)}
          >
            <SlCreditCard className="nav-icon" />
            <p className="text-xs">생활</p>
          </div>
          <div
            className={`nav-item ${selected === 4 ? "selected" : ""}`}
            onClick={() => handleClick(2)}
          >
            <SlUser className="nav-icon" />
            <p className="text-xs">마이페이지</p>
          </div>
        </div>
      </div>
    </>
  );
};
