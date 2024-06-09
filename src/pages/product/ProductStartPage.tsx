import { useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";

export const ProductStartPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopLine name={""} />
      <div className="m-7">
        <div className="mt-10 text-center m-auto">
          <img src="/logo-eng.png" alt="하나피스" className="w-1/4 m-auto" />
          <p className="text-2xl font-hana-b mt-10">목표 달성을 위한<br />맞춤형 <span className="text-customGreen">적금 추천</span></p>
        </div>

        <div className="flex flex-col space-y-6 p-6 mt-5 mb-10">
          <div className="relative flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">1</div>
            <div className="text">
              원하는 목표를 선택하고<br />
              <span className="text-gray-500 text-xs">(만들어져 있는 목표 중에 선택할 수 있어요!)</span>
            </div>
            <div className="absolute top-10 w-0.5 h-12 bg-gray-300"></div>
          </div>
          <div className="relative flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">2</div>
            <div>맞춤형 적금 추천을 확인하고</div>
            <div className="absolute top-8 w-0.5 h-6 bg-gray-300"></div>
          </div>
          <div className="relative flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">3</div>
            <div>원하는 적금을 선택하면</div>
            <div className="absolute top-8 w-0.5 h-6 bg-gray-300"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">4</div>
            <div>적금 개설 완료!</div>
          </div>
        </div>

        <button className="green-button" onClick={()=>navigate("/product")}>추천 받으러 가기</button>
      </div>
    </>
  );
};
