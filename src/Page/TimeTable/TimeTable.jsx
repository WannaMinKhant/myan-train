import React, { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { BiTrash, BiHome } from "react-icons/bi";
import AlertComponent from "../../Components/AlertComponent";
import MyToolTip from "../../Components/MyToolTip";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import { Select, Option } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  Button,
  Input,
  IconButton,
  Spinner,
  Drawer,
  Typography,
} from "@material-tailwind/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import {
  useGetTimeTableQuery,
  useAddTimeTableMutation,
  useDeleteTimeTableMutation,
} from "../../ApiService/TimeTableSlice";
import { useGetTrainQuery } from "../../ApiService/trainSlice";
import { useGetStationQuery } from "../../ApiService/stationSlice";

const TimeTable = () => {
  const { data, isSuccess, isLoading, refetch } = useGetTimeTableQuery();
  const {
    data: trainData,
    isSuccess: trainSuccess,
    isLoading: trainLoading,
  } = useGetTrainQuery();
  const {
    data: stationData,
    isSuccess: stationSuccess,
    isLoading: stationLoading,
  } = useGetStationQuery();

  const [addTimeTable, addTimeTableResult] = useAddTimeTableMutation();
  const [delTimeTable, deleteTimeTableResult] = useDeleteTimeTableMutation();

  const [FromstationId, setFromStationId] = useState();
  const [TostationId, setToStationId] = useState();
  const [trainId, setTrainId] = useState();
  const [lane, setLane] = useState();
  const [open, setOpen] = useState(false);

  const toTimeRef = useRef();
  const fromTimeRef = useRef();

  const openDrawer = async (e) => {
    await setOpen(true);
  };
  const closeDrawer = () => setOpen(false);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((deleteCusResult) => {
      if (deleteCusResult.isConfirmed) {
        console.log(id);
        deleteTimeTable(id);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  const header = [
    {
      field: "train_id",
      headerName: "Train",
      flex: 1,
      renderCell: (params) => <p>{params.row.train.train_no}</p>,
    },
    {
      field: "station_id",
      headerName: "From Station",
      flex: 1,
      renderCell: (params) => <p>{params.row.from.name}</p>,
    },
    {
      field: "to_station_id",
      headerName: "To Station",
      flex: 1,
      renderCell: (params) => <p>{params.row.post.name}</p>,
    },
    {
      field: "fromtime",
      headerName: "From Time",
      flex: 1,
    },
    {
      field: "totime",
      headerName: "To Time",
      flex: 1,
    },
    {
      field: "category_id",
      headerName: "Lane",
      flex: 1,
      renderCell: (params) => (
        <p>
          {params.row.note == 0
            ? "လမ်းကြောင်းအပြည့်"
            : params.row.note == 1
            ? "လက်ဝဲရစ်"
            : "လက်ယာရစ်"}
        </p>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-row gap-4 justify-between">
          {/* <div> */}
          <MyToolTip styles={"bg-red-500"} content={"Delete"}>
            <IconButton
              onClick={() => confirmDelete(params.row.id)}
              variant="text"
              className="w-6 h-6 bg-red-200 p-4"
            >
              <BiTrash className="h-4 w-4 text-red-600" />
            </IconButton>
          </MyToolTip>
        </div>
      ),
    },
  ];

  const AddTimeTableToServer = async () => {
    const body = {
      train_id: trainId,
      station_id: FromstationId,
      platform_id: 1,
      fromtime: fromTimeRef.current.value,
      totime: toTimeRef.current.value,
      to_station_id: TostationId,
      note: lane,
      category_id: 2,
    };
    console.log(body);

    await addTimeTable(body);
    refetch();
  };

  const deleteTimeTable = async (id) => {
    await delTimeTable(id);
    refetch();
  };

  return (
    <div className="flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide">
      <div className="flex flex-row w-full h-fit justify-between items-center">
        <Breadcrumbs>
          <BiHome size={20} className="opacity-50" />
          <p className="font-poppins">Time Table</p>
        </Breadcrumbs>
      </div>
      <div className="flex md:flex-row lg:flex-row xl:flex-row  flex-col w-full mt-4">
        <div className="flex-1 h-full order-2">
          <Box sx={{ height: 500, width: "100%" }}>
            {isSuccess ? (
              <DataGrid
                rows={data?.data}
                columns={header}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                showCellVerticalBorder
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                loading={isLoading ? true : false}
              />
            ) : (
              <></>
            )}
          </Box>
        </div>
        <div className="flex flex-col md:w-1/3 lg:w-1/3 xl:w-1/3 w-full p-2 border-2 mx-2 rounded-xl order-1">
          {!trainLoading && !stationLoading && (
            <div className="flex flex-1 xl:flex-col md:flex-col flex-col gap-2 m-2">
              <div className="w-full">
                <Select label="Select Train" onChange={(e) => setTrainId(e)}>
                  {trainSuccess &&
                    trainData?.data.map((train) => (
                      <Option value={train.id.toString()} key={uuidv4()}>
                        {train.train_no}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="w-full">
                <Select
                  label="Select From Station"
                  onChange={(e) => setFromStationId(e)}
                >
                  {stationSuccess &&
                    stationData?.data?.map((station) => (
                      <Option value={station.id.toString()} key={uuidv4()}>
                        {station.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="w-full">
                <Select
                  label="Select To Station"
                  onChange={(e) => setToStationId(e)}
                >
                  {stationSuccess &&
                    stationData?.data?.map((station) => (
                      <Option value={station.id.toString()} key={uuidv4()}>
                        {station.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  label="From Time"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  inputRef={fromTimeRef}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  label="To Time"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  inputRef={toTimeRef}
                />
              </LocalizationProvider>

              <div className="w-full">
                <Select label="Select Lane" onChange={(e) => setLane(e)}>
                  <Option value="0" key={uuidv4()}>
                    လမ်းကြောင်းအပြည့်
                  </Option>
                  <Option value="1" key={uuidv4()}>
                    လက်ဝဲရစ်
                  </Option>
                  <Option value="2" key={uuidv4()}>
                    လက်ယာရစ်
                  </Option>
                </Select>
              </div>
              {/* <div className="flex-row flex justify-end">
              {addLaneResutl.isLoading ? (
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
                  onClick={AddLane}
                >
                  <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />
                  Add
                </Button>
              )}
            </div> */}
              {addTimeTableResult.isLoading ? (
                <Button>
                  <Spinner />
                </Button>
              ) : (
                <Button onClick={AddTimeTableToServer}>
                  <div className="flex flex-row justify-center items-center">
                    <IoAddCircleOutline size={20} className="mx-4" /> Add
                  </div>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
