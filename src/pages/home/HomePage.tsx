import { useNavigate } from "react-router-dom";
import { addCommas } from "../../components/utils/formatters";
import { FaPlus } from "react-icons/fa";

type Props = {
  userGoalId: number;
  goalBeginDate: string;
  goalTypeNm: string;
  productNm: string;
  amount: number;
  duration: string;
  color: string;
};

const GoalBox = ({ userGoalId, goalBeginDate, goalTypeNm, productNm, amount, color }: Props) => {
  const navigate = useNavigate();

  const goToDetail = (userGoalId:number) => {
    navigate(`${userGoalId}`);
  };

  const gradientClass = color === 'violet'
    ? 'bg-violet-50'
    : color === 'blue'
    ? 'bg-sky-50'
    : color === 'green'
    ? 'bg-lime-50'
    : 'bg-stone-50';
  
  const icon = color === 'violet'
    ? '🚗'
    : color === 'blue'
    ? '🏠'
    : color === 'green'
    ? '🙏'
    : '💰';
  
  return (<>
      <div className={`relative ${gradientClass} border-2 border-customGreen rounded-2xl p-3 mt-5 mb-7 shadow-xl cursor-pointer`} onClick={() => goToDetail(userGoalId)}>
        <div className="absolute top-0 left-0 bg-customGreen w-1/5 text-white p-1 text-sm text-center font-hana-r rounded-br-xl rounded-tl-xl">목표 {userGoalId}</div>
        <div className='grid grid-cols-5 text-md font-semibold mb-8 mt-3'>
          <div className="align-bottom col-span-3 flex">
            <div className="text-lg self-center">
              <span className={`bg-gradient-to-t from-yellow-200 from-50% to-${gradientClass} to-50%`}>{goalTypeNm}</span>
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-medium text-right">{goalBeginDate} ~</div>
            <div className="text-right">{productNm}</div>
          </div>
        </div>
        <div className='flex justify-between text-xs'>
          <div className='col-start-1 col-end-3'>현재 저축 금액</div>
        </div>
        <div className='flex justify-between'>
          <div className='text-2xl font-semibold'>{amount / 10000} 만원</div>
          <div className="absolute -right-3 -bottom-4 bg-white rounded-full w-20 h-20 border-4 border-customGreen text-center text-5xl">
            <div className="pt-2 pl-1">{icon}</div>
          </div>
        </div>  
      </div>
    </>
  );
};

export const HomePage = () => {
  const name = '김하나';
  const totalAmount = 6300000;

  return (
    <>
      <div className="bg-white px-10">
        <img src="logo.png" className="w-1/5" alt="" />
      </div>
      <div className='mx-10 my-5'>
        <div className="font-hana-r">
          <p className='text-gray-400 text-xs'>반갑습니다</p>
          <h3 className='font-semibold text-lg pt-1'>{name} 님</h3>
        </div>
        <div className='px-5 py-3 mt-3 bg-gray-200 rounded-2xl flex justify-between items-end'>
          <h2 className='font-hana-b text-lg'>💰현재 저축액 :</h2>
          <h2 className='font-hana-b text-xl'>{addCommas(totalAmount)} <span className="text-lg">원</span></h2>
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
          duration='10' color={""}      />
        
        <div className="py-5 bg-white rounded-2xl p-3 mt-5 mb-7 shadow-xl cursor-pointer text-center">
          <div className="m-auto mb-5 w-14 h-14 rounded-full bg-slate-300 flex justify-center items-center">
            <FaPlus className="text-customGreen text-xl" />
          </div>
          <p className="font-hana-cm text-customGreen">목표를 추가해보세요!</p>
        </div>
      </div>
    </>
  );
};