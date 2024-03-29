import React, { useState, useEffect } from "react";
import Station from "../../image/images.png";
import { useGetStationQuery } from "../../ApiService/stationSlice";
import { Spinner } from "@material-tailwind/react";

const DashboardPage = ({ socket }) => {
  const { data, isSuccess, isLoading } = useGetStationQuery();
  const [account, setAccount] = useState([]);
  const [station, setStation] = useState([]);


  useEffect(() => {
    // Listen to the onlineUser event
    socket.on("onlineUser", (data) => {
      // Update the onlineUsers state with the data
      setAccount(data);
    });
    // Return a cleanup function
    return () => {
      // Remove the listener for the onlineUser event
      socket.off("onlineUser");
    };
  }, [socket]); 

  const getUser=()=>{
    const user = {
      id: 9999,
      name:'Server'
    };
    socket?.emit('addUser',user);
  }


  useEffect(() => {
    // Set the initial status of the station state to 1
    setStation((station) => station.map((e) => ({ ...e, status: "1" })));
    
    account?.map((acc) => {
      // Update the station state based on the onlineUsers state
      setStation((station) =>
        station.map((sat) =>
          sat.id == acc.id ? { ...sat, status: 0 } : { ...sat }
        )
      );
      return acc;
    });
  }, [account]);


  useEffect(() => {
    if (isSuccess) {
      setStation(data?.data);
    }
  }, [isSuccess,data?.data]);

  return (
    <div className="w-full h-screen overflow-y-auto scrollbar-hide">
      <div className="flex flex-row justify-end shadow-md my-2">
        <div className="px-4 py-2 bg-blue-500 rounded-lg shadow-lg text-white" onClick={getUser}>
          Refresh
        </div>
      </div>
      { isLoading ? <div className="justify-center items-center flex flex-row w-full h-full"><Spinner/></div> : <div className="grid lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-4 font-poppins select-none gap-4">
        { isSuccess &&
          station?.map((station, i) => {
            return (
              <div key={i.toString()} className="relative h-fit">
                <div
                  className={`${
                    station.status != 1 ? "bg-green-500" : "bg-red-400"
                  } p-2 rounded-md text-left shadow-md shadow-indigo-300`}
                >
                  <div className="flex flex-row items-center justify-start py-1">
                    <img
                      src={Station}
                      alt={"station"}
                      width={30}
                      height={30}
                      className="bg-gray-300 rounded-full"
                    />
                    <p className="ml-3 text-sm text-gray-200">{station.name}</p>
                  </div>
                </div>

              </div>
            );
          })}
      </div>}
    </div>
  );
};

export default DashboardPage;
