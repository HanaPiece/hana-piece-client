import { SlEnvolope, SlUser } from "react-icons/sl";
import { GreenButton } from "../../../../components/ui/GreenButton";
import { TopLine } from "../../../../components/ui/TopLine";
import { useState, useEffect } from "react";
import { useUser } from "../../../../contexts/UserContext";
import { API_BASE_URL } from "../../../../constants";

type AccountGetResponse = {
  accountNumber: string;
};

export const AccountCompletePage = () => {
  const { user } = useUser();
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // Add this line
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/accounts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
            "Cache-Control": "no-cache", // Add cache control header
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: AccountGetResponse = await response.json();
        if (isMounted) {
          // Check if component is still mounted
          setAccount(data.accountNumber);
          console.log(data.accountNumber);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          // Check if component is still mounted
          setLoading(false);
        }
      }
    };

    fetchAccountData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [user.jwt]);

  if (loading) return <div>Loading...</div>;

  return (
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
  );
};
