import { useEffect, useState } from "react";
import { TopLine } from "../../../components/ui/TopLine";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../constants";

type GetSalaryResponse = {
  accountId: number;
  accountNumber: string;
  salary: number;
  salaryDay: number;
};

export const SalaryPage = () => {
  const navigate = useNavigate();
  const { user, updateSalary } = useUser();
  const [salaryInfo, setSalaryInfo] = useState<GetSalaryResponse | null>(null);
  const [newSalary, setNewSalary] = useState<string>("");
  const [newSalaryDay, setNewSalaryDay] = useState<string>("");

  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/accounts/salary`,
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
            setSalaryInfo(res);
            setNewSalary(res.salary.toString());
            setNewSalaryDay(res.salaryDay.toString());
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
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/users/salary`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
              body: JSON.stringify({
                newSalary: newSalary,
                newSalaryDay: newSalaryDay,
              }),
            }
          );
          if (response.ok) {
            updateSalary(newSalary);
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
              {salaryInfo?.accountNumber}
            </span>

            <label className="m-3 text-customGreen font-semibold col-span-1">
              월급 설정
            </label>
            <input
              type="text"
              className="m-3 bg-slate-100 col-span-2"
              value={newSalary}
              id="salary"
              onChange={(e) => setNewSalary(e.target.value)}
            />

            <label className="m-3 text-customGreen font-semibold col-span-1">
              월급 날짜
            </label>
            <input
              type="text"
              className="m-3 bg-slate-100 col-span-2"
              value={newSalaryDay}
              id="salaryDay"
              onChange={(e) => setNewSalaryDay(e.target.value)}
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
