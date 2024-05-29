import { useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useState } from "react";
import PhoneModal from "../../components/ui/PhoneModal";

type Props = {
  name: string;
  content: string;
  onCheckboxChange: () => void;
};

const ProductTerm = ({ name, content, onCheckboxChange }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="p-2 m-2 bg-slate-300 grid grid-cols-6 gap-4 cursor-pointer">
        <div>
          <input type="checkbox" onChange={onCheckboxChange} />
        </div>
        <div className="col-span-5">
          <div
            className="font-bold text-customGreen"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {name}
          </div>
          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-3 text-3xl text-center">📢</h2>
            <h2 className="mt-4 text-xl font-bold text-center">{name}</h2>
            <h2 className="mt-4 text-center break-words">{content}</h2>
            <button onClick={() => setModalOpen(false)} className="border-2">
              확인했어요
            </button>
          </PhoneModal>
        </div>
      </div>
      <br />
    </>
  );
};

export type Term = {
  id: number;
  name: string;
  content: string;
};
const terms: Term[] = [
  {
    id: 1,
    name: "적금 약관동의",
    content:
      "product.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_t",
  },
  {
    id: 2,
    name: "예금자 보호법",
    content:
      "product.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_terms\nproduct.contract_termsproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_tproduct.contract_terms\nproduct.contract_t",
  },
];

export const ProductTermPage = () => {
  const navigate = useNavigate();
  const [termsChecked, setTermsChecked] = useState<boolean[]>([false, false]);

  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...termsChecked];
    updatedChecked[index] = !updatedChecked[index];
    setTermsChecked(updatedChecked);
  };

  const handleSubmit = () => {
    if (termsChecked.every((checked) => checked)) {
      navigate(`/product/${id}/term/detail`, { state: { terms } });
    } else {
      alert("체크하렴"); //modal!!!!!!!!!!
    }
  };
  const id = 4;
  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />

        <div>
          <div className="text-3xl font-bold">적금 이름</div>
          <br />
          <div>
            <ProductTerm
              name={terms[0].name}
              content={terms[0].content}
              onCheckboxChange={() => handleCheckboxChange(0)}
            />
            <ProductTerm
              name={terms[1].name}
              content={terms[1].content}
              onCheckboxChange={() => handleCheckboxChange(1)}
            />
          </div>
          <label className="text-customGreen font-semibold">이메일</label>
          <input type="text" className="m-3 bg-slate-300" /> <br />
          <span className="text-sm">
            [필수] 입력하신 이메일로 상품 이용약관 설명서가 발송됩니다.
          </span>
          <button onClick={handleSubmit} className="border-2 w-3/4">
            다음
          </button>
        </div>
      </div>
    </>
  );
};
