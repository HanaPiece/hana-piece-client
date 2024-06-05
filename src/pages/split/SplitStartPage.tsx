import { useState } from "react";
import { GreenButton } from "../../components/ui/GreenButton";
import PhoneModal from "../../components/ui/PhoneModal";
import { addCommas } from "../../components/utils/formatters";
import { useUser } from "../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../hooks/fetch";

export const SplitStartPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useUser();

  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.jwt}`,
    },
  };

  const { data, error, loading } = useFetch<UserGetResponse>('http://43.201.157.250:8080/api/v1/users', fetchOptions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="m-10">
        <div className="grid grid-cols-3 mt-28">
          <div className="col-span-2 self-end">
            <h2 className="font-hana-b text-2xl">통장 쪼개기</h2>
            <p className="text-sm font-hana-r mt-5">효율적인 돈 관리를 위해<br />하나피스가 대신 도와드릴게요!</p>
          </div>
          <div>
            <img src="../byul3.png" alt="" />
          </div>
        </div>
        <div className="my-10">
          <img src="../split-start.png" alt="" />
        </div>
        <button onClick={()=>setModalOpen(true)}
          className="green-button font-hana-m text-lg"
        >시작하기</button>
      </div>

      <PhoneModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)}>
        <div className="text-center mx-8 my-5 mb-24">
          <div className="text-xl mb-5 font-hana-m">
            <p>
              <span className="text-customGreen">{user.name}</span>님의 기본 정보
            </p>
            <p className="text-gray-400 text-sm">적합한 통장 쪼개기 비율을 추천해드릴게요</p>
          </div>
          <div className="grid grid-cols-4 text-md mb-8 px-10">
            <div className="text-customGreen text-left">나이</div>
            <div className="col-span-3 text-right">{data?.age} 세</div>

            <div className="text-customGreen text-left">성별</div>
            <div className="col-span-3 text-right">{data?.sex == 'M' ? '남' : '여'}</div>

            <div className="text-customGreen text-left">월급</div>
            <div className="col-span-3 text-right">{data?.salary !== undefined ? `${addCommas(data.salary)} 원` : '정보 없음'}</div>
          </div>
          <GreenButton path={"setting"} name={"통장 쪼개러 가기"} />
        </div>
      </PhoneModal>
    </>
  );
}