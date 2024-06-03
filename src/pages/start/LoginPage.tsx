import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (check) {
      if (password === "123456") {
        navigate("/home");
      } else {
        alert("Incorrect password!"); //alert 대신 모달창 들어가야합니다!!!!!!!!
        setPassword("");
        setCheck(false);
      }
    }
  }, [check, password, navigate]);

  const insertPassword = (value: string) => {
    if (value === "back") {
      setPassword(password.slice(0, -1));
    } else {
      const newPassword = password + value;
      if (newPassword.length <= 6) {
        setPassword(newPassword);
        if (newPassword.length === 6) {
          setCheck(true);
        }
      }
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col justify-between container">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-customGreen text-2xl font-hana-b mb-4">로그인</p>
        <div className="flex justify-center mb-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`w-5 h-5 m-2 rounded-xl ${
                password.length > index ? "bg-customGreen" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-2xl font-hana-m">
        <div className="grid grid-cols-3">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="col-span-1 py-7 border-gray-200 border-2 flex justify-center items-center cursor-pointer p-4"
              onClick={() => insertPassword((index + 1).toString())}
            >
              {index + 1}
            </div>
          ))}
          <div className="col-span-1 border-gray-200 border-2 flex justify-center items-center p-4" />
          <div
            className="col-span-1 py-7 border-gray-200 border-2 flex justify-center items-center cursor-pointer p-4"
            onClick={() => insertPassword("0")}
          >
            0
          </div>
          <div
            className="col-span-1 py-7 border-gray-200 border-2 flex justify-center items-center cursor-pointer p-4"
            onClick={() => insertPassword("back")}
          >
            <SlArrowLeft />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
