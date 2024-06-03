import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product, GoalProducts } from "../../types/ProductType";

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

export const ProductItem = ({ product }: Props) => {
  const navigate = useNavigate();
  if (!product) return null; // product가 없을 경우 렌더링하지 않음
  const goToDetail = (product: Product) => {
    navigate(`/product/${product.id}/goal`, { state: product });
  };
  return (
    <>
      <div
        onClick={() => goToDetail(product)}
        className="product-item cursor-pointer border border-gray-300 m-2 p-2 w-36 hover:shadow-lg"
      >
        <div className="text-center text-sm">{product.name}</div>
        <div className="text-center text-sm">{product.term_year}</div>
        <div className="text-center text-sm">{product.rate}</div>
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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">적금 상품 추천</h1>
        <div className="flex space-x-2 mb-4">
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
        <div className="h-[500px] overflow-y-auto border p-2">
          {selectedGoalProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
