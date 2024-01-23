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
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { MdOutlineRemoveCircle } from "react-icons/md";
import {
  Button,
  Input,
  IconButton,
  Spinner,
  Drawer,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IoAddCircleOutline } from "react-icons/io5";
import WarnningComponent from "../../Components/WarnningComponent";
import {
  useGetLaneQuery,
  useAddLaneMutation,
  useEditLaneMutation,
  useDeleteLaneMutation,
} from "../../ApiService/laneSlice";
import { useGetStationQuery } from "../../ApiService/stationSlice";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const {
    data: station,
    isLoading: stationLoading,
    isSuccess: stationSuccess,
  } = useGetStationQuery();
  

  const [newStation,setNewStation] = useState([]);
  const [editStation,setEditStation] = useState([]);
  const [editStationId,setEditStationID] = useState([]);

  const closeDialog = () =>{
    setOpenDialog(false);
    setNewStation([]);
  }

  const closeEditDialog = () =>{
    setOpenEditDialog(false);
    setEditStationID([]);
  }

  const confirmEditDialog = () =>{
    setOpenEditDialog(false);
    let lstStation = editStationId.map((st) => st.id)
    console.log(lstStation);
  }

  const confirmStation = () =>{
    setOpenDialog(false);
    let lstStation = newStation.map((st) => st.id)
    console.log(lstStation);
  }

  //Drawer
  const [open, setOpen] = useState(false);
  const openDrawer = (e) => {
    console.log(e);
    editNameRef.current.value =e.name;
    editFromRef.current.value = e.from;
    editToRef.current.value = e.to;

    let eStation = e.note.map((note)=> (station.data.filter((st)=> {
      return st.id == note 
    })));
    setEditStation(eStation);
    // console.log(e.note)
    // console.log(eStation)
    setStationId(e.rotation);
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
    setEditStationID([]);
  };

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


  const header = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "from",
      headerName: "From",
      width: 150,
    },
    {
      field: "to",
      headerName: "To",
      width: 150,
    },
    {
      field: "rotation",
      headerName: "လမ်းကြောင်း",
      width: 150,
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
    if(nameRef.current.value == "" || fromRef.current.value == "" || toRef.current.value == "" || newStation.length == 0){
      setResult({
        success:"",
        isSuccess:false,
        warning:true,
        error:false,
        msg:"Please Enter all Data for this lane."
      });
      handleWarnClick();
      return;
    }
    let lstStation = newStation.map((st) => st.id)
    const body = {
        name: nameRef.current.value,
        from: fromRef.current.value,
        to: toRef.current.value,
        rotation: stationId,
        status:0,
        note:lstStation,
    }

    await addlane(body);
    refetch();
    nameRef.current.value = "";
    fromRef.current.value = "";
    toRef.current.value = "";
    setStationId(0);
    setNewStation([]);
  };

  const editLaneHandler = async () => {
    if(editStationId.length > 0) return;
    let lstStation = editStationId.map((st) => st.id)


    if(editNameRef.current.value == "" || editFromRef.current.value == "" || editToRef.current.value == ""){
      setResult({
        success:"",
        isSuccess:false,
        warning:true,
        error:false,
        msg:"Please Enter all Data for this lane."
      });
      handleWarnClick();
      return;
    }
   
    const body = {
        name: editNameRef.current.value,
        from: editFromRef.current.value,
        to: editToRef.current.value,
        rotation: stationId,
        status:0,
        note:lstStation,
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

  const addToNewItem = (stat) => {
    console.log(stat)

    // let exists = newStation.some((st)=> st.id === stat.id);
    // if(exists) return;
    setNewStation([...newStation,stat]);
  }

  const removeItem = (stat) => {
    setNewStation([...newStation.filter((item) => item.id !== stat.id)]);
  };

  const editToNewItem = (stat) => {
    console.log(stat)

    // let exists = editStationId.some((st)=> st.id === stat.id);
    // if(exists) return;
    setEditStationID([...editStationId,stat]);
  }

  const editRemoveItem = (stat) => {
    setEditStationID([...editStationId.filter((item) => item.id !== stat.id)]);
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
      <Drawer placement="right" open={open} onClose={closeDrawer} size={400}>
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
            <Select label="Select Way" defaultValue={stationId} onChange={(e) => setStationId(e)}>
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
         
            {
              editStation.length > 0 && <div className="border-2 rounded-lg h-44 overflow-y-auto ">
                <div className="grid-cols-3 grid gap-1">
                {
                  editStationId.length > 0 ?editStationId.map((stat)=>(
                    <div className="p-1 rounded-lg bg-green-200 m-1 text-center text-sm">{stat.name}</div>
                  )) : editStation.map((stat)=>(
                    <div className="p-1 rounded-lg bg-green-200 m-1 text-center text-sm">{stat[0].name}</div>
                  ))
                }
              </div>
            </div>
            }
            <button
              className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={setOpenEditDialog}
            >
              Select Lane
            </button>

            <Dialog
              open={openEditDialog}
              handler={closeEditDialog}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader>လမ်းကြောင်းရှိ ဘူတာများ ပြင်ဆင်ရန်</DialogHeader>
              <DialogBody>
                <div className="flex flex-row w-full  h-96 select-none">
                  <div className="flex flex-col w-1/2 p-2 overflow-y-auto text-xs">
                    {
                      stationSuccess && station.data.map((stat,i)=>
                        <div className="flex justify-between items-center border-2 p-2 mt-1 rounded-md flex-row hover:bg-blue-200" key={i.toString()} >
                          <div>
                            {stat.name} 
                          </div>
                          <div className=" cursor-pointer" onClick={()=>editToNewItem(stat)}>
                            <BsFillArrowRightCircleFill color="green" size={20}/>
                          </div>
                         
                        </div>
                      )
                    }
                  </div>
                  <div className="flex flex-col w-1/2 p-2 h-full overflow-y-auto text-xs ">
                  {
                    editStationId.length > 0 &&  editStationId.map((stat,i)=>
                        <div className="flex justify-between item-center border-2 p-2 mt-1 rounded-md flex-row hover:bg-green-200" key={i.toString()} >
                          <div className="">
                            {stat.name} 
                          </div>
                          <div className="cursor-pointer" onClick={()=>editRemoveItem(stat)}>
                           <MdOutlineRemoveCircle color="red" size={20}/>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={closeEditDialog}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={confirmEditDialog}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>



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
              <></>
            )}
          </Box>
        </div>
        <div className="flex flex-col md:w-1/4 lg:w-1/4 xl:w-1/4 w-full p-2 border-2 mx-2 rounded-xl order-1">
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
              <Select label="Select Way" onChange={(e) => setStationId(e)}>
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
            <button
              className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={setOpenDialog}
            >
              Select Lane
            </button>
              
            {
              newStation.length > 0 && <div className="border-2 rounded-lg h-44 overflow-y-auto ">
                <div className="grid-cols-3 grid gap-1">
                {
                  newStation.map((stat)=>(
                    <div className="p-1 rounded-lg bg-green-200 m-1 text-center text-sm">{stat.name}</div>
                  ))
                }
              </div>
            </div>
            }


            <Dialog
              open={openDialog}
              handler={closeDialog}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader>လမ်းကြောင်းရှိ ဘူတာများ ထည့်သွင်းရန်</DialogHeader>
              <DialogBody>
                <div className="flex flex-row w-full  h-96 select-none">
                  <div className="flex flex-col w-1/2 p-2 overflow-y-auto text-xs">
                    {
                      stationSuccess && station.data.map((stat,i)=>
                        <div className="flex justify-between items-center border-2 p-2 mt-1 rounded-md flex-row hover:bg-blue-200" key={i.toString()} >
                          <div>
                            {stat.name} 
                          </div>
                          <div className=" cursor-pointer" onClick={()=>addToNewItem(stat)}>
                            <BsFillArrowRightCircleFill color="green" size={20}/>
                          </div>
                         
                        </div>
                      )
                    }
                  </div>
                  <div className="flex flex-col w-1/2 p-2 h-full overflow-y-auto text-xs ">
                  {
                    newStation.length > 0 &&  newStation.map((stat,i)=>
                        <div className="flex justify-between item-center border-2 p-2 mt-1 rounded-md flex-row hover:bg-green-200" key={i.toString()} >
                          <div className="">
                            {stat.name} 
                          </div>
                          <div className="cursor-pointer" onClick={()=>removeItem(stat)}>
                           <MdOutlineRemoveCircle color="red" size={20}/>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={closeDialog}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={confirmStation}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>

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
       <WarnningComponent result={result} open={openWarn} handleClose={handleWarnClose}/>
    </div>
  );
};

export default LanePage;
