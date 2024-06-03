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
        <div className="h-1 bg-gray-200">
          <div className="w-3/5 hana-color h-1"></div>
        </div>
        <div className="mx-7">
          <div className="text-lg font-bold mt-10">
            <div className="flex justify-center gap-x-3 my-10 items-center">
              <div>
                <div className='bg-gray-200 w-8 h-8 rounded-full grid place-items-center'>
                    <img src='\img-hana-symbol-m.png' alt='하나은행' className='w-9/12' />
                </div>
              </div>
              <p className="text-xl font-hana-cm">청년 주택드림 청약통장</p>
            </div>
          </div>
          <div className="bg-slate-200 h-[450px] overflow-y-auto border p-2">
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

          <button onClick={() => setModalOpen(true)} className="green-button mt-5">약관 동의</button>

          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-3 text-3xl text-center">✔️</h2>
            <h2 className="mt-4 mb-4 text-xl font-bold text-center">
              정말로 가입하시겠습니까?
            </h2>
            <div className="mb-5 mt-10">
              <GreenButton path={`/product/${id}/signup`} name={"확인했어요"} />
            </div>
          </PhoneModal>
        </div>
      </div>
    </>
  );
};
