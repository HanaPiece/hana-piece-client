import { SlArrowRight, SlPlus, SlWallet } from "react-icons/sl";
import { TopLine } from "../../../components/ui/TopLine";
import { useNavigate } from "react-router-dom";

export const AccountPage = () => {
  const navigate = useNavigate();

  // onClick 이벤트 핸들러
  const handleCreateAccountClick = () => {
    navigate('add');
  };

  const handleAccountSettingClick = () => {
    navigate('setting');
  };

  return (
    <>
      <TopLine name={'계좌 관리'} />
      <div className='m-8 mt-10'>
        <div className='divide-y divide-solid'>
          <div 
            className='py-3 grid grid-cols-8 justify-items-stretch items-center hover:bg-gray-200 cursor-pointer'
            onClick={handleCreateAccountClick} // 함수 호출 래핑
          >
            <div className='justify-self-start ml-2 text-gray-600'><SlPlus /></div>
            <p className='col-span-6 text-md ml-2 font-semibold'>계좌 생성</p>
            <div className='justify-self-end mr-2 text-gray-600'><SlArrowRight /></div>
          </div>
          <div 
            className='py-3 grid grid-cols-8 justify-items-stretch items-center hover:bg-gray-200 cursor-pointer'
            onClick={handleAccountSettingClick} // 함수 호출 래핑
          >
            <div className='justify-self-start ml-2 text-gray-600'><SlWallet /></div>
            <p className='col-span-6 text-md ml-2 font-semibold'>계좌 설정</p>
            <div className='justify-self-end mr-2 text-gray-600'><SlArrowRight /></div>
          </div>
        </div>
      </div>
    </>
  );
}