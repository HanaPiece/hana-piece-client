import { GreenButton } from "../../components/ui/GreenButton";

export const Tutorial1Page = () => {
  return (
    <>
      <div className="container flex items-center justify-center">
        <div className="text-center">
          <img
            src="/hana.png"
            alt="Hana Picture"
            className="mx-auto mb-2 w-5/6 h-3/4"
          />
          <span className="text-customGreen text-xl font-bold">
            지출 내역을 확인해요.
          </span>
          <GreenButton path={"/tutorial2"} name={"다음"} />
        </div>
      </div>
    </>
  );
};
