import { useState } from 'react';
import { GreenButton } from '../../components/ui/GreenButton';
import { useUser } from '../../contexts/UserContext';

export const TutorialPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { logout } = useUser();

  const slides = [
    {
      content: (
        <>
        <div className='text-center mb-10'>
          <p className='font-hana-b text-2xl mb-2'>소비 내역 확인</p>
          <p className='font-hana-r'>
          월 별 지출 금액을<br />
          한 눈에 확인하고<br />
          소비 습관을 개선해보아요!
          </p>
        </div>
        <div className="p-1 mb-5">
          <img src="/tutorial4.png" alt="" className='w-3/4 m-auto' />
        </div>
        </>
      ),
    },
    {
      content: (
        <>
        <div className='text-center mb-10'>
          <p className='font-hana-b text-2xl mb-2'>통장 쪼개기 자동화</p>
          <p className='font-hana-r'>
          자동으로<br />
          소비에 맞게<br />
          돈을 세분화 시켜줘요!
          </p>
        </div>
        <div className="p-1 mb-5">
          <img src="tutorial3.png" alt="" className='w-3/4 m-auto' />
        </div>
        </>
      ),
    },
    {
      content: (
        <>
        <div className='text-center mb-10'>
          <p className='font-hana-b text-2xl mb-2'>목표 달성 금액</p>
          <p className='font-hana-r'>
          구체적인 목표를 입력하면<br />
          시세를 예측해서<br />
          목표 달성 금액을 정해줘요!
          </p>
        </div>
        <div className="p-1 mb-5">
          <img src="tutorial2.png" alt="" className='w-full' />
        </div>
        </>
      ),
    },
    {
      content: (
        <>
        <div className='text-center mb-10'>
          <p className='font-hana-b text-2xl mb-2'>목표 추천 적금</p>
          <p className='font-hana-r'>
            소비 목표를 만들고<br />목표를 달성할 수 있도록<br />최적의 적금을 추천해드려요!
          </p>
        </div>
        <div className="p-1 mb-7">
          <img src="tutorial1.png" alt="" className='w-full' />
        </div>
        </>
      ),
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // const prevSlide = () => {
  //   if (currentSlide > 0) {
  //     setCurrentSlide(currentSlide - 1);
  //   }
  // };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen space-y-6 p-6 bg-gray-100">
      <div className="relative w-full max-w-lg overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${index === currentSlide ? 'w-4 h-2 rounded-full bg-customGreen' : 'w-2 h-2 rounded-full bg-gray-300'}`}
          ></div>
        ))}
      </div>
      {currentSlide !== slides.length - 1 ? (
        <button className="px-4 py-2 green-button text-white rounded" onClick={nextSlide}>
          다음
        </button>
      ) : (
        <GreenButton path={'/login'} name={'시작하기'} />
      )}
    </div>
    <button onClick={logout} className='green-button'>로그아웃</button>
    </>
  );
};
