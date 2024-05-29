import { useNavigate } from "react-router-dom";
import { addCommas } from "../../components/utils/formatters";

type Props = {
  userGoalId: number;
  goalBeginDate: string;
  goalTypeNm: string;
  productNm: string;
  amount: number;
  duration: string;
  color: string;
};

const GoalBox = ({ userGoalId, goalBeginDate, goalTypeNm, productNm, amount, duration, color }: Props) => {
  const navigate = useNavigate();

  const goToDetail = (userGoalId:number) => {
    navigate(`${userGoalId}`);
  };

  const gradientClass = color === 'violet'
    ? 'from-violet-400 to-violet-600'
    : color === 'blue'
    ? 'from-cyan-300 to-cyan-500'
    : color === 'green'
    ? 'from-green-400 to-green-600'
    : 'from-orange-300 to-orange-400';
  
  return (
    <div className={`bg-gradient-to-r ${gradientClass} rounded-2xl p-3 my-4 text-white shadow-xl cursor-pointer`} onClick={() => goToDetail(userGoalId)}>
      <div className='flex justify-between text-xs font-semibold'>
        <div>목표 {userGoalId}</div>
        <div>{goalBeginDate} ~</div>
      </div>
      <div className='flex justify-between text-md font-semibold mb-12'>
        <div>{goalTypeNm}</div>
        <div>{productNm}</div>
      </div>
      <div className='flex justify-between text-xs'>
        <div className='col-start-1 col-end-3'>현재 저축 금액</div>
      </div>
      <div className='flex justify-between'>
        <div className='text-2xl font-semibold'>{amount / 10000} 만원</div>
        <div className='text-sm'>{duration}% 달성</div>
      </div>  
    </div>
  );
};

export const HomePage = () => {
  const name = '김하나';
  const totalAmount = 500000;

  return (
    <div className='m-10'>
      <div>
        <p className='text-gray-400 font-semibold text-sm'>반갑습니다</p>
        <h3 className='font-extrabold text-lg pt-1'>{name} 님</h3>
      </div>
      <div className='py-5'>
        <h2 className='font-black text-2xl'>현재 저축액: {addCommas(totalAmount)} 원</h2>
      </div>
      <GoalBox
        userGoalId={1}
        goalBeginDate='2023.2'
        goalTypeNm='차 사기'
        productNm='하나 소원 적금'
        amount={3000000}
        duration='58'
        color='violet' 
      />
      <GoalBox
        userGoalId={2}
        goalBeginDate='2019.2'
        goalTypeNm='서울에 내 집 마련'
        productNm='주택청약종합저축'
        amount={2300000}
        duration='30'
        color='blue' 
      />
      <GoalBox
        userGoalId={3}
        goalBeginDate='2007.3'
        goalTypeNm='노후 자금 마련'
        productNm='하나 IRP'
        amount={1000000}
        duration='10'
      />
    </div>
  );
};