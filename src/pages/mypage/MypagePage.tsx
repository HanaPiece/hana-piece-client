import {
  SlArrowRight,
  SlBell,
  SlBookOpen,
  SlCalculator,
  SlPieChart,
  SlSettings,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export const MypagePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex m-10">
          <img src="/hana.png" alt="Hana Image" className="w-16 h-16"></img>
          <span className="m-4 text-xl font-bold">김하나</span>
        </div>

        <div>
          <div
            onClick={() => navigate("salary")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlCalculator className="mr-4 w-6 h-6" />
            월급관리
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
          <div
            onClick={() => navigate("account")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlBookOpen className="mr-4 w-6 h-6" />
            계좌 관리
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
          <div
            onClick={() => navigate("goal")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlPieChart className="mr-4 w-6 h-6" />
            목표 관리
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
          <div
            onClick={() => navigate("")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlBell className="mr-4 w-6 h-6" />
            알림 관리
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
          <div
            onClick={() => navigate("")}
            className="flex cursor-pointer border border-gray-300 m-2 p-2 hover:shadow-lg"
          >
            <SlSettings className="mr-4 w-6 h-6" />
            설정
            <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
          </div>
        </div>
      </div>
    </>
  );
};
