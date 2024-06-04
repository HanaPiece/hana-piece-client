import { TopLine } from "../../components/ui/TopLine";
import { GreenButton } from "../../components/ui/GreenButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export type ProductDetailResponse = {
  productId: number;
  productNm: string;
  interestTypeCd: string;
  interestRate: number;
  imageUrl: string;
  info: string;
  termYear: number;
  cautions: string;
  depositProtection: string;
  contractTerms: string;
};

export const ProductDetailPage = () => {
  const [guide, setGuide] = useState<number>(1);
  const { user } = useUser();
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailResponse>();
  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `http://172.16.20.217:8080/api/v1/products/${productId}`,
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
  return (
    <>
      <div className="container">
        <TopLine name={"적금 상세 설명"} />
        <div className="h-1 bg-gray-200">
          <div className="w-2/5 hana-color h-1"></div>
        </div>
        <br />

        <div className="mx-7">
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
          <div className="grid grid-cols-2 text-bold text-center pb-3 cursor-pointer">
            <div
              className={`px-4 py-2 ${
                guide === 1
                  ? "border-customGreen border-b-2 font-bold text-customGreen"
                  : "border-gray-200 border-b-22"
              }`}
              onClick={() => setGuide(1)}
            >
              상품 안내
            </div>
            <div
              className={`px-4 py-2 ${
                guide === 2
                  ? "border-customGreen border-b-2 font-bold text-customGreen"
                  : "border-gray-200 border-b-2"
              }`}
              onClick={() => setGuide(2)}
            >
              금리 안내
            </div>
          </div>
          <div className="h-[400px] overflow-y-auto p-5 mb-5 rounded-xl border bg-white shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-bold text-customGreen">내용</div>
              <div>{product?.info}</div>
              <div className="font-bold text-customGreen">이자율</div>
              <div>{product?.interestRate}%</div>
              <div className="font-bold text-customGreen">주의사항</div>
              <div>{product?.cautions}</div>
              <div className="font-bold text-customGreen">예금자 보호법</div>
              <div>{product?.depositProtection}</div>
              <div className="font-bold text-customGreen">적금 약관동의</div>
              <div>{product?.contractTerms}</div>
            </div>
          </div>

          <GreenButton path={`term`} name={"적금 개설하기"} />
        </div>
      </div>
    </>
  );
};
