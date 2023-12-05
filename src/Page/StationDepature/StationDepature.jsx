import React, { useState, useRef, useEffect } from "react";
import { BiTrash, BiHome } from "react-icons/bi";
import { Breadcrumbs } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { FaCheck } from "react-icons/fa";
import {
  Button,
  Input,
  IconButton,
  Spinner,
  Drawer,
  Typography,
} from "@material-tailwind/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Select, Option } from "@material-tailwind/react";
import { useGetLaneQuery } from "../../ApiService/laneSlice";
import { useGetStationQuery } from "../../ApiService/stationSlice";
import { useGetTrainQuery } from "../../ApiService/trainSlice";
import {
  useGetLaneStationMutation,
  useAddLaneStationMutation,
} from "../../ApiService/TimeTableSlice";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const StationDepature = () => {
  const fromRef = useRef([]);
  const toRef = useRef([]);

  const [arrTime, setArrTime] = useState([false]);

  const { data: lane, isSuccess, isLoading, refetch } = useGetLaneQuery();
  const [getLaneStation, getLaneStationResult] = useGetLaneStationMutation();
  const [addStationTime, addStationTimeResult] = useAddLaneStationMutation();

  const {
    data: station,
    isLoading: stationLoading,
    isSuccess: stationSuccess,
  } = useGetStationQuery();
  const {
    data: train,
    isLoading: trainLoading,
    isSuccess: trainSuccess,
  } = useGetTrainQuery();

  const [laneId, setLaneId] = useState(0);
  const [endstationId, setEndStationId] = useState(0);
  const [trainId, setTrainId] = useState(0);
  const [startStation, setStartStation] = useState(0);
  const [TimeStation, setTimeStation] = useState([]);

  const chooseStation = async () => {
    const body = {
      start: startStation,
      end: endstationId,
      inner: "1",
      id: laneId,
    };

    console.log(body);
    await getLaneStation(body);
  };

  useEffect(() => {
    if (getLaneStationResult.isSuccess) {
      setTimeStation(
        getLaneStationResult.data.data.map((st) => ({
          ...st,
          arrived: "",
          dept: "",
          check: false,
        }))
      );
    }
  }, [getLaneStationResult]);

  const DepatureTime = async (i) => {
    // TimeStation[i].arrived = fromRef.current.value;
    // TimeStation[i].dept = toRef.current.value;

    const body = {
      station_id: TimeStation[i].id,
      train_id: trainId,
      arrivedTime: fromRef.current[i].value,
      depatureTime: toRef.current[i].value,
      delayTime: "00:01",
      status: 1,
      note: 1,
    };

    console.log(body);
    await addStationTime(body);
    setTimeStation(TimeStation.map((time)=> time.id == TimeStation[i].id ? { ...time,check:true}:{...time}))
  };

  return (
    <div className="flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide">
      <div className="flex flex-row w-full h-fit justify-between items-center">
        <Breadcrumbs>
          <BiHome size={20} className="opacity-50" />
          <p className="font-poppins">Station Time Table</p>
        </Breadcrumbs>
      </div>

      <div className="flex md:flex-row lg:flex-row xl:flex-row flex-col w-full min-h-full mt-4">
        <div className="flex flex-col md:w-1/3 lg:w-1/3 xl:w-1/3 w-full p-2 border-2 mx-2 rounded-xl order-1 h-[calc(100vh-150px)]">
          <div className="flex flex-1 xl:flex-col md:flex-col flex-col gap-2 m-2">
            <div className="w-full">
              <Select
                label="Select Train"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setTrainId(e)}
                offset={{
                  mainAxis: 4,
                  crossAxis: 4,
                }}
              >
                {trainSuccess ? (
                  train.data.map((train) => (
                    <Option value={train.id.toString()} key={uuidv4()}>
                      {train.train_no}
                    </Option>
                  ))
                ) : (
                  <Option value="0" key={uuidv4()}>
                    ရထားရွေးရန်
                  </Option>
                )}
              </Select>
            </div>
            <div className="w-full">
              <Select label="Select Lane" onChange={(e) => setLaneId(e)}>
                {isSuccess ? (
                  lane.data.map((lane) => (
                    <Option value={lane.id.toString()} key={uuidv4()}>
                      {lane.name}
                    </Option>
                  ))
                ) : (
                  <Option value="0" key={uuidv4()}>
                    ခရီးစဉ်ရွေးရန်
                  </Option>
                )}
              </Select>
            </div>
            <div className="w-full">
              <Select
                label="Select Start Station"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setStartStation(e)}
                offset={{
                  mainAxis: 4,
                  crossAxis: 4,
                }}
              >
                {stationSuccess ? (
                  station.data.map((train) => (
                    <Option
                      value={train.station_order.toString()}
                      key={uuidv4()}
                    >
                      {train.name}
                    </Option>
                  ))
                ) : (
                  <Option value="0" key={uuidv4()}>
                    ထွက်ခွာမည့် ဘူတာရွေးရန်
                  </Option>
                )}
              </Select>
            </div>
            <div className="w-full">
              <Select
                label="Select End Station"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setEndStationId(e)}
                offset={{
                  mainAxis: 4,
                  crossAxis: 4,
                }}
              >
                {stationSuccess ? (
                  station.data.map((train) => (
                    <Option
                      value={train.station_order.toString()}
                      key={uuidv4()}
                    >
                      {train.name}
                    </Option>
                  ))
                ) : (
                  <Option value="0" key={uuidv4()}>
                    ဆိုက်ရောက်မည့် ဘူတာရွေးရန်
                  </Option>
                )}
              </Select>
            </div>

            <div className="flex-row flex justify-end">
              {getLaneStationResult.isLoading ? (
                <Button
                  variant="filled"
                  className="flex items-center gap-3 px-4 py-2 m-1"
                >
                  <Spinner color="indigo" />
                </Button>
              ) : (
                <Button
                  variant="filled"
                  className="flex items-center gap-3 px-4 py-2 m-1"
                  onClick={chooseStation}
                >
                  <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />
                  Select
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full order-2">
          <div className="flex flex-row bg-gray-300 items-center">
            <div className="w-16 p-2">
              <p>စဉ်</p>
            </div>
            <div className="flex-1">
              <p>ဘူတာအမည်</p>
            </div>

            <div className="w-36">ဆိုက်ရောက်ချိန်</div>
            <div className="w-36">ထွက်ခွာချိန်</div>
            <div className="w-24">ထည့်သွင်းမည်</div>
          </div>

          {getLaneStationResult.isSuccess &&
            TimeStation.map((stat, i) => {
              return (
                <div className="flex flex-row items-center py-2" key={uuidv4()}>
                  <div className="w-10">
                    <p>{i + 1}</p>
                  </div>
                  <div className="flex-1">
                    <p>{stat.name} </p>
                  </div>

                  <div className="w-40 px-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        ampm={false}
                        label="Arrived Time"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        inputRef={(element) => (fromRef.current[i] = element)}
                        
                      />
                    </LocalizationProvider>
                  </div>
                  <div className=" w-40">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        ampm={false}
                        label="Depature Time"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        inputRef={(element) => (toRef.current[i] = element)}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="w-24 flex flex-row justify-center">
                    { stat.check ? (
                      <IconButton>
                        <FaCheck size={25} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => DepatureTime(i)}>
                        <IoAddCircleOutline size={25} />
                      </IconButton>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StationDepature;
