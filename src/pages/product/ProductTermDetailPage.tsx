import { useLocation, useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";

export const ProductTermDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, content } = location.state;
  const { pathname } = location;
  const previousPath = pathname.replace(/\/detail$/, "");

  const buttonClicked = () => {
    navigate(previousPath, { state: { agreed: true, name: name } });
  };

  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div>
          <div className="text-lg font-bold">적금 이름</div>
          <br />
          <div className="bg-slate-200 h-[500px] overflow-y-auto border p-2">
            <span className="text-customGreen text-lg font-bold">{name}</span>
            <span>{content}</span>
          </div>
          <button onClick={buttonClicked}>약관 동의</button>
        </div>
      </div>
    </>
  );
};
