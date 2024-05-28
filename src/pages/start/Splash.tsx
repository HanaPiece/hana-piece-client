import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tutorial1");
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);
  return (
    <>
      <div className="container flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4">
            <img src="hana.png" alt="Hana Picture" className="mx-auto mb-2" />
            <span className="text-customGreen text-xl font-bold">하나피스</span>
          </div>
          <span className=" text-gray-500 text-sm">@Copyright HanaPiece</span>
        </div>
      </div>
    </>
  );
};
