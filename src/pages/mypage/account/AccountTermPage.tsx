import { useState } from "react";
import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";
import PhoneModal from "../../../components/ui/PhoneModal";

type Props = {
  name: string;
  content: string;
};

const AccountTerm = ({ name, content }: Props) => {
  return (
    <>
      <div className="p-2 m-2 bg-white border-customGreen border grid grid-cols-6 gap-4">
        <div className="">
          <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 peer-checked:bg-customGreen" required />
        </div>
        <div className="col-span-5">
          <div className="font-bold text-customGreen">{name}</div>
          <div className='break-words'>{content}</div>
        </div>
      </div>
      <br />
    </>
  );
};

export const AccountTermPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return(
    <>
      <div className='container'>
        <TopLine name={"입출금 통장"} />
        <div className="h-1 bg-gray-200">
          <div className="w-2/3 hana-color h-1"></div>
        </div>

        <div className='m-7 mt-10'>
          <h3 className='text-center text-xl font-hana-b'>계좌 생성</h3>
          <div className='mt-10'>
            <AccountTerm
              name="계좌생성 상품설명서"
              content="product.contract_terms\nproduct.contract_terms\nproduct.contract_terms"
            />
            <AccountTerm
              name="예금거래기본약관"
              content="product.contract_terms\nproduct.contract_terms\nproduct.contract_terms"
            />
          </div>
          <label className="text-customGreen font-semibold">이메일</label>
          <input type="text" className="m-3 bg-gray-300" /> <br />
          <p className="text-sm">
            [필수] 입력하신 이메일로 상품 이용약관 설명서가 발송됩니다.
          </p>
          <button
            className="green-button mt-10"
            onClick={() => setModalOpen(true)}
          >
            다음
          </button>
        
          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-3 text-3xl text-center">📢</h2>
            <h2 className="mt-4 text-xl font-bold text-center">중요사항을 충분히 이해하고<br />확인하셨나요?</h2>
            <p className="mt-10 mb-10 text-center text-gray-600 text-sm">금융소비자가 충분한 이해없이 확인한 경우,<br />추후 소송이나 분쟁에서 불리하게 적용될 수 있습니다.<br />고객센터 1599-3333</p>
            <GreenButton name={"확인했어요"} path={"/mypage/account/complete"} />
          </PhoneModal>
        </div>
      </div>
    </>
  );
};