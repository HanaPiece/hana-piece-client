import { useEffect } from "react";
import { useGoalsProducts } from "../../contexts/ProductContext";
import { useUser } from "../../contexts/UserContext";
import { ProductGetResponse } from "../product/ProductListPage";
import { API_BASE_URL } from "../../constants";
import { LoadingPage } from "../LoadingPage";

const calcExpectedAmount = (
  years: number,
  annualInterestRate: number,
  monthlySavings: number
): string => {
  const months = years * 12;
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  let totalAmount = 0;

  for (let i = 0; i < months; i++) {
    totalAmount += monthlySavings;
    totalAmount *= 1 + monthlyInterestRate;
  }

  return (Math.floor(totalAmount / 100) * 100).toLocaleString();
};

const GoalProductRecommend = ({ goalId }: { goalId: number }) => {
  const { user } = useUser();
  const { goalsProducts, setProduct } = useGoalsProducts();
  const goalProduct = goalsProducts?.goalsProducts?.find(
    (gp) => gp.goal.userGoalId === +goalId
  );

  useEffect(() => {
    if (goalProduct && goalProduct.products.recommendedProducts.length === 0) {
      if (user.jwt) {
        (async function () {
          try {
            const response = await fetch(
              `${API_BASE_URL}/api/v1/products/recommend/${goalId}`,
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
              setProduct(+goalId, json);
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
      <div className="mt-5">
        <h2 className="font-bold text-lg">
          아직 하나은행 적금이 없으시네요🥲 <br />
          다음 상품을 추천드려요
        </h2>
      </div>
      <div className="mt-3 mb-8">
        <p className="text-gray-400 text-sm mb-1">
          설정 목표와 관련된 추천 적금
        </p>
        <p className="text-sm font-bold">오늘 가입한다면?</p>
      </div>
      {goalProduct?.products &&
      goalProduct.products.recommendedProducts.length > 0 ? (
        <>
          <div>
            <div className="shadow-xl p-4 my-3 rounded-2xl bg-white">
              <div className="grid grid-cols-6 gap-1">
                <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
                  <img
                    src="/img-hana-symbol-m.png"
                    alt="하나은행"
                    className="w-9/12"
                  />
                </div>
                <div className="col-span-5 pt-1 hana-text-color font-bold">
                  {goalProduct.products.recommendedProducts[0]?.productNm ||
                    "상품명이 없습니다"}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-1 my-4 gap-y-2">
                <div className="text-xs text-lime-600 font-bold">기간</div>
                <div className="text-xs">
                  {goalProduct.products.recommendedProducts[0]?.termYear ||
                    "기간 정보 없음"}
                  년
                </div>
                <div></div>
                <div className="text-xs text-lime-600 font-bold">이자</div>
                <div className="text-xs">
                  <span className="text-red-600">
                    {goalProduct.products.recommendedProducts[0]
                      ?.interestRate || "이자율 없음"}
                  </span>
                  %
                </div>
                <div className="text-xs text-lime-600 font-bold">예상금액</div>
                <div className="col-span-4 text-xs">
                  <p>
                    매달 10만원씩 적금한다면
                    <span className="text-red-600">
                      {` ${calcExpectedAmount(
                        goalProduct.products.recommendedProducts[0]?.termYear,
                        goalProduct.products.recommendedProducts[0]
                          ?.interestRate,
                        100000
                      )}`}
                    </span>
                    원
                  </p>
                  <p>
                    매달 100만원씩 적금한다면
                    <span className="text-red-600">
                      {` ${calcExpectedAmount(
                        goalProduct.products.recommendedProducts[0]?.termYear,
                        goalProduct.products.recommendedProducts[0]
                          ?.interestRate,
                        1000000
                      )}`}
                    </span>
                    원
                  </p>
                </div>
              </div>
            </div>
          </div>
          {goalProduct.products.recommendedProducts[1] && (
            <div>
              <div className="shadow-xl p-4 my-6 rounded-2xl bg-white">
                <div className="grid grid-cols-6 gap-1">
                  <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
                    <img
                      src="/img-hana-symbol-m.png"
                      alt="하나은행"
                      className="w-9/12"
                    />
                  </div>
                  <div className="col-span-5 pt-1 hana-text-color font-bold">
                    {goalProduct.products.recommendedProducts[1]?.productNm ||
                      "상품명이 없습니다"}
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-1 my-4 gap-y-2">
                  <div className="text-xs text-lime-600 font-bold">기간</div>
                  <div className="text-xs">
                    {goalProduct.products.recommendedProducts[1]?.termYear ||
                      "기간 정보 없음"}
                    년
                  </div>
                  <div></div>
                  <div className="text-xs text-lime-600 font-bold">이자</div>
                  <div className="text-xs">
                    <span className="text-red-600">
                      {goalProduct.products.recommendedProducts[1]
                        ?.interestRate || "이자율 없음"}
                    </span>
                    %
                  </div>
                  <div className="text-xs text-lime-600 font-bold">
                    예상금액
                  </div>
                  <div className="text-xs col-span-4">
                    <p>
                      매달 10만원씩 적금한다면
                      <span className="text-red-600">
                        {` ${calcExpectedAmount(
                          goalProduct.products.recommendedProducts[1]?.termYear,
                          goalProduct.products.recommendedProducts[0]
                            ?.interestRate,
                          100000
                        )}`}
                      </span>
                      원
                    </p>
                    <p>
                      매달 100만원씩 적금한다면
                      <span className="text-red-600">
                        {` ${calcExpectedAmount(
                          goalProduct.products.recommendedProducts[1]?.termYear,
                          goalProduct.products.recommendedProducts[0]
                            ?.interestRate,
                          1000000
                        )}`}
                      </span>
                      원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default GoalProductRecommend;
