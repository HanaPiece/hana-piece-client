import { GreenButton } from "../../components/ui/GreenButton";

export const Tutorial4Page = () => {
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
          <GreenButton path={"/login"} name={"다음"} />
        </div>
      </div>
    </>
  );
};
