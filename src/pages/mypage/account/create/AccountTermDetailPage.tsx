import { useState } from "react";
import { TopLine } from "../../../../components/ui/TopLine";
import { GreenButton } from "../../../../components/ui/GreenButton";
import PhoneModal from "../../../../components/ui/PhoneModal";

type Term = {
  id: number;
  name: string;
  content: string;
};

const terms: Term[] = [
  {
    id: 1,
    name: "유의사항",
    content:
      "이 예금은 양도 및 상속에 의한 명의변경이 불가합니다. 단, 상속에 의한 해지는 가능합니다. 이 예금의 신규계좌수 30만좌 제한에 따라 판매가 중단될수 있습니다. ※ 금융상품에 관한 계약을 체결하기 전에 금융상품 설명서 및 약관을 읽어 보시기 바랍니다. ※ 금융소비자는 해당 상품 또는 서비스에 대하여 설명 받을 권리가 있습니다. ※ 이 홍보물은 법령 및 내부통제기준에 따른 절차를 거쳐 제공됩니다.",
  },
  {
    id: 2,
    name: "세제혜택",
    content:
      "비과세 종합저축으로 가입 가능(전 금융기관 통합한도 범위내) 관련 세법이 개정될 경우 세율이 변경되거나 세금이 부과될 수 있으며, 계약기간 이후의 이자는 과세됨",
  },
  {
    id: 3,
    name: "원금 및 이자지급제한",
    content:
      "계좌에 압류, 가압류, 질권설정 등이 등록될 경우 원금 및 이자지급 제한될 수 있습니다. ※ 민사집행법에 따라 최저생계비 이하 등 압류금지 채 권에 해당하는 경우에는 법원에 압류금지채권범위 변경 신청 등을 통해 압류를 취소할 수 있습니다. 예금잔액증명서 발급 당일에는 잔액 변동 불가합니다. 통장이 ‘전기통신금융사기 피해 방지 및 피해금 환급에 관한 특별법’에서 정의한 피해 의심거래계좌 및 사기이용 계좌로 이용될 경우 이체, 송금지연, 지급정지 등의 금융거래 제한조치를 할 수 있습니다.",
  },
  {
    id: 4,
    name: "위법계약해지권",
    content:
      "금융소비자 보호에 관한 법률 제47조에 따른 위법계약해지 사유가 발생한 경우, 계약체결일로부터 5년 이내 범위에서 위반사실을 안 날로부터 1년 이내에 서면 등으로 해당 계약의 해지를 요구할 수 있습니다. 이 경우 금융회사는 해지를 요구받은 날부터 10일 이내에 금융소비자에게 수락 여부를 통지하여야 하며, 거절할 때에는 거절사유를 함께 통지하여야 합니다. 만약 금융소비자의 요구가 정당한 것으로 판단될 경우 수수료 등 계약해지와 관련한 추가 비용 부담없이 계약해지가 가능합니다.",
  },
];

export const AccountTermDetailPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="container">
        <TopLine name={"입출금 통장"} />
        <div className="h-1 bg-gray-200">
          <div className="w-2/4 hana-color h-1"></div>
        </div>
        <div className="mx-7">
          <div className="text-lg font-bold mt-10">
            <div className="flex justify-center gap-x-3 my-10 items-center">
              <div>
                <div className="bg-gray-200 w-8 h-8 rounded-full grid place-items-center">
                  <img
                    src="\img-hana-symbol-m.png"
                    alt="하나은행"
                    className="w-9/12"
                  />
                </div>
              </div>
              <p className="text-xl font-hana-cm">입출금 통장</p>
            </div>
          </div>
          <div className="bg-slate-200 h-[450px] overflow-y-auto border p-2">
            {terms.map((term: Term) => (
              <div key={term.id} className="bg-slate-200">
                <span className="text-customGreen text-lg font-bold">
                  {term.name}
                </span>
                <br />
                <span>{term.content}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="green-button mt-5"
          >
            약관 동의
          </button>

          <PhoneModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="mt-3 text-3xl text-center">✔️</h2>
            <h2 className="mt-4 mb-4 text-xl font-bold text-center">
              모든 약관에 동의하십니까?
            </h2>
            <div className="mb-5 mt-10">
              <GreenButton path={`/mypage/account/add`} name={"확인했어요"} />
            </div>
          </PhoneModal>
        </div>
      </div>
    </>
  );
};
