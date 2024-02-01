import React, { useState, useRef,useEffect } from "react";
import Swal from "sweetalert2";
import { BiTrash, BiHome } from "react-icons/bi";
import { Breadcrumbs } from "@material-tailwind/react";
import AlertComponent from "../../Components/AlertComponent";
import MyToolTip from "../../Components/MyToolTip";
import Box from "@mui/material/Box";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Textarea } from "@material-tailwind/react";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  IconButton,
  Spinner,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import {
  useGetAdsQuery,
  useAddAdsMutation,
  useDeleteAdsMutation,
} from "../../ApiService/AdsSlice";
import WarnningComponent from "../../Components/WarnningComponent";

const AdvertisePage = () => {
  const { data, isSuccess, isLoading, refetch } = useGetAdsQuery();
  const [addAds, addAdsResult] = useAddAdsMutation();
  const [delAds] = useDeleteAdsMutation();

  const titleRef = useRef();
  const [MsgBody, setMsgBody] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
    const [activeVideo,setActiveVideo] = useState("");

  const ref = useRef(null);
  // 1. add state for tracking the selected files
  const [selectedFiles, setSelectedFiles] = useState();

  //Drawer
  const [open, setOpen] = useState(false);
  const openDrawer = (e) => {
    setActiveVideo("http://192.168.1.100/mts/public/" + e)
    setOpen(true);
  };
  const closeDrawer = () => setOpen(false);

  // alert box
  const [alertResult] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };


  const handleClickUpload = () => {
    ref.current?.click();
  };

  const handleChange = async (e) => {
    const file = e.currentTarget.files[0];
    setSelectedFiles(file);
    const objectUrl = window.URL.createObjectURL(file);
    setVideoUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };


   //alert box for warning
   const [result,setResult] = useState({});
   const [openWarn, setOpenWarn] = useState(false);
   const handleWarnClick = () => {
     setOpenWarn(true);
     };
   const handleWarnClose = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
     setOpenWarn(false);
   };
 
   let formData = new FormData();
  const AddAdsServer = async () => {

    if(titleRef.current.value == "" || MsgBody == "" || selectedFiles == undefined || selectedFiles == null) {
      setResult({
        success:"",
        isSuccess:false,
        warning:true,
        error:false,
        msg:"Please Enter Advertise Video and Field."
      });
      handleWarnClick();
      return;
    }
    
    formData.append("title", titleRef.current.value);
    formData.append("body", MsgBody);
    formData.append("file", selectedFiles);
    formData.append("note", 1);

    await addAds(formData);
    refetch();
    titleRef.current.value = "";
    setMsgBody("");
    setSelectedFiles(undefined);
  };

  const deletAds = (id) => {
    delAds(id);
    refetch();
  };

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
        deletAds(id);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  const header = [
    {
      field: "movie",
      headerName: "Movie",
      flex: 1,
      renderCell: (params) => (
        <div className="w-16 h-9 border-2 border-gray-800 ">
          <video
            autoPlay={false}
            loop
            muted
            // poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src={"http://192.168.1.100/mts/public/" + params.row.movie}
              type="video/mp4"
            />
          </video>
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      flex: 1,
    },
    {
      field: "body",
      headerName: "Description",
      flex: 1,
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
          <MyToolTip styles={"bg-red-500"} content={"Play"}>
            <IconButton
              onClick={()=>openDrawer(params.row.movie)}
              variant="text"
              className="w-6 h-6 bg-blue-200 p-4"
            >
              <FaRegPlayCircle className="h-4 w-4 text-blue-600" />
            </IconButton>
          </MyToolTip>
        </div>
      ),
    },
  ];

  useEffect(() =>{
    if(addAdsResult.isSuccess){
      setResult({
      success:"",
      isSuccess:true,
      warning:false,
      error:false,
      msg:"Success Process"
    });
    handleWarnClick();
    
    }else if(addAdsResult.isError){
      setResult({
        success:"",
        isSuccess:false,
        warning:false,
        error:true,
        msg:"Something went wrong, Please check your video file"
      });
      handleWarnClick();
      
    }
    
  },[addAdsResult]);
  return (
    <div className="flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide">
      <div className="flex flex-row w-full h-fit justify-between items-center">
        <Breadcrumbs>
          <BiHome size={20} className="opacity-50" />
          <p className="font-poppins">Manage Ads</p>
        </Breadcrumbs>
      </div>
      <div className="flex flex-row w-full mt-4">
        <div className="flex-row h-full w-2/3 order-2">
          <Box sx={{ height: 650, width: "100%" }}>
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
                density='compact'
                pageSizeOptions={[5,10,20,50,100]}
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
              <><Spinner/></>
            )}
          </Box>
        </div>
        <div className="flex flex-col md:w-1/3 lg:w-1/3 xl:w-1/3 w-full p-2 border-2 mx-2 rounded-xl order-1">
          <div className="flex flex-col gap-2 m-2">
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
              value={MsgBody}
              onChange={(e) => setMsgBody(e.target.value)}
            />
            {!selectedFiles && (
              <div
                className="p-4 flex flex-col items-center gap-2 bg-violet-50 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer border-2 border-dotted border-purple-400"
                onClick={handleClickUpload}
              >
                <CloudArrowUpIcon className="w-6 h-6" />
                <span>Choose some files to upload</span>
                <input
                  type="file"
                  label="Upload Video"
                  ref={ref}
                  className="hidden"
                  onChange={handleChange}
                  accept="video/*"
                />
              </div>
            )}
            <div className="relative p-2">
              {selectedFiles && (
                <Player>
                  <source src={videoUrl} />
                </Player>
              )}
              {selectedFiles && (
                <div
                  className="absolute top-0 right-0 w-5 h-5 bg-red-400 rounded-full cursor-pointer hover:h-6 hover:w-6 hover:bg-red-700"
                  onClick={() => setSelectedFiles(undefined)}
                >
                  <XMarkIcon color="white" />
                </div>
              )}
            </div>

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
      <Dialog open={open} handler={closeDrawer}>
        <DialogBody>
          <Player autoPlay>
            <source src={activeVideo} />
          </Player>
        </DialogBody>
      </Dialog>

      <AlertComponent
        open={openAlert}
        handleClose={handleClose}
        result={alertResult}
      />
      <WarnningComponent result={result} open={openWarn} handleClose={handleWarnClose}/>
    </div>
  );
};

export default AdvertisePage;
