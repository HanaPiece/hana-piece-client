import { GreenButton } from "../../components/ui/GreenButton";

export const Tutorial3Page = () => {
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
            저축 목표를 설정해요.
          </span>
          <GreenButton path={"/tutorial4"} name={"다음"} />
        </div>
      </div>
    </>
  );
};
