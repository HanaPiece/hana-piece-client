import { useEffect, useState } from "react";
import { TopLine } from "../../components/ui/TopLine";
import { Ratio } from "./SplitMainPage";
import { Checkbox } from "../../components/ui/Checkbox";
import { useUser } from "../../contexts/UserContext";
import { API_BASE_URL } from "../../constants";
import { FetchOptions } from "../../hooks/fetch";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ui/Modal";

export const SplitAutoPage = () => {
  const [mode, setMode] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const [accountAutoDebitId, setAccountAutoDebitId] = useState<Ratio>({
    saving: 0,
    life: 0,
    reserve: 0,
  });
  const navigate = useNavigate();
  const [ratio, setRatio] = useState<Ratio>({
    saving: 50,
    life: 23,
    reserve: 27,
  });

  const { user } = useUser();
  const salary = Number(user.salary);

  useEffect(() => {
    let type: string = "";
    if (mode) type = "lux";
    else type = "save";

    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/accounts/auto-debit/suggestions/${type}`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            setRatio({
              saving: json["saving"],
              life: json["life"],
              reserve: json["reserve"],
            });
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  }, [user.jwt, mode]);

  const calcAmount = (ratio: number, salary: number): number => {
    return 0.01 * ratio * salary;
  };

  // 사용자 계좌 가져오기
  const getAccounts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/accounts/auto-debit/adjust`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: AccountAutoDebitAdjustGetResponse[] = await response.json();
      const testData = setAccountId(data);
      setAccountAutoDebitId(testData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // 타입별 통장 번호 저장
  const setAccountId = (
    accounts: AccountAutoDebitAdjustGetResponse[]
  ): Ratio => {
    let saving = 0;
    let life = 0;
    let reserve = 0;
    accounts.forEach((account) => {
      if (account.accountType === "SAVING") {
        saving = account.accountAutoDebitId;
      } else if (account.accountType === "LIFE") {
        life = account.accountAutoDebitId;
      } else if (account.accountType === "SPARE") {
        reserve = account.accountAutoDebitId;
      }
    });

    return {
      saving: saving,
      life: life,
      reserve: reserve,
    };
  };

  useEffect(() => {
    if (
      accountAutoDebitId.saving !== 0 &&
      accountAutoDebitId.life !== 0 &&
      accountAutoDebitId.reserve !== 0
    ) {
      setAutoDebit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountAutoDebitId]);

  // 통장 쪼개기 (자동이체 설정)
  const setAutoDebit = async () => {
    const postOptions: FetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        savingAccountAutoDebitId: accountAutoDebitId.saving,
        savingAutoDebitAmount: calcAmount(ratio.saving, salary),
        lifeAccountAutoDebitId: accountAutoDebitId.life,
        lifeAutoDebitAmount: calcAmount(ratio.life, salary),
        spareAccountAutoDebitId: accountAutoDebitId.reserve,
        spareAutoDebitAmount: calcAmount(ratio.reserve, salary),
      }),
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/accounts/auto-debit/adjust`,
        postOptions
      );
      if (!response.ok) {
        console.error("Failed to set account types");
      } else {
        setModalOpen(false);
        setCheckModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <TopLine name={""} />
      <div className="mb-10 mx-10 mt-5">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl">
              <span className="text-green-600 mr-2">{user.name}</span>님을 위한
              <br />
              통장 쪼개기 추천 비율
            </h3>
            <div>
              <img src="/byul5.png" className="w-20" alt="하나은행" />
            </div>
          </div>
          <p className="text-gray-400 text-xs">
            최근 한 달간 소비 패턴을 분석해서 추천해드렸어요
          </p>
        </div>
        <div className="mt-5">
          <div className="w-full flex h-5 rounded-full bg-gray-300">
            <div
              style={{ width: `${ratio.saving}%` }}
              className="h-5 rounded-s-full bg-lime-200 text-center text-sm"
            >
              {ratio.saving}%
            </div>
            <div
              style={{ width: `${ratio.life}%` }}
              className="h-5 bg-yellow-300 text-center text-sm"
            >
              {ratio.life}%
            </div>
            <div
              style={{ width: `${ratio.reserve}%` }}
              className="h-5 rounded-e-full bg-rose-300 text-center text-sm"
            >
              {ratio.reserve}%
            </div>
          </div>
          <div className="flex mt-5 gap-x-3 justify-start items-center">
            <div className="w-3 h-3 bg-lime-200 rounded-full"></div>
            <div className="text-xs">저축</div>
            <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
            <div className="text-xs">생활비</div>
            <div className="w-3 h-3 bg-rose-300 rounded-full"></div>
            <div className="text-xs">예비비</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-x-2 rounded-xl text-center font-hana-m">
            <div
              className={`flex items-center p-1 place-content-center border-2 rounded-xl cursor-pointer ${
                mode === true
                  ? " border-customGreen bg-green-50"
                  : " border-gray-300"
              }`}
              onClick={() => setMode(true)}
            >
              <Checkbox checked={mode} onChange={setMode} name={""} />
              럭셔리 모드
            </div>
            <div
              className={`flex items-center p-1 place-content-center border-2 rounded-xl cursor-pointer ${
                mode === false
                  ? "border-customGreen bg-green-50"
                  : "border-gray-300"
              }`}
              onClick={() => setMode(false)}
            >
              <Checkbox checked={!mode} onChange={setMode} name={""} />
              짠돌이 모드
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💰저축 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.saving}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-center">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {(Number(user.salary) * 0.01 * ratio.saving).toLocaleString()}
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💳소비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">{ratio.life}%</div>
              <div className="font-semibold text-gray-400 text-sm text-center">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {(Number(user.salary) * 0.01 * ratio.life).toLocaleString()}
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          <div>
            <h3 className="font-bold text-gray-400 text-md">💡예비 통장</h3>
            <div className="grid grid-cols-7 items-end mt-1">
              <div className="font-semibold text-gray-400 text-sm align-bottom">
                비율
              </div>
              <div className="col-span-2 text-2xl font-bold">
                {ratio.reserve}%
              </div>
              <div className="font-semibold text-gray-400 text-sm text-center">
                매달
              </div>
              <div className="col-span-3 text-2xl font-bold text-right">
                {(Number(user.salary) * 0.01 * ratio.reserve).toLocaleString()}
                <span className="text-lg">원</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-gray-200 border-0 w-16 mx-auto my-8 h-px" />
        <button className="green-button" onClick={() => setModalOpen(true)}>
          이대로 설정하기
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="mt-3 text-3xl text-center">✔️</h2>
          <h2 className="mt-4 mb-4 text-xl font-bold text-center">
            정말로 변경하시겠습니까?
          </h2>
          <div className="mt-10">
            <button className="green-button" onClick={() => getAccounts()}>
              확인
            </button>
          </div>
        </Modal>
        <Modal isOpen={isCheckModalOpen} onClose={() => navigate("/split")}>
          <h2 className="mt-3 text-3xl text-center">✔️</h2>
          <h2 className="mt-4 mb-4 text-xl font-bold text-center">
            변경되었습니다.
          </h2>
          <div className="mt-10">
            <button className="green-button" onClick={() => navigate("/split")}>
              확인
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
