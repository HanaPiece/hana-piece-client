import { useState } from "react";
import { GreenButton } from "../../../../components/ui/GreenButton";
import PhoneModal from "../../../../components/ui/PhoneModal";
import { TopLine } from "../../../../components/ui/TopLine";

export const AccountAddPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="container">
        <TopLine name={"입출금 통장"} />
        <div className="h-1 bg-gray-200">
          <div className="w-3/4 hana-color h-1"></div>
        </div>
        <div className="m-10">
          <div className="flex justify-center my-20">
            <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center mr-5">
              <img
                src="/img-hana-symbol-m.png"
                alt="하나은행"
                className="w-9/12"
              />
            </div>
            <div className="col-span-5 pt-1 font-bold text-lg">
              개인 정보 입력
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="hana-text-color font-semibold">이름</div>
              <div className="col-span-3">
                <input type="text" className="bg-gray-200 w-full h-8" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="hana-text-color font-semibold">생년월일</div>
              <div className="col-span-3">
                <input type="text" className="bg-gray-200 w-full h-8" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="hana-text-color font-semibold">핸드폰번호</div>
              <div className="col-span-3">
                <input type="text" className="bg-gray-200 w-full h-8" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="hana-text-color font-semibold">이메일주소</div>
              <div className="col-span-3">
                <input type="text" className="bg-gray-200 w-full h-8" />
              </div>
            </div>
          </div>
          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-3 text-3xl text-center">✔️</h2>
            <h2 className="mt-4 mb-4 text-xl font-bold text-center">
              정말로 가입하시겠습니까?
            </h2>
            <div className="mb-5 mt-10">
              <GreenButton path={`/mypage/account/add`} name={"확인했어요"} />
            </div>
          </PhoneModal>
          <div className="mt-16">
            <GreenButton name={"다음"} path={"/mypage/account/complete"} />
          </div>
        </div>
      </div>
    </>
  );
};
