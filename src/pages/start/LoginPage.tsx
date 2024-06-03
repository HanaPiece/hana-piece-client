import { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { User, useUser } from "../../contexts/UserContext";
import { useGoalsProducts } from "../../contexts/ProductContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const { user, login } = useUser();
  const { setGoal } = useGoalsProducts();

  useEffect(() => {
    const loginRequest = async () => {
      try {
        const response = await fetch(
          "http://172.16.20.217:8080/api/v1/users/login",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: password,
            }),
          }
        );
        if (response.ok) {
          const json = await response.json();
          const customer: User = {
            jwt: json["accessToken"],
            nickname: json["name"],
            salary: json["salary"],
          };

          console.log("Customer received:", customer);
          login(customer);
        } else {
          alert("Incorrect password!");
          setPassword("");
        }
      } catch (err) {
        alert("에러가 발생했습니다. " + err);
      }
    };

    if (password.length === 6) {
      loginRequest();
    }
  }, [password, login]);

  useEffect(() => {
    console.log("Updated user:", user);
    if (user.jwt) {
      (async function () {
        try {
          const response = await fetch(
            "http://172.16.20.217:8080/api/v1/user-goals",
            {
              method: "get",
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();

            console.log(json);
            setGoal(json);
          }
        } catch (err) {
          if (err instanceof Error) {
            alert(`에러가 발생했습니다. (${err}`);
          }
        }
      })();
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const insertPassword = (value: string) => {
    if (value === "back") {
      setPassword(password.slice(0, -1));
    } else {
      const newPassword = password + value;
      if (newPassword.length <= 6) {
        setPassword(newPassword);
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
