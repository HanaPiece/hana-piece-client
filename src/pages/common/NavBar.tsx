import { useState } from 'react';
import {
  SlWallet,
  SlCreditCard,
  SlUser,
  SlSocialDropbox,
} from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('/home');

  const handleNavigate = (path: string) => {
    setSelected(path);
    navigate(path);
  };

  const getIconClass = (path: string) => {
    return selected === path ? 'nav-icon selected-nav-item' : 'nav-icon';
  };

  const getTextClass = (path: string) => {
    return selected === path ? 'text-xs font-bold mt-1 hana-text-color' : 'text-xs mt-1';
  };

  return (
    <div className="nav-shadow-top-lg rounded-t-3xl w-full h-20 absolute bottom-0 bg-white">
      <div className="sticky flex justify-between bottom-0 left-0 w-full px-4">
        <div className="flex flex-col items-center justify-center nav-item" onClick={() => handleNavigate('/life')}>
          <SlCreditCard className={getIconClass('/life')} />
          <p className={getTextClass('/life')}>생활</p>
        </div>
        <div className="flex flex-col items-center justify-center nav-item" onClick={() => handleNavigate('/split')}>
          <SlWallet className={getIconClass('/split')} />
          <p className={getTextClass('/split')}>통장</p>
        </div>
        <div className="nav-item -mt-5" onClick={() => handleNavigate('/home')}>
          <img src="/home.png" alt="Home Image" className={selected === '/home' ? 'text-green-500' : ''} />
        </div>
        <div className="flex flex-col items-center justify-center nav-item" onClick={() => handleNavigate('/product/start')}>
          <SlSocialDropbox className={getIconClass('/product')} />
          <p className={getTextClass('/product')}>상품</p>
        </div>
        <div className="flex flex-col items-center justify-center nav-item" onClick={() => handleNavigate('/mypage')}>
          <SlUser className={getIconClass('/mypage')} />
          <p className={getTextClass('/mypage')}>마이페이지</p>
        </div>
      </div>
      <div className="h-1 bg-gray-200 w-28 m-auto"></div>
    </div>
  );
};
