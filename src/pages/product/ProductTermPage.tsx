import { useNavigate } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useState } from "react";

type Props = {
  name: string;
  content: string;
  onCheckboxChange: () => void;
};

const ProductTerm = ({ name, content, onCheckboxChange }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="p-2 m-2 bg-slate-300 grid grid-cols-6 gap-4 cursor-pointer"
        onClick={() => navigate("detail", { state: { name, content } })}
      >
        <div>
          <input type="checkbox" onChange={onCheckboxChange} disabled />
        </div>
        <div className="col-span-5">
          <div className="font-bold text-customGreen">{name}</div>
          <div className="break-words">{content}</div>
        </div>
      </div>
      <br />
    </>
  );
};

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
      navigate(`/product/${id}/signup`);
    } else {
      alert("체크하렴"); //modal!!!!!!!!!!
    }
  };
  const id = 4;
  return (
    <>
      <div>
        <TopLine name={"적금 개설"} />

        <div>
          <div className="text-3xl font-bold">적금 이름</div>
          <br />
          <div>
            <ProductTerm
              name="적금 약관동의"
              content="product.contract_terms\nproduct.contract_terms\nproduct.contract_terms"
              onCheckboxChange={() => handleCheckboxChange(0)}
            />
            <ProductTerm
              name="예금자 보호법"
              content="product.contract_terms\nproduct.contract_terms\nproduct.contract_terms"
              onCheckboxChange={() => handleCheckboxChange(1)}
            />
          </div>
          <label className="text-customGreen font-semibold">이메일</label>
          <input type="text" className="m-3 bg-slate-300" /> <br />
          <text className="text-sm">
            [필수] 입력하신 이메일로 상품 이용약관 설명서가 발송됩니다.
          </text>
          <button onClick={handleSubmit} className="border-2 w-3/4">
            다음
          </button>
        </div>
      </div>
    </>
  );
};
