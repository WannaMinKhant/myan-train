
import React, { useState, useRef } from 'react'
import { Select, Option } from "@material-tailwind/react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IoAddCircleOutline } from "react-icons/io5";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BiTrash, BiHome } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import MyToolTip from '../../Components/MyToolTip';
import { Breadcrumbs } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import {
    Button,
    Input,
    Typography,
    Drawer,
    IconButton,
    Spinner,
} from "@material-tailwind/react";
import WarnningComponent from "../../Components/WarnningComponent";
import { useGetLaneQuery } from '../../ApiService/laneSlice';
import {
    useGetTrainQuery,
    useAddTrainMutation,
    useEditTrainMutation,
    useDeleteTrainMutation
} from '../../ApiService/trainSlice'

const AddTrain = () => {
    const trainRef = useRef();
    const trainEngRef = useRef();
    const edittrainRef = useRef();
    const edittrainEngRef = useRef();

    const [cateValue, setCateValue] = useState(0)
    const [laneValue,setLaneValue] = useState(0)
    
    const [laneName,setLaneName] = useState();

    const [editTrainState, setEditTrainState] = useState();
    const [open, setOpen] = useState(false);

    const {data:LaneList,isSuccess:laneSuccess} = useGetLaneQuery();

    const { data, isLoading, isSuccess, refetch } = useGetTrainQuery();
    const [addTrain, addTrainResult] = useAddTrainMutation();
    const [editTrain, editTrainResult] = useEditTrainMutation();
    const [deleteTrain] = useDeleteTrainMutation();

    const openDrawer = (e) => {
        console.log(e);
        setEditTrainState(e.id);
        edittrainRef.current.value = e.train_no;
        edittrainEngRef.current.value = e.eng_train_no;
        // laneShowRef.current.value = e.lane.name;
        // wayShowRef.current.value = e.category_id == 1 ? "မြို့ပတ်ရထား" : "အမြန်ရထား";
        setCateValue(e.category_id);
        setLaneValue(e.lane_id);
        setLaneName(e.lane.name)
        setOpen(true);

    };
    const closeDrawer = () => setOpen(false);


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


    const addTrainHandler = async (e) => {
        if(laneValue == 0 || cateValue == 0 || trainRef.current.value == "" || trainEngRef.current.value =="") {
            setResult({
                success:"",
                isSuccess:false,
                warning:true,
                error:false,
                msg:"Please Enter all Data."
              });
              handleWarnClick();
              return;
        }
        e.preventDefault();
        let body = {
            category_id: cateValue,
            train_no: trainRef.current.value,
            eng_train_no: trainEngRef.current.value,
            lane_id: laneValue,
            status: "0",
            note: "0"
        }
        await addTrain(body);
        refetch();
        trainRef.current.value = "";
        trainEngRef.current.value = "";
    }

    const editTrainHandler = async (e) => {
        //  e.preventDefault();
        if(laneValue == 0 || cateValue == 0 || edittrainRef.current.value == "" || edittrainEngRef.current.value == "") {
            setResult({
                success:"",
                isSuccess:false,
                warning:true,
                error:false,
                msg:"Please Enter all Data."
              });
              handleWarnClick();
              return;
        }
        let body = {
            id: editTrainState,
            category_id: cateValue,
            train_no: edittrainRef.current.value,
            eng_train_no: edittrainEngRef.current.value,
            lane_id:laneValue,
        }
        await editTrain(body);
        refetch();
        edittrainRef.current.value = "";
        edittrainEngRef.current.value = "";
        setLaneValue(0)
        setCateValue(0)
        closeDrawer();
    }
    const deleteTrainHandler = async (id) => {
        console.log(id)
        await deleteTrain(id);
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
                console.log(id)
                deleteTrainHandler(id)
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
            }
        });
    };

    const header = [

        {
            field: 'train_no',
            headerName: 'ရထား',
            width: 200,
            editable: false,
        },
        {
            field: 'eng_train_no',
            headerName: 'Train',
            width: 100,
            editable: false,
        },
        {
            field: 'category_id',
            headerName: 'Way',
            width: 150,
            editable: false,
            renderCell: (params) => (
                <p>
                    { params.row.category_id == 2 ? "အမြန်ရထား" : "မြို့ပတ်ရထား"}
                </p>
            )
        },
        {
            field: 'lane_id',
            headerName: 'Lane',
           flex:1,
            editable: false,
            renderCell: (params) => (
                <p>
                    { params.row.lane.from + " - " + params.row.lane.to + " ( "  + params.row.lane.name + " )" } 
                </p>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width:150,
            renderCell: (params) => (
                <div className="flex flex-row gap-4 justify-between">
                    {/* <div> */}
                    <MyToolTip styles={'bg-green-500'} content={'Edit'}>
                        <IconButton
                            onClick={() => openDrawer(params.row)}
                            // onClick={() => console.log(params)}
                            className="w-6 h-6 bg-green-200 p-4"
                        >
                            <FaEdit className="h-4 w-4 text-green-600 font-extrabold" />
                        </IconButton>
                    </MyToolTip>
                    <MyToolTip styles={'bg-red-500'} content={'Delete'}>
                        <IconButton
                            onClick={() => confirmDelete(params.row.id)}
                            variant="text"
                            className="w-6 h-6 bg-red-200 p-4"
                        >
                            <BiTrash className="h-4 w-4 text-red-600" />
                        </IconButton>
                    </MyToolTip>
                </div>
            )
        },
    ];

    const way = [
        {
            value:'1',
            name:'မြို့ပါတ်ရထား',
        },{
            value:'2',
            name:'အမြန်ရထား',
        }
    ];

    return (
        <div className="flex flex-col gap-4 px-16 max-h-full">
            <Drawer placement="right" open={open} onClose={closeDrawer} width={500}>
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
                        label="ရထား"
                        defaultValue={open ? edittrainRef.train_no : ""}
                        inputRef={edittrainRef}
                    />
                    <Input
                        type="text"
                        label="Train"
                        defaultValue={open ? edittrainEngRef.eng_train_no : ""}
                        inputRef={edittrainEngRef}
                    />
                    
                    <div className="w-full">
                        <Select label="Select Way"  value={cateValue == 1 ? "မြို့ပတ်ရထား" : "အမြန်ရထား"}>
                            {
                                way.map((w)=>(
                                <Option 
                                onClick={()=>setCateValue(w.value)}
                                value={w.value}
                                key={uuidv4()}
                                >
                                    {w.name}
                                </Option>
                                ))
                            }
                        </Select>
                    </div>

                    
                    <div className="w-full">
                    <Select label="Select Lane" value={laneName}>
                        {
                           laneSuccess ? LaneList.data.map((lane)=>(
                            <Option 
                            onClick={()=> setLaneValue(lane.id)}
                            value={lane.id}
                            key={uuidv4()}
                            >
                                {lane.name}</Option>
                            ))  : <Option value={"0"}>{"Select Lane"}</Option>
                        }
                    </Select>
                    </div>

                    <Button onClick={editTrainHandler}>
                        {editTrainResult.isLoading ? <Spinner /> : "Save"}
                    </Button>
                </form>
            </Drawer>
                <Breadcrumbs>
                    <BiHome size={20} className='opacity-50'/>
                    <p className="font-poppins">
                        Train
                    </p>
                </Breadcrumbs>
            <div className="w-full px-6 py-2 h-22 border-2 border-gray-200 md:flex flex-row gap-2 items-end justify-center rounded-xl">
                <form className="flex flex-1 xl:flex-row md:flex-col gap-2 m-2" onSubmit={addTrainHandler}>
                    <Input
                        type="text"
                        label="ရထား"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={trainRef}
                    />
                    <Input
                        type="text"
                        label="Train"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={trainEngRef}
                    />
                    <div className="w-72">
                        <Select label="Select Way" onChange={(e) => setCateValue(e)} >
                            <Option value='1'>မြို့ပတ်ရထား</Option>
                            <Option value='2'>အမြန်ရထား</Option>
                        </Select>
                    </div>
                    <div className="w-full md:w-96 lg:w-96">
                        <Select label="Select Lane" onChange={(e) => setLaneValue(e)} >
                            {
                            laneSuccess ? LaneList.data.map((lane)=>(
                                <Option value={lane.id}>{lane.name}</Option>
                                ))  : <Option value={"0"}>{"Select Lane"}</Option>
                            }
                        </Select>
                    </div>
                    <div className="flex-none">
                        <Button
                            type="submit"
                            variant="outlined"
                            className="flex items-center gap-3 px-4 py-2 m-1">
                            {addTrainResult.isLoading ? <Spinner color="indigo" /> : <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />}
                            Add
                        </Button>
                    </div>

                </form>
            </div>
            <div className='flex flex-col w-full'>
                <Box sx={{ height: 650, width: '100%' }}>
                    {isSuccess ?
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

                            loading={isLoading}

                        /> : <><div className='w-full h-full justify-center items-center'><Spinner/></div></>}
                </Box>
            </div>
            <WarnningComponent result={result} open={openWarn} handleClose={handleWarnClose}/>
        </div>
    )
}

export default AddTrain