import { useNavigate, useParams } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useEffect, useState } from "react";
import PhoneModal from "../../components/ui/PhoneModal";
import { useUser } from "../../contexts/UserContext";
import { ProductDetailResponse } from "./ProductDetailPage";
import { API_BASE_URL } from "../../constants";

type Props = {
  name: string;
  content: string;
  onCheckboxChange: () => void;
};

const ProductTerm = ({ name, content, onCheckboxChange }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="p-2 bg-white border-customGreen border grid grid-cols-6 gap-4 cursor-pointer">
        <div>
          <input
            type="checkbox"
            onChange={onCheckboxChange}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 peer-checked:bg-customGreen"
          />
        </div>
        <div className="col-span-5">
          <div
            className=""
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {name}
          </div>
          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-4 text-xl font-bold text-center">{name}</h2>
            <div className="mt-4 text-center break-words overflow-auto border h-48">
              {content}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="green-button mt-5 mb-3"
            >
              확인했어요
            </button>
          </PhoneModal>
        </div>
      </div>
      <br />
    </>
  );
};

export const ProductTermPage = () => {
  const navigate = useNavigate();
  const [termsChecked, setTermsChecked] = useState<boolean[]>([false, false]);

  const { user } = useUser();
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailResponse>();

  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/products/${productId}`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setProduct(json);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  }, [productId, user.jwt]);

  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...termsChecked];
    updatedChecked[index] = !updatedChecked[index];
    setTermsChecked(updatedChecked);
  };

  const handleSubmit = () => {
    if (termsChecked.every((checked) => checked)) {
      navigate(`detail`);
    } else {
      alert("체크하렴"); //modal!!!!!!!!!!
    }
  };

  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div className="h-1 bg-gray-200">
          <div className="w-4/6 hana-color h-1"></div>
        </div>
        <div className="mx-7 mt-10">
          <div className="flex justify-center gap-x-3 my-10 items-center">
            <div>
              <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
                <img
                  src="\img-hana-symbol-m.png"
                  alt="하나은행"
                  className="w-9/12"
                />
              </div>
            </div>
            <p className="text-xl font-hana-cm">{product?.productNm}</p>
          </div>
          <br />
          <div>
            <ProductTerm
              name="적금 약관 동의"
              content={product?.contractTerms ?? "약관 내용"}
              onCheckboxChange={() => handleCheckboxChange(0)}
            />
            <ProductTerm
              name="예금자 보호법"
              content={product?.depositProtection ?? "예금자 보호법 내용"}
              onCheckboxChange={() => handleCheckboxChange(1)}
            />
          </div>
          <label className="text-customGreen font-semibold">이메일</label>
          <input type="text" className="m-3 bg-slate-300" /> <br />
          <p className="text-sm">
            [필수] 입력하신 이메일로 상품 이용약관 설명서가 발송됩니다.
          </p>
          <button onClick={handleSubmit} className="green-button mt-10">
            다음
          </button>
        </div>
      </div>
    </>
  );
};
