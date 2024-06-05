import { SlEnvolope, SlUser } from "react-icons/sl";
import { GreenButton } from "../../../components/ui/GreenButton";
import { TopLine } from "../../../components/ui/TopLine";
import { useState, useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import { FetchOptions, useFetch } from "../../../hooks/fetch";

type AccountGetResponse = {
  accountNumber: string;
};

export const AccountCompletePage = () => {
  const { user } = useUser();
  const [account, setAccount] = useState<string | null>(null);

  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.jwt}`,
    },
  };
  const { data, error, loading } = useFetch<AccountGetResponse>(
    `http://43.201.157.250:8080/api/v1/accounts`,
    fetchOptions
  );

  useEffect(() => {
    if (data) {
      const { accountNumber } = data;
      setAccount(accountNumber);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container">
        <TopLine name={"입출금 통장"} />
        <div className="h-1 bg-gray-200">
          <div className="w-full hana-color h-1"></div>
        </div>
        <div className="m-10">
          <div className="mt-20 text-3xl font-bold text-center">
            <span className="text-6xl">🎊</span>
            <br />
            계좌가
            <br />
            생성되었습니다
          </div>
          <hr className="mt-10 w-1/2 m-auto" />
          <div className="mt-10">
            <p className="text-gray-500 font-semibold">은행</p>
            <div className="py-3 grid grid-cols-7 justify-items-stretch items-center border-b">
              <div className="justify-self-start ml-2 text-gray-500">
                <SlUser />
              </div>
              <div className="col-span-6">하나은행</div>
            </div>
          </div>
          <div className="mt-7">
            <p className="text-gray-500 font-semibold">계좌 번호</p>
            <div className="py-3 grid grid-cols-7 justify-items-stretch items-center border-b">
              <div className="justify-self-start ml-2 text-gray-500">
                <SlEnvolope />
              </div>
              <div className="col-span-6">{account}</div>
            </div>
          </div>
          <div className="mt-16">
            <GreenButton name={"확인"} path={"/home"} />
          </div>
        </div>
      </div>
    </>
  );
};
