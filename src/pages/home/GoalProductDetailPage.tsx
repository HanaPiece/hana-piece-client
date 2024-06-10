import { useParams } from "react-router-dom";
import { GoalProductDetail } from "./GoalProductDetail";
import { GoalProductTransactionDetail } from "./GoalProductTransactionDetail";
import { TopLine } from "../../components/ui/TopLine";

export const GoalProductDetailPage = () => {
  const { accountId } = useParams();

  return (
    <>
      <div className="bg-white px-10">
        <img src="/logo.png" className="w-1/5" alt="하나피스" />
      </div>
      <div className="mx-10 my-5">
        <div key={accountId}>
          <TopLine name={"적금 상세내역"} />
          <GoalProductDetail accountId={Number(accountId)} />
          <GoalProductTransactionDetail accountId={Number(accountId)} />
        </div>
      </div>
    </>
  );
};
