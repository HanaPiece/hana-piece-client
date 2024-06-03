import { useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { useGoalsProducts } from "../../contexts/ProductContext";
import { useUser } from "../../contexts/UserContext";

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

export type recommendedProducts = {
  productId: number;
  productNm: string;
  termYear: number;
  interestRate: number;
};

export type enrolledProducts = {
  enrolledProductId: number;
  productNm: string;
};

export type ProductGetResponse = {
  recommendedProducts: recommendedProducts[];
  enrolledProducts: enrolledProducts[];
};

export type GoalProducts = {
  id: number;
  goal: string;
  products: Product[];
};

type Props = {
  product: recommendedProducts;
};

const Product = ({ product }: Props) => {
  const navigate = useNavigate();
  if (!product) return null; // product가 없을 경우 렌더링하지 않음
  const goToDetail = (product: recommendedProducts) => {
    navigate(`${product.productId}`);
  };
  return (
    <>
      <div
        onClick={() => goToDetail(product)}
        className="grid grid-cols-7 pl-2 py-2 pb-3 mb-3 items-center hover:bg-slate-100 cursor-pointer"
      >
        <div>
          <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
            <img
              src="src\assets\img-hana-symbol-m.png"
              alt="하나은행"
              className="w-9/12"
            />
          </div>
        </div>
        <div className="col-span-4">
          <p className="font-semibold">{product.productNm}</p>
          <p className="text-xs text-gray-400">
            기본 {product.interestRate}% ({product.termYear * 12}개월)
          </p>
        </div>
        <div className="col-span-2 flex justify-between place-items-center">
          <p className="text-red-500 font-semibold">
            최고 {product.interestRate}%
          </p>
          <SlArrowRight className="h-3" />
        </div>
      </div>
    </>
  );
};

export const ProductListPage = () => {
  const { user } = useUser();
  const { goalsProducts, setProduct } = useGoalsProducts();
  let { goalId } = useParams();
  if (goalId === undefined) {
    goalId = "";
  }
  const goalProduct = goalsProducts?.goalsProducts?.find(
    (gp) => gp.goal.userGoalId === +goalId
  );
  useEffect(() => {
    console.log(goalId);
    console.log(goalProduct);
    if (goalProduct && goalProduct.products.length === 0) {
      if (user.jwt) {
        (async function () {
          try {
            const response = await fetch(
              `http://172.16.20.217:8080/api/v1/products/recommend/${goalId}`,
              {
                method: "get",
                headers: {
                  Authorization: `Bearer ${user.jwt}`,
                },
              }
            );
            if (response.ok) {
              const json: ProductGetResponse = await response.json();
              console.log(json);
              const products: recommendedProducts[] = json.recommendedProducts;
              setProduct(+goalId, products);
            }
          } catch (err) {
            if (err instanceof Error) {
              alert(`에러가 발생했습니다. (${err}`);
            }
          }
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalId, user.jwt]);

  return (
    <>
      <div className="p-4 container">
        <h1 className="text-2xl font-bold mb-4 ml-2 font-hana-b">상품</h1>
        <div className="flex justify-between rounded-2xl bg-white shadow-md p-3 px-5 mb-8">
          <div>
            <p className="font-bold" style={{ fontSize: "16px" }}>
              적금 상품 추천
            </p>
            <p className="text-sm mt-2">
              김하나님의 목표에 따라서
              <br />
              적합한 적금을 추천해 드릴게요!
            </p>
          </div>
          <div className="flex justify-center items-cneter text-4xl place-items-center font-hana-b">
            ☝️
          </div>
        </div>

        <div className="h-[500px] overflow-y-auto p-2">
          {goalProduct?.products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
