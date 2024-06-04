const GoalProductRecommend = ({goalId}:{goalId:number}) =>{
  // goalId에 따른 추천 적금 가져오기 추가
  
  return (
    <> 
      {goalId}
      <div className='mt-5'>
        <h2 className='font-bold text-lg'>
          아직 하나은행 적금이 없으시네요🥲 <br />
          다음 상품을 추천드려요
        </h2>
      </div>
      <div className='mt-3 mb-8'>
        <p className='text-gray-400 text-sm mb-1'>설정 목표와 관련된 추천 적금</p>
        <p className='text-sm font-bold'>오늘 가입한다면?</p>
      </div>
      <div>
        <div className='shadow-xl p-4 my-3 rounded-2xl bg-white'>
          <div className='grid grid-cols-6 gap-1'>
            <div className='bg-gray-200 w-8 h-8 rounded-full grid place-items-center'>
              <img src='\src\assets\img-hana-symbol-m.png' alt='하나은행' className='w-9/12' />
            </div>
            <div className='col-span-5 pt-1 hana-text-color font-bold'>하나주택청약종합저축</div>
          </div>  
          <div className='grid grid-cols-5 gap-1 my-4 gap-y-2'>
            <div className='text-xs text-lime-600'>예상기간</div>
            <div className='col-span-4 text-xs'>2024.05.27 ~ 2025.05.27</div>
            <div className='text-xs text-lime-600'>예상금액</div>
            <div className='col-span-4 text-xs'>매달 100만원씩 적금한다면 <span className='text-red-600'>30,450,000</span>원</div>
            <div className='col-start-2 col-span-4 text-xs'>매달 120만원씩 적금한다면 <span className='text-red-600'>30,550,000</span>원</div> 
          </div>
        </div>
      </div>
      <div>
        <div className='shadow-xl p-4 my-3 rounded-2xl bg-white'>
          <div className='grid grid-cols-6 gap-1'>
            <div className='bg-gray-200 w-8 h-8 rounded-full grid place-items-center'>
              <img src='\src\assets\img-hana-symbol-m.png' alt='하나은행' className='w-9/12' />
            </div>
            <div className='col-span-5 pt-1 hana-text-color font-bold'>하나주택청약종합저축2</div>
          </div>  
          <div className='grid grid-cols-5 gap-1 my-4 gap-y-2'>
            <div className='text-xs text-lime-600'>예상기간</div>
            <div className='col-span-4 text-xs'>2024.05.27 ~ 2025.05.27</div>
            <div className='text-xs text-lime-600'>예상금액</div>
            <div className='col-span-4 text-xs'>매달 100만원씩 적금한다면 <span className='text-red-600'>30,450,000</span>원</div>
            <div className='col-start-2 col-span-4 text-xs'>매달 120만원씩 적금한다면 <span className='text-red-600'>30,550,000</span>원</div> 
          </div>
        </div>
      </div>
    </>
  )
}

export default GoalProductRecommend;