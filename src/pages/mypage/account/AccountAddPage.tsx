import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";

export const AccountAddPage = () => {
  return (
    <>
      <div className='container'>
        <TopLine name={'입출금 통장'} />
        <div className='m-10'>
          <div className='flex justify-center my-20'>
            <div className='bg-gray-200 w-8 h-8 rounded-full grid place-items-center mr-5'>
              <img src='\src\assets\img-hana-symbol-m.png' alt='하나은행' className='w-9/12' />
            </div>
            <div className='col-span-5 pt-1 font-bold text-lg'>개인 정보 입력</div>
          </div>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='hana-text-color font-semibold'>이름</div>
              <div className='col-span-3'>
                <input type='text' className='bg-gray-200 w-full h-8' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='hana-text-color font-semibold'>생년월일</div>
              <div className='col-span-3'>
                <input type='text' className='bg-gray-200 w-full h-8' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='hana-text-color font-semibold'>핸드폰번호</div>
              <div className='col-span-3'>
                <input type='text' className='bg-gray-200 w-full h-8' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='hana-text-color font-semibold'>이메일주소</div>
              <div className='col-span-3'>
                <input type='text' className='bg-gray-200 w-full h-8' />
              </div>
            </div>
          </div>
          <div className='mt-16'>
            <GreenButton name={'다음'} path={'/mypage/account/term'} />
          </div>
        </div>
      </div>
    </>
  );
}