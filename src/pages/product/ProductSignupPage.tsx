import { useEffect, useState } from "react";
import { Checkbox } from "../../components/ui/Checkbox";
import { TopLine } from "../../components/ui/TopLine";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useGoalsProducts } from "../../contexts/ProductContext";
import { API_BASE_URL } from "../../constants";

type Complete = {
  autoDebitAmount: number;
  autoDebitDay: number;
  maturityDate: string;
  interestRate: number;
};

export const ProductSignupPage = () => {
  const navigate = useNavigate();
  const { goalId, productId } = useParams();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { user } = useUser();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [productNm, setProductNm] = useState<string>("");
  const [termYear, setTermYear] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(1);
  const { updateProduct } = useGoalsProducts();

  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/accounts/saving`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            setAccountNumber(json["accountNumber"]);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();

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
            setProductNm(json["productNm"]);
            setTermYear(json["termYear"]);
            setInterestRate(json["interestRate"]);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  }, [productId, user.jwt]);

  const buttonClicked = () => {
    const autoDebitAmountElement = document.getElementById(
      "autoDebitAmount"
    ) as HTMLInputElement;
    const autoDebitDayElement = document.getElementById(
      "autoDebitDay"
    ) as HTMLInputElement;

    if (autoDebitAmountElement && autoDebitDayElement) {
      const autoDebitAmount = Number(autoDebitAmountElement.value);
      const autoDebitDay = Number(autoDebitDayElement.value);

      const currentDate = new Date();
      const year = currentDate.getFullYear() + termYear;
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = autoDebitDay.toString().padStart(2, "0");
      const maturityDate = `${year}-${month}-${day}`;
      const temp = `${year}${month}${day}`;

      const com: Complete = {
        autoDebitAmount,
        autoDebitDay,
        maturityDate,
        interestRate,
      };
      console.log(com);

      if (user.jwt) {
        (async function () {
          try {
            const response = await fetch(
              `${API_BASE_URL}/api/v1/products/enroll`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.jwt}`,
                },
                body: JSON.stringify({
                  userGoalId: goalId,
                  productId: productId,
                  contractPeriod: termYear,
                  initialAmount: 0,
                  autoDebitAmount: com.autoDebitAmount,
                  autoDebitDay: com.autoDebitDay,
                  maturityDate: temp,
                  autoRenewal: true,
                }),
              }
            );
            if (response.ok) {
              updateProduct(Number(goalId));
              navigate(`/product/${goalId}/${productId}/complete`, {
                state: { com },
              });
            }
          } catch (err) {
            if (err instanceof Error) {
              alert(`에러가 발생했습니다. (${err}`);
            }
          }
        })();
      }
    }
  };

  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div className="h-1 bg-gray-200">
          <div className="w-5/6 hana-color h-1"></div>
        </div>
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
            <p className="text-xl font-hana-cm">{productNm}</p>
          </div>
          <br />
          <div className="grid grid-cols-5 mb-10 gap-y-4">
            <label className="text-customGreen font-semibold col-span-2">
              가입 금액
            </label>
            <input
              type="text"
              className="bg-slate-300 col-span-3"
              id="autoDebitAmount"
            />

            <label className="text-customGreen font-semibold col-span-2">
              납부일
            </label>
            <input
              type="text"
              className="bg-slate-300 col-span-3"
              id="autoDebitDay"
            />

            <label className="text-customGreen font-semibold col-span-2">
              만기 설정
            </label>
            <input type="text" className="bg-slate-300 col-span-3" />

            <label className="text-customGreen font-semibold col-span-2">
              출금 계좌
            </label>
            <input
              type="text"
              className="bg-slate-300 col-span-3"
              value={accountNumber}
              disabled
            />
            <label className="text-customGreen font-semibold  col-span-2">
              자동이체 여부
            </label>
            <div className="col-span-2">
              <Checkbox
                checked={isChecked}
                onChange={setIsChecked}
                name="설정하기"
              />
            </div>
          </div>

          <button onClick={buttonClicked} className="green-button">
            적금 개설하기
          </button>
        </div>
      </div>
    </>
  );
};
