import { useLocation } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useState } from "react";
import { GreenButton } from "../../components/ui/GreenButton";
import PhoneModal from "../../components/ui/PhoneModal";
import { Term } from "./ProductTermPage";

export const ProductTermDetailPage = () => {
  const id = 4;

  const location = useLocation();
  const { terms } = location.state;
  console.log(terms);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div>
          <div className="text-lg font-bold">적금 이름</div>
          <div className="bg-slate-200 h-[500px] overflow-y-auto border p-2">
            {terms.map((term: Term) => (
              <div key={term.id} className="bg-slate-200">
                <span className="text-customGreen text-lg font-bold">
                  {term.name}
                </span>
                <br />
                <span>{term.content}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setModalOpen(true)}>약관 동의</button>

          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-3 text-3xl text-center">📢</h2>
            <h2 className="mt-4 mb-4 text-xl font-bold text-center">
              진짜 가입할 거야?
            </h2>
            <GreenButton path={`/product/${id}/signup`} name={"확인했어요"} />
          </PhoneModal>
        </div>
      </div>
    </>
  );
};
