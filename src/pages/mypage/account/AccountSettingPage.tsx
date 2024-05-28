import { SlArrowRight, SlBookOpen } from "react-icons/sl";
import { TopLine } from "../../../components/ui/TopLine";
import { useNavigate } from "react-router-dom";

export const AccountSettingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <TopLine name={"계좌 관리"} />
        <div>
          <div
            onClick={() => navigate("open")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlBookOpen className="mr-4 w-6 h-6" />
            입출금 통장
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
          <div
            onClick={() => navigate("saving")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlBookOpen className="mr-4 w-6 h-6" />
            적금 통장
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
        </div>
      </div>
    </>
  );
};
