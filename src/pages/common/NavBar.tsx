import {
  SlWallet,
  SlCreditCard,
  SlUser,
  SlSocialDropbox,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-bar">
        <div className="sticky flex justify-between bottom-0 left-0 w-full">
          <div className={"nav-item"} onClick={() => navigate("/product")}>
            <SlSocialDropbox className="nav-icon" />
            <p className="text-xs flex-1 align-middle justify-center">상품</p>
          </div>
          <div className={"nav-item"} onClick={() => navigate("split")}>
            <SlWallet className="nav-icon" />
            <p className="text-xs">통장쪼개기</p>
          </div>
          <div className={"nav-item"} onClick={() => navigate("/home")}>
            <img src="/home.png" alt="Home Image" />
          </div>
          <div className={"nav-item"} onClick={() => navigate("/home")}>
            <SlCreditCard className="nav-icon" />
            <p className="text-xs">생활</p>
          </div>
          <div className={"nav-item"} onClick={() => navigate("/mypage")}>
            <SlUser className="nav-icon" />
            <p className="text-xs">마이페이지</p>
          </div>
        </div>
      </div>
    </>
  );
};
