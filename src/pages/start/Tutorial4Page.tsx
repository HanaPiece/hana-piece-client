import { GreenButton } from "../../components/ui/GreenButton";
import { useUser } from "../../contexts/UserContext";

export const Tutorial4Page = () => {
  const { logout } = useUser();
  return (
    <>
      <div className="container flex items-center justify-center">
        <div className="text-center">
          <img
            src="hana.png"
            alt="Hana Picture"
            className="mx-auto mb-2 w-5/6 h-3/4"
          />
          <span className="text-customGreen text-xl font-bold">
            목표 달성을 위해 적금에 가입해요.
          </span>
          <button onClick={logout}>로그아웃</button>
          <GreenButton path={"/login"} name={"다음"} />
        </div>
      </div>
    </>
  );
};
