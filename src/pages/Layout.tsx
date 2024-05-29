import { Outlet } from "react-router-dom";
import { NavBar } from "./common/NavBar";
import { Header } from "./common/Header";

export const Layout = () => {
  return (
    <>
      <div className="container flex flex-col relative">
        <Header />
        <div className="flex-grow overflow-auto mb-20">
          <Outlet />
        </div>
        <NavBar />
      </div>
    </>
  );
};
