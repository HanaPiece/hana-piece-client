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
      <div className="nav-shadow-top-lg rounded-t-3xl w-full h-20 absolute bottom-0 bg-white">
        <div className="sticky flex justify-between bottom-0 left-0 w-full px-4">
          <div className="flex flex-col items-center justify-center nav-item" onClick={() => navigate("/product")}>
            <SlSocialDropbox className="nav-icon" />
            <p className="text-xs mt-1">상품</p>
          </div>
          <div className="flex flex-col items-center justify-center nav-item" onClick={() => navigate("/split")}>
            <SlWallet className="nav-icon" />
            <p className="text-xs mt-1">통장</p>
          </div>
          <div className="nav-item -mt-5" onClick={() => navigate("/home")}>
            <img src="/home.png" alt="Home Image" />
          </div>
          <div className="flex flex-col items-center justify-center nav-item" onClick={() => navigate("/life")}>
            <SlCreditCard className="nav-icon" />
            <p className="text-xs mt-1">생활</p>
          </div>
          <div className="flex flex-col items-center justify-center nav-item" onClick={() => navigate("/mypage")}>
            <SlUser className="nav-icon" />
            <p className="text-xs mt-1">마이페이지</p>
          </div>
        </div>
        <div className="h-1 bg-gray-200 w-28 m-auto"></div>
      </div>
    </>
  );
};
