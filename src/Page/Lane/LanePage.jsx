import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { BiTrash, BiHome } from "react-icons/bi";
import { Breadcrumbs } from "@material-tailwind/react";
import AlertComponent from "../../Components/AlertComponent";
import MyToolTip from "../../Components/MyToolTip";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import { Select, Option } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaEdit } from "react-icons/fa";
import {
  Button,
  Input,
  IconButton,
  Spinner,
  Drawer,
  Typography,
} from "@material-tailwind/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IoAddCircleOutline } from "react-icons/io5";

import {
  useGetLaneQuery,
  useAddLaneMutation,
  useEditLaneMutation,
  useDeleteLaneMutation,
} from "../../ApiService/laneSlice";

const LanePage = () => {
  const { data, isSuccess, isLoading, refetch } = useGetLaneQuery();
  const [addlane, addLaneResutl] = useAddLaneMutation();
  const [editLane, editLaneResutl] = useEditLaneMutation();
  const [deleteLane, delLaneResult] = useDeleteLaneMutation();

  const [stationId, setStationId] = useState();

  const nameRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();

  const editNameRef = useRef();
  const editFromRef = useRef();
  const editToRef = useRef();

  //Drawer
  const [open, setOpen] = useState(false);
  const openDrawer = (e) => {
    console.log(e);
    editNameRef.current.value =e.name;
    editFromRef.current.value = e.from;
    editToRef.current.value = e.to;
    setStationId(e.rotation);
    setOpen(true);
  };
  const closeDrawer = () => setOpen(false);

  // alert box
  const [alertResult, setAlertResult] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const handleClick = () => {
    setOpenAlert(true);
  };



  const header = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "from",
      headerName: "From",
      flex: 1,
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
    },
    {
      field: "rotation",
      headerName: "လမ်းကြောင်း",
      flex: 1,
      renderCell:(params) => (
        <p>
            { params.row.rotation != 1 ? params.row.rotation == 0 ? "လမ်းကြောင်းပြည့်" : "လက်ယာရစ်" : "လက်ဝဲရစ်"}
        </p>
      )
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-row gap-4 justify-between">
          {/* <div> */}
          <MyToolTip styles={"bg-green-500"} content={"Edit"}>
            <IconButton
              onClick={() => openDrawer(params.row)}
              className="w-6 h-6 bg-green-200 p-4"
            >
              <FaEdit className="h-4 w-4 text-green-600 font-extrabold" />
            </IconButton>
          </MyToolTip>
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

  const AddLane = async () => {
    const body = {
        name: nameRef.current.value,
        from: fromRef.current.value,
        to: toRef.current.value,
        rotation: stationId,
        status:0,
        note:0,
    }

    await addlane(body);
    refetch();
    nameRef.current.value = "";
    fromRef.current.value = "";
    toRef.current.value = "";
    setStationId(0);
  };

  const editLaneHandler = async () => {

    const body = {
        name: editNameRef.current.value,
        from: editFromRef.current.value,
        to: editToRef.current.value,
        rotation: stationId,
        status:0,
        note:0,
    }
    await editLane(body);
    refetch();
    closeDrawer();
  };

  const DeleteLane = (id) => {
    deleteLane(id);
    refetch();
  }

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
         DeleteLane(id)
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  useEffect(()=>{
    if(addLaneResutl.isSuccess){
        setAlertResult(addLaneResutl);
        handleClick();
    }else{
      setAlertResult(addLaneResutl);
      handleClick();
    }
  },[addLaneResutl])

  useEffect(()=>{
    if(editLaneResutl.isSuccess){
        setAlertResult(editLaneResutl);
        handleClick();
    }else{
      setAlertResult(editLaneResutl);
      handleClick();
    }
  },[editLaneResutl])

  
  useEffect(()=>{
    if(delLaneResult.isSuccess){
        setAlertResult(delLaneResult);
        handleClick();
    }else{
      setAlertResult(delLaneResult);
      handleClick();
    }
  },[delLaneResult])


  return (
    <div className="flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide">
      <Drawer placement="right" open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Edit Train
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Input
            type="text"
            label="Name"
            defaultValue={open ? editNameRef.current.value : ""}
            inputRef={editNameRef}
          />
          <Input
            type="text"
            label="From"
            defaultValue={open ? editFromRef.current.value : ""}
            inputRef={editFromRef}
          />
          <Input
            type="text"
            label="To"
            defaultValue={open ? editToRef.current.value : ""}
            inputRef={editToRef}
          />
          <div className="w-full">
            <Select label="Select Station" defaultValue={stationId} onChange={(e) => setStationId(e)}>
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

          <Button onClick={editLaneHandler}>
            {editLaneResutl.isLoading ? <Spinner /> : "Save"}
          </Button>
        </form>
      </Drawer>
      <div className="flex flex-row w-full h-fit justify-between items-center">
        <Breadcrumbs>
          <BiHome size={20} className="opacity-50" />
          <p className="font-poppins">Lane</p>
        </Breadcrumbs>
      </div>
      <div className="flex md:flex-row lg:flex-row xl:flex-row  flex-col w-full mt-4">
        <div className="flex-1 h-full order-2">
          <Box sx={{ height: 400, width: "100%" }}>
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
          <div className="flex flex-1 xl:flex-col md:flex-col flex-col gap-2 m-2">
            <Input
              type="text"
              label="Name"
              // defaultValue={open ? editCustomerRef.customer : ""}
              inputRef={nameRef}
            />
            <Input
              type="text"
              label="From"
              // defaultValue={open ? editCustomerRef.customer : ""}
              inputRef={fromRef}
            />
            <Input
              type="text"
              label="To"
              // defaultValue={open ? editCustomerRef.customer : ""}
              inputRef={toRef}
            />

            <div className="w-full">
              <Select label="Select Station" onChange={(e) => setStationId(e)}>
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
            <div className="flex-row flex justify-end">
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
            </div>
          </div>
        </div>
      </div>
      <AlertComponent
        open={openAlert}
        handleClose={handleClose}
        result={alertResult}
      />
    </div>
  );
};

export default LanePage;
