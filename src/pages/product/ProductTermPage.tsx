import { GreenButton } from "../../components/ui/GreenButton";
import { TopLine } from "../../components/ui/TopLine";

type Props = {
  name: string;
  content: string;
};

const ProductTerm = ({ name, content }: Props) => {
  return (
    <>
      <div className="p-2 m-2 bg-slate-300 grid grid-cols-6 gap-4">
        <div className="">
          <input type="checkbox" required />
        </div>
        <div className="col-span-5">
          <div className="font-bold text-customGreen">{name}</div>
          <div>{content}</div>
        </div>
      </div>
      <br />
    </>
  );
};

export const ProductTermPage = () => {
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
            />
            <ProductTerm
              name="예금자 보호법"
              content="product.contract_terms\nproduct.contract_terms\nproduct.contract_terms"
            />
          </div>
          <label className="text-customGreen font-semibold">이메일</label>
          <input type="text" className="m-3 bg-slate-300" /> <br />
          <text className="text-sm">
            [필수] 입력하신 이메일로 상품 이용약관 설명서가 발송됩니다.
          </text>
          <GreenButton path={`/product/${id}/signup`} name={"다음"} />
        </div>
      </div>
    </>
  );
};
