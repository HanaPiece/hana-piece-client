import { GreenButton } from "../../components/ui/GreenButton";

export const Tutorial2Page = () => {
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
            통장을 쪼개서 관리해요.
          </span>
          <GreenButton path={"/tutorial3"} name={"다음"} />
        </div>
      </div>
    </>
  );
};
