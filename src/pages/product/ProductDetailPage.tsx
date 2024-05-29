import { TopLine } from "../../components/ui/TopLine";
import { Product } from "./ProductListPage";
import { GreenButton } from "../../components/ui/GreenButton";

const product: Product = {
  id: 1,
  name: "적금1",
  rate: 2.5,
  info: "적금와랄라라",
  term_year: 1,
  cautions: "주의사항",
  deposit_protection: "예적금 보호법",
  contract_terms: "적금 약관동의",
};
export const ProductDetailPage = () => {
  return (
    <>
      <div className="container">
        <TopLine name={"적금 상세 설명"} />
        <br />

        <div>
          <div className="text-3xl font-bold">{product.name}</div>
          <br />
          <div className="h-[500px] overflow-y-auto border p-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-bold text-customGreen">내용</div>
              <div>{product.info}</div>
              <div className="font-bold text-customGreen">이자율</div>
              <div>{product.rate}%</div>
              <div className="font-bold text-customGreen">주의사항</div>
              <div>{product.cautions}</div>
              <div className="font-bold text-customGreen">예금자 보호법</div>
              <div>{product.deposit_protection}</div>
              <div className="font-bold text-customGreen">적금 약관동의</div>
              <div>{product.contract_terms}</div>
            </div>
          </div>

          <GreenButton path={`/product/${product.id}/term`} name={"개설하기"} />
        </div>
      </div>
    </>
  );
};
