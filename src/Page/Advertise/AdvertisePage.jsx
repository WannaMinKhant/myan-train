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
import { Textarea } from "@material-tailwind/react";
import 'video-react/dist/video-react.css'; 
import { Player } from 'video-react';
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";


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

import { useGetAdsQuery,useAddAdsMutation,useEditAdsMutation,useDeleteAdsMutation } from "../../ApiService/AdsSlice";

const AdvertisePage = () => {

    const { data,isSuccess,isLoading,refetch} = useGetAdsQuery();
    const [addAds, addAdsResult] = useAddAdsMutation();


    
  const titleRef = useRef();
  const bodyRef = useRef();

  const edittitleRef = useRef();
  const editbodyRef = useRef();

  const ref = useRef(null);
  // 1. add state for tracking the selected files
  const [selectedFiles, setSelectedFiles] = useState([]);
    
  //Drawer
  const [open, setOpen] = useState(false);
  const openDrawer = (e) => {
    console.log(e);
    edittitleRef.current.value =e.name;
    editbodyRef.current.value = e.from;
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

   const handleClickUpload = () => {
    ref.current?.click();
  };

   const handleChange = () =>{

   }

  const AddAdsServer = async() =>{

  }

  const header = [];


  return (
    <div className="flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide">
    <Drawer placement="right" open={open} onClose={closeDrawer}>
      <div className="mb-2 flex items-center justify-between p-4">
        <Typography variant="h5" color="blue-gray">
          Edit Ads
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <XMarkIcon strokeWidth={2} className="h-5 w-5" />
        </IconButton>
      </div>
      <form className="flex flex-col gap-6 p-4">
        <Input
          type="text"
          label="Name"
        //   defaultValue={open ? editNameRef.current.value : ""}
        //   inputRef={editNameRef}
        />
        <Input
          type="text"
          label="From"
        //   defaultValue={open ? editFromRef.current.value : ""}
        //   inputRef={editFromRef}
        />
        <Input
          type="text"
          label="To"
        //   defaultValue={open ? editToRef.current.value : ""}
        //   inputRef={editToRef}
        />
        {/* <div className="w-full">
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
        </div> */}

        {/* <Button onClick={editLaneHandler}>
          {editLaneResutl.isLoading ? <Spinner /> : "Save"}
        </Button> */}
      </form>
    </Drawer>
    <div className="flex flex-row w-full h-fit justify-between items-center">
      <Breadcrumbs>
        <BiHome size={20} className="opacity-50" />
        <p className="font-poppins">Manage Ads</p>
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
            label="Title"
            // defaultValue={open ? editCustomerRef.customer : ""}
            inputRef={titleRef}
          />
          <Textarea
            type="text"
            label="Description"
            // defaultValue={open ? editCustomerRef.customer : ""}
            inputRef={bodyRef}
          />
          <input 
          type="file"
          label="Upload Video"
          ref ={ref}
          className="hidden"
          onChange={handleChange}
          accept="video/*"
          />


          {/* <div className="w-full">
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
          </div> */}
          <div className="flex-row flex justify-end">
            {addAdsResult.isLoading ? (
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
                onClick={AddAdsServer}
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
  )
}

export default AdvertisePage
