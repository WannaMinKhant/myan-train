import React from "react";
import { useLocation } from "react-router-dom";
import MaterialNavBar from "./MaterialNavbar";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/login") ? (
        <div className="flex w-full h-screen select-none">
          <div className="flex-1 mt-20 mx-4 w-full scrollbar-hide overflow-auto">
            {children}
          </div>
          <div className="flex flex-row h-16 w-full absolute top-0 left-0 z-0 justify-end">
            <MaterialNavBar/>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default Layout;
