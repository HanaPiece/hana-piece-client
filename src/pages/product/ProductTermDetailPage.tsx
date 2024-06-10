import { useParams } from "react-router-dom";
import { TopLine } from "../../components/ui/TopLine";
import { useEffect, useState } from "react";
import { GreenButton } from "../../components/ui/GreenButton";
import PhoneModal from "../../components/ui/PhoneModal";
import { useUser } from "../../contexts/UserContext";
import { API_BASE_URL } from "../../constants";

type Term = {
  id: number;
  name: string;
  content: string;
};

export const ProductTermDetailPage = () => {
  const { goalId, productId } = useParams();
  const { user } = useUser();
  const [terms, setTerms] = useState<Term[]>([
    { id: 1, name: "적금 약관 동의", content: "empty" },
  ]);
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/v1/products/${productId}`,
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            const jsonTerm: Term[] = [
              { id: 1, name: "적금 약관 동의", content: json["contractTerms"] },
              {
                id: 1,
                name: "예금자 보호법",
                content: json["depositProtection"],
              },
            ];
            setTerms(jsonTerm);
            setName(json["productNm"]);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
    }
  }, [user.jwt, productId]);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="container">
        <TopLine name={"적금 개설"} />
        <div className="h-1 bg-gray-200">
          <div className="w-4/6 hana-color h-1"></div>
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
              <p className="text-xl font-hana-cm">{name}</p>
            </div>
          </div>
          <div className="h-[450px] overflow-y-auto p-2">
            {terms.map((term: Term) => (
              <>
                <div className="my-3 mb-5">
                  <p className="text-customGreen text-lg font-bold mb-3">
                  📌 {term.name}
                  </p>
                  <div key={term.id} className="bg-white p-4 border  text-sm">
                  {term.content.split(',').map((item, count)=>(
                    <p>{count+1}. {item}</p>
                  ))}
                  </div>
                </div>
              </>
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
              정말로 가입하시겠습니까?
            </h2>
            <div className="mb-5 mt-10">
              <GreenButton
                path={`/product/${goalId}/${productId}/signup`}
                name={"확인했어요"}
              />
            </div>
          </PhoneModal>
        </div>
      </div>
    </>
  );
};
