import GoalProductRecommend from "./GoalProductRecommend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserGoalAccountGetResponse } from "./homeType";
import { GoalProductDetail } from "./GoalProductDetail";
import { GoalProductTransactionDetail } from "./GoalProductTransactionDetail";
import { FetchOptions, useFetch } from "../../hooks/fetch";

export const GoalProductDetailPage = () => {
  const name = "김하나";
  const [isRecommend, setRecommend] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQwMjU3OSwiZXhwIjoxNzIxMDAyNTc5fQ.41IRi3shVsUxj7NGN8INd7OmU5wSDbV3yD0TMwYAa9I';
  const fetchOptions: FetchOptions = {
    method:'GET',
    headers:{
      'Authorization': `Bearer ${token}`,
    },
  };

  const { data, error, loading } = useFetch<UserGoalAccountGetResponse[]>(`http://localhost:8080/api/v1/accounts/user-goal/${id}`, fetchOptions);

  useEffect(() => {
    if (!loading && data) {
      console.log('Data fetched:', data);
      if (data.length === 0) {
        setRecommend(true);
      } else {
        setRecommend(false); // 추가: 데이터가 있는 경우 추천 상태를 false로 설정
      }
    }
  }, [loading, data]);

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
          <GoalProductRecommend goalId={Number(id)} />
        ) : (
          data?.map((account) => (
            <div key={account.accountNumber}>
              <GoalProductDetail data={account} />
              <GoalProductTransactionDetail accountId={account.accountId} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
