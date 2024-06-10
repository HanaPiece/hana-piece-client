import {
  SlArrowRight,
  SlBell,
  SlBookOpen,
  SlCalculator,
  SlPieChart,
  SlSettings,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export const MypagePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <>
      <div className="">
        <div className="flex bg-white p-10 mb-4">
          <img src="/hana.png" alt="Hana Image" className="w-16 h-16"></img>
          <span className="m-4 text-xl font-bold font-hana-m">{user.name} 님</span>
        </div>
        <div className="mx-8 mb-2 font-hana-m text-lg">메뉴</div>
        <div className="divide-y divide-solid m-5">
          <div
            onClick={() => navigate("salary")}
            className="grid grid-cols-10 cursor-pointer mt-2 p-2 hover:shadow-lg"
          >
            <div className="col-span-2 rounded-full bg-gray-200 w-8 h-8 items-center justify-center flex mr-5">
              <SlCalculator className="" />
            </div>
            <p className="col-span-6 flex justify-start items-center">월급관리</p>
            <div className="col-span-2 flex items-center justify-center">
              <SlArrowRight className="flex ml-auto mt-1 w-3 h-3" />
            </div>
          </div>
          <div
            onClick={() => navigate("account")}
            className="grid grid-cols-10 cursor-pointer pt-3 p-2 hover:shadow-lg"
          >
            <div className="col-span-2 rounded-full bg-gray-200 w-8 h-8 items-center justify-center flex mr-5">
              <SlBookOpen />
            </div>
            <p className="col-span-6 flex justify-start items-center">계좌관리</p>
            <div className="col-span-2 flex items-center justify-center">
              <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
            </div>
          </div>
          <div
            onClick={() => navigate("goal")}
            className="grid grid-cols-10 cursor-pointer pt-3 p-2 hover:shadow-lg"
          >
            <div className="col-span-2 rounded-full bg-gray-200 w-8 h-8 items-center justify-center flex mr-5">
              <SlPieChart />
            </div>
            <p className="col-span-6 flex justify-start items-center">목표 관리</p>
            <div className="col-span-2 flex items-center justify-center">
              <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
            </div>
          </div>
          <div
            onClick={() => navigate("")}
            className="grid grid-cols-10 cursor-pointer pt-3 p-2 hover:shadow-lg"
          >
            <div className="col-span-2 rounded-full bg-gray-200 w-8 h-8 items-center justify-center flex mr-5">
              <SlBell />
            </div>
            <p className="col-span-6 flex justify-start items-center">알림 관리</p>
            <div className="col-span-2 flex items-center justify-center">
              <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
            </div>
          </div>
          <div
            onClick={() => navigate("")}
            className="grid grid-cols-10 cursor-pointer pt-3 p-2 hover:shadow-lg"
          >
            <div className="col-span-2 rounded-full bg-gray-200 w-8 h-8 items-center justify-center flex mr-5">
              <SlSettings />
            </div>
            <p className="col-span-6 flex justify-start items-center">설정</p>
            <div className="col-span-2 flex items-center justify-center">
              <SlArrowRight className="ml-auto mt-1 w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
