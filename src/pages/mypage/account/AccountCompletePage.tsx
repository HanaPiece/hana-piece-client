import { SlEnvolope, SlUser } from "react-icons/sl";
import { GreenButton } from "../../../components/ui/GreenButton";

export const AccountCompletePage = () => {
  return (
    <>
      <div className='container'>
        <div className='m-10'>
          <h3 className='mt-10 text-lg font-bold text-center'>입출금 통장</h3>
          <div className='mt-20 text-3xl font-bold text-center'><span className='text-6xl'>🎊</span><br />계좌가<br />생성되었습니다</div>
          <hr className='mt-10 w-1/2 m-auto' />
          <div className='mt-10'>
            <p className='text-gray-500 font-semibold'>은행</p>
            <div className='py-3 grid grid-cols-7 justify-items-stretch items-center border-b'>
              <div className='justify-self-start ml-2 text-gray-500'><SlUser /></div>
              <div className='col-span-6'>하나은행</div>
            </div>
          </div>
          <div className='mt-7'>
            <p className='text-gray-500 font-semibold'>계좌 번호</p>
            <div className='py-3 grid grid-cols-7 justify-items-stretch items-center border-b'>
              <div className='justify-self-start ml-2 text-gray-500'><SlEnvolope /></div>
              <div className='col-span-6'>111-22222-33333</div>
            </div>
          </div>
          <div className='mt-16'>
            <GreenButton name={'확인'} path={'/home'}/>
          </div>
        </div>
      </div>
    </>
  );
};
