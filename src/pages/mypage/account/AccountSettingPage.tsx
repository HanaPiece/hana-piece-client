import { SlArrowRight, SlBookOpen } from "react-icons/sl";
import { TopLine } from "../../../components/ui/TopLine";
import { useNavigate } from "react-router-dom";

export const AccountSettingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <TopLine name={"계좌 관리"} />
        <div className='m-8 mt-10'>
          <div className='divide-y divide-solid'>
            <div
              className='py-3 grid grid-cols-8 justify-items-stretch items-center hover:bg-gray-200 cursor-pointer'
              onClick={() => navigate("open")}
            >
              <div className='justify-self-start ml-2 text-gray-600'><SlBookOpen /></div>
              <p className='col-span-6 text-md ml-2 font-semibold'>입출금 통장</p>
              <div className='justify-self-end mr-2 text-gray-600'><SlArrowRight /></div>
            </div>
            <div
              className='py-3 grid grid-cols-8 justify-items-stretch items-center hover:bg-gray-200 cursor-pointer'
              onClick={() => navigate("saving")}
            >
              <div className='justify-self-start ml-2 text-gray-600'><SlBookOpen /></div>
              <p className='col-span-6 text-md ml-2 font-semibold'>적금 통장</p>
              <div className='justify-self-end mr-2 text-gray-600'><SlArrowRight /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
