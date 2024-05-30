import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export type Product = {
  id: number;
  name: string;
  rate: number;
  info: string;
  term_year: number;
  cautions: string;
  deposit_protection: string;
  contract_terms: string;
};

export type GoalProducts = {
  id: number;
  goal: string;
  products: Product[];
};

type Props = {
  product: Product;
};

const products: Product[] = [
  {
    id: 1,
    name: "적금1",
    rate: 2.5,
    info: "적금와랄라라",
    term_year: 1,
    cautions: "주의사항",
    deposit_protection: "예적금 보호법",
    contract_terms: "적금 약관동의",
  },
  {
    id: 2,
    name: "적금2",
    rate: 2.3,
    info: "적금와랄라라",
    term_year: 2,
    cautions: "주의사항",
    deposit_protection: "예적금 보호법",
    contract_terms: "적금 약관동의",
  },
  {
    id: 3,
    name: "적금3",
    rate: 2.2,
    info: "적금와랄라라",
    term_year: 1,
    cautions: "주의사항",
    deposit_protection: "예적금 보호법",
    contract_terms: "적금 약관동의",
  },
  {
    id: 4,
    name: "적금4",
    rate: 2.2,
    info: "적금와랄라라",
    term_year: 1,
    cautions: "주의사항",
    deposit_protection: "예적금 보호법",
    contract_terms: "적금 약관동의",
  },
  {
    id: 5,
    name: "적금5",
    rate: 2.2,
    info: "적금와랄라라",
    term_year: 1,
    cautions: "주의사항",
    deposit_protection: "예적금 보호법",
    contract_terms: "적금 약관동의",
  },
  {
    id: 6,
    name: "적금6",
    rate: 2.2,
    info: "적금와랄라라",
    term_year: 1,
    cautions: "주의사항",
    deposit_protection: "예적금 보호법",
    contract_terms: "적금 약관동의",
  },
];

const goalProducts: GoalProducts[] = [
  { id: 1, goal: "소원", products: products },
  { id: 2, goal: "집", products: products },
  { id: 3, goal: "차", products: products },
];

const Product = ({ product }: Props) => {
  const navigate = useNavigate();
  if (!product) return null; // product가 없을 경우 렌더링하지 않음
  const goToDetail = (product: Product) => {
    navigate(`/product/${product.id}/goal`, { state: product });
  };
  return (
    <>
      <div
        onClick={() => goToDetail(product)}
        className="grid grid-cols-7 pl-2 py-2 pb-3 mb-3 items-center hover:bg-slate-100 cursor-pointer"
      >
        <div>
          <div className='bg-gray-200 w-8 h-8 rounded-full grid place-items-center'>
              <img src='src\assets\img-hana-symbol-m.png' alt='하나은행' className='w-9/12' />
          </div>
        </div>
        <div className="col-span-4">
          <p className="font-semibold">{product.name}</p>
          <p className="text-xs text-gray-400">기본 {product.rate}% ({product.term_year*12}개월)</p>
        </div>
        <div className="col-span-2 flex justify-between place-items-center">
          <p className="text-red-500 font-semibold">최고 {product.rate}%</p>
          <SlArrowRight className="h-3" />
        </div>
      </div>
    </>
  );
};

export const ProductListPage = () => {
  const [selectedGoal, setSelectedGoal] = useState<number>(goalProducts[0].id);

  const handleGoalClick = (goalId: number) => {
    setSelectedGoal(goalId);
  };

  //Products[]
  const selectedGoalProducts =
    goalProducts.find((goal) => goal.id === selectedGoal)?.products || [];

  return (
    <>
      <div className="p-4 ">
        <h1 className="text-2xl font-bold mb-4 ml-2 font-hana-b">상품</h1>
        <div className="flex justify-between rounded-2xl bg-white shadow-md p-3 px-5 mb-8">
          <div>
            <p className="font-bold" style={{ fontSize: '16px' }}>적금 상품 추천</p>
            <p className="text-sm mt-2">김하나님의 목표에 따라서<br />적합한 적금을 추천해 드릴게요!</p>
          </div>
          <div className="flex justify-center items-cneter text-4xl place-items-center font-hana-b">☝️</div>
        </div>
        <div className="flex space-x-2 mb-4 justify-center gap-x-2">
          {goalProducts.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)}
              className={`px-4 py-2 rounded ${
                selectedGoal === goal.id
                  ? "bg-customGreen text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {goal.goal}
            </button>
          ))}
        </div>
        <div className="h-[500px] overflow-y-auto p-2">
          {selectedGoalProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
