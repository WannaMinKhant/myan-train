
import React, { useState, useRef, useEffect } from 'react'
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
import AlertComponent from '../../Components/AlertComponent';

import {
    Button,
    Input,
    Typography,
    Drawer,
    IconButton,
    Spinner,
} from "@material-tailwind/react";

import {
    useGetStationQuery,
    useAddStationMutation,
    useEditStationMutation,
    useDeleteStationMutation
} from '../../ApiService/stationSlice'

const AddStation = () => {
    const stationRef = useRef();
    const stationEngRef = useRef();
    const editstationRef = useRef();
    const editstationEngRef = useRef();
    const stationOrderRef = useRef();
    const editStationOrderRef = useRef();

    const [editStationState, setEditStationState] = useState();
    const [open, setOpen] = useState(false);

    const [alertResult, setAlertResult] = useState(false);


    const { data, isLoading, isSuccess, refetch } = useGetStationQuery();
    const [addStation, addStationResult] = useAddStationMutation();
    const [editStation, editStationResult] = useEditStationMutation();
    const [deleteStation, deleteStationResult] = useDeleteStationMutation();

    // alert box
    const [openAlert,setOpenAlert] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenAlert(false);
    };
  
    const handleClick = () => {
        setOpenAlert(true);
    };



    const openDrawer = async (e) => {

        console.log(e);
        setEditStationState(e.id);
        editstationRef.current.value = e.name;
        editstationEngRef.current.value = e.eng_name;
        editStationOrderRef.current.value = e.station_order
        await setOpen(true);
    };
    const closeDrawer = () => setOpen(false);

    const addStationHandler = async (e) => {
        e.preventDefault();
        let body = {
            category_id: 1,
            name: stationRef.current.value,
            eng_name: stationEngRef.current.value,
            station_order:stationOrderRef.current.value,
        }
        await addStation(body);
        refetch();
        stationRef.current.value = "";
        stationEngRef.current.value = "";
        stationOrderRef.current.value = "";
    }

    const editStationHandler = async (e) => {

        if(editStationResult.isLoading ) return;
        //  e.preventDefault();
        let body = {
            id: editStationState,
            category_id: "1",
            name: editstationRef.current.value,
            eng_name: editstationEngRef.current.value,
            station_order: editStationOrderRef.current.value,
        }
        await editStation(body);
        refetch();
        editstationRef.current.value = "";
        editstationEngRef.current.value = "";
        editStationOrderRef.current.value = "";
        closeDrawer();
    }
    const deleteStationHandler = async (id) => {
        console.log(id)
        await deleteStation(id);
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
                deleteStationHandler(id)
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
            }
        });
    };
    const header = [

        {
            field: 'name',
            headerName: 'ဘူတာ',
            flex:1,
            editable: true,
        },
        {
            field: 'eng_name',
            headerName: 'Station',
            flex:1,
        },
        {
            field: 'station_order',
            headerName: 'Station Order',
            flex:1,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
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

    useEffect(()=>{
        if(deleteStationResult.isSuccess){
            setAlertResult(deleteStationResult);
            handleClick();
        }else{
            setAlertResult(deleteStationResult);
            handleClick();
        }
    },[deleteStationResult]);

    useEffect(()=>{
        if(addStationResult.isSuccess){
            setAlertResult(addStationResult);
            handleClick();
        }else{
            setAlertResult(addStationResult);
            handleClick();
        }
    },[addStationResult]);

    useEffect(()=>{
        if(editStationResult.isSuccess){
            setAlertResult(editStationResult);
            handleClick();
        }else{
            setAlertResult(editStationResult);
            handleClick();
        }
    },[editStationResult]);

    return (

        <div className="flex flex-col gap-4 px-16 max-h-full">
            <Drawer placement="right" open={open} onClose={closeDrawer}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Edit Station
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <form className="flex flex-col gap-6 p-4">
                    <Input
                        type="text"
                        label="ဘူတာ"
                        defaultValue={open ? editstationRef.current.value : ""}
                        inputRef={editstationRef}
                    />
                    <Input
                        type="text"
                        label="Station"
                        defaultValue={open ? editstationEngRef.current.value : ""}
                        inputRef={editstationEngRef}
                    />
                    <Input
                        type="text"
                        label="Station"
                        defaultValue={open ? editStationOrderRef.station_order : ""}
                        inputRef={editStationOrderRef}
                    />

                    <Button onClick={editStationHandler}>
                        {editstationRef.isLoading ? <Spinner /> : "Save"}
                    </Button>
                </form>
            </Drawer>
            <div className='flex flex-row w-full h-fit justify-between items-center'>
                <Breadcrumbs>
                    <BiHome size={20} className='opacity-50'/>
                    <p className="font-poppins">
                        Station
                    </p>
                </Breadcrumbs>
            </div>
            <div className="w-full px-6 py-2 h-22 border-2 border-gray-200 md:flex flex-row gap-2 items-end justify-center rounded-xl">
                <form className="flex flex-1 xl:flex-row md:flex-col flex-col gap-2 m-2" onSubmit={addStationHandler}>
                    <Input
                        type="text"
                        label="ဘူတာ အမည် (မြန်မာ)"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={stationRef}
                    />
                    <Input
                        type="text"
                        label="Station Name (Eng)"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={stationEngRef}
                    />
                    <Input
                        type="number"
                        label="Station Order (Example: 1)"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={stationOrderRef}
                    />
                    {/* <div className="md:w-72 lg:w-72 w-20">
                        <Select label="Select Way" onChange={(e) => setCateValue(e)} >
                            <Option value='1'>Circular Train</Option>
                            <Option value='2'>Express Train</Option>
                        </Select>
                    </div> */}
                    <div className="flex-none">
                        <Button
                            type="submit"
                            variant="outlined"
                            className="flex items-center gap-3 px-4 py-2 m-1">
                            {addStationResult.isLoading ? <Spinner color="indigo" /> : <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />}
                            Add
                        </Button>
                    </div>

                </form>
            </div>
            <div className='flex flex-col w-full'>
                <Box sx={{ height: 400, width: '100%' }}>
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
                            
                            // onRowClick={(e, b) => {
                            //    const checked = b.target;
                            //    console.log(checked)
                            //     //console.log(checked.includes("bg-green-200"))
                            //     // if(b.target.role != null) return
                            //     openDrawer(e.row)
                            // }

                            // }
                            density='compact'
                            pageSizeOptions={[5,10,25,50,100]}
                            checkboxSelection
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

                        /> : <></>}
                </Box>
            </div>
            <AlertComponent open={openAlert} handleClose={handleClose} result={alertResult}/>
        </div>
    )
}

export default AddStation