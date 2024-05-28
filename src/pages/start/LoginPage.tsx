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
      <div className="container flex items-center justify-center">
        <div>
          <span className="flex justify-center text-customGreen text-lg font-bold">
            로그인
          </span>
          <div className="flex justify-center">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 m-2 rounded-xl ${
                  password.length > index ? "bg-slate-400" : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3">
            {[...Array(9)].map((_, index) => (
              <div
                className="col-span-1 border-gray-200 border-2 flex justify-center cursor-pointer p-4"
                onClick={() => insertPassword((index + 1).toString())}
              >
                {index + 1}
              </div>
            ))}
            <div className="col-span-1border-gray-200 border-2 flex justify-center p-4" />
            <div
              className="col-span-1 border-gray-200 border-2 flex justify-center cursor-pointer p-4"
              onClick={() => insertPassword("0")}
            >
              0
            </div>
            <div
              className="col-span-1 border-gray-200 border-2 flex justify-center cursor-pointer p-4"
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
