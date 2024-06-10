import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../hooks/fetch";
import { UserGoalAccountGetResponse } from "./homeType";
import { GreenButton } from "../../components/ui/GreenButton";
import GoalProductRecommend from "./GoalProductRecommend";

type Props = {
  count: number;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
};

const GoalProduct = ({ count, name, isSelected, onSelect }: Props) => {
  return (
    <div
      onClick={onSelect}
      className={`flex p-4 mb-2 rounded-lg bg-white shadow-sm cursor-pointer border border-gray-300 hover:shadow-md ${
        isSelected ? "border-lime-500 border-4" : "border-gray-300"
      }`}
    >
      <span className="text-sm text-customGreen font-bold">적금 {count}</span>
      <span className="ml-5">{name}</span>
    </div>
  );
};

export const GoalProductSelectPage = () => {
  const { user } = useUser();
  const { goalId } = useParams();

  const [goalAccount, setGoalAccount] = useState<
    UserGoalAccountGetResponse[] | null
  >(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [selectedAccount, setSelectedAccount] = useState<number>(0);
  const [isRecommend, setRecommend] = useState<boolean>(false);

  const handleSelectAccount = (idx: number, accountId: number) => {
    setSelectedIdx(idx);
    setSelectedAccount(accountId);
  };

  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<UserGoalAccountGetResponse[]>(
    `${API_BASE_URL}/api/v1/accounts/user-goal/${goalId}`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setGoalAccount(data);
      if (data.length === 0) {
        setRecommend(true);
      } else {
        setRecommend(false); // 추가: 데이터가 있는 경우 추천 상태를 false로 설정
      }
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-white px-10">
        <img src="/logo.png" className="w-1/5" alt="하나피스" />
      </div>
      <div className="mx-10 my-5">
        <div className="font-hana-r">
          <p className="text-gray-400 text-xs">반갑습니다</p>
          <h3 className="font-semibold text-lg pt-1">{user.name} 님</h3>
        </div>
        {isRecommend ? (
          <GoalProductRecommend goalId={Number(goalId)} />
        ) : (
          <div>
            <div className="text-center">
              <p className="text-3xl mb-2 ml-3">🚩</p>
              <h2 className="font-bold text-xl">적금 선택</h2>
            </div>
            <div className="my-10">
              {goalAccount?.map((account, index) => (
                <GoalProduct
                  key={account.accountId}
                  count={index + 1}
                  name={account.productNm}
                  isSelected={index + 1 === selectedIdx}
                  onSelect={() =>
                    handleSelectAccount(index + 1, account.accountId)
                  }
                />
              ))}
            </div>
            <GreenButton path={`${selectedAccount}`} name={"선택하기"} />
          </div>
        )}
      </div>
    </>
  );
};
