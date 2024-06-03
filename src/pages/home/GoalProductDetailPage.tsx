import { SlCreditCard } from "react-icons/sl";
import GoalProductRecommend from "./GoalProductRecommend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserGoalAccountGetResponse } from "./homeType";
import { GoalProductDetail } from "./GoalProductDetail";
import { GoalProductTransactionDetail } from "./GoalProductTransactionDetail";

export const GoalProductDetailPage = () => {
  const name = "김하나";
  const [userGoals, setUserGoals] = useState<UserGoalAccountGetResponse[]>([]);
  const [isRecommend, setRecommend] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const { userGoalId } = useParams<{ userGoalId: string }>();
  const [error, setError] = useState<string | null>(null);

  const fetchUserGoals = async (userGoalId: string): Promise<UserGoalAccountGetResponse[]> => {
    const response = await fetch(`/api/v1/accounts/user-goal/${userGoalId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: UserGoalAccountGetResponse[] = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userGoalId) {
        try {
          const data = await fetchUserGoals(userGoalId);
          // 목표와 연결된 적금이 있으면 적금 상세 보여주기
          if (data.length !== 0) setRecommend(false);
          setUserGoals(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [userGoalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-white px-10">
        <img src="/logo.png" className="w-1/5" alt="하나피스" />
      </div>
      <div className="mx-10 my-5">
        <div className="font-hana-r">
          <p className='text-gray-400 text-xs'>반갑습니다</p>
          <h3 className='font-semibold text-lg pt-1'>{name} 님</h3>
        </div>
        {isRecommend ? (
          <>
            {userGoals?.map((data)=>{
              <>
                <GoalProductDetail key={data.accountNumber} data={data} />
                <GoalProductTransactionDetail accountId={data.accountId} />
              </>
            })}
          </>
        ) : (
          <GoalProductRecommend />
        )}
      </div>
    </>
  );
};
