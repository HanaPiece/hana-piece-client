import { useEffect, useState } from "react";
import { TopLine } from "../../../components/ui/TopLine";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

type GetSalaryResponse = {
  accountId: number;
  accountNumber: string;
  salary: number;
  salaryDay: number;
};

export const SalaryPage = () => {
  const navigate = useNavigate();
  const { user, updateSalary } = useUser();
  const [salary, setSalary] = useState<GetSalaryResponse | null>(null);
  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `http://172.16.20.217:8080/api/v1/accounts/salary`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            const res: GetSalaryResponse = {
              accountId: json["accountId"],
              accountNumber: json["accountNumber"],
              salary: json["salary"],
              salaryDay: json["salaryDay"],
            };
            setSalary(res);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  }, [user.jwt]);

  const buttonClicked = () => {
    const salaryElement = document.getElementById("salary") as HTMLInputElement;
    const salaryDayElement = document.getElementById(
      "salaryDay"
    ) as HTMLInputElement;

    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `http://172.16.20.217:8080/api/v1/users/salary`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
              body: JSON.stringify({
                newSalary: salaryElement.value,
                newSalaryDay: salaryDayElement.value,
              }),
            }
          );
          if (response.ok) {
            updateSalary(salaryElement.value);
            navigate(`/mypage`);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  };
  return (
    <>
      <div className="container m-10">
        <TopLine name={"월급 관리"} />

        <h3 className="font-hana-m ml-10 mt-20 text-3xl">월급 정보</h3>
        <div className="m-5 rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-3 p-7">
            <label className="m-3 text-customGreen font-semibold col-span-1">
              은행 이름
            </label>
            <span className="m-3 bg-slate-100 col-span-2">하나은행</span>

            <label className="m-3 text-customGreen font-semibold col-span-1">
              계좌 번호
            </label>
            <span className="m-3 bg-slate-100 col-span-2">
              {salary?.accountNumber}
            </span>

            <label className="m-3 text-customGreen font-semibold col-span-1">
              월급 설정
            </label>
            <input
              type="text"
              className="m-3 bg-slate-100 col-span-2"
              value={salary?.salary}
              id="salary"
            />

            <label className="m-3 text-customGreen font-semibold col-span-1">
              월급 날짜
            </label>
            <input
              type="text"
              className="m-3 bg-slate-100 col-span-2"
              value={salary?.salaryDay}
              id="salaryDay"
            />
            <div className="col-span-3 mt-10">
              <button onClick={buttonClicked}>저장</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
