
import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IoAddCircleOutline } from "react-icons/io5";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import MyToolTip from '../../Components/MyToolTip';
import WarnningComponent from "../../Components/WarnningComponent";

import {
    Button,
    Input,
    Typography,
    Textarea,
    Drawer,
    IconButton,
    Spinner,
} from "@material-tailwind/react";

import {
    useGetMessageQuery,
    useAddMessageMutation,
    useEditMessageMutation,
    useDeleteMessageMutation
} from '../../ApiService/messageSlice'
import { Breadcrumbs } from "@material-tailwind/react";
import { BiHome } from "react-icons/bi";


const AddMessage = () => {
    const titleRef = useRef();
    const edittitleRef = useRef();

    const [result,setResult] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const handleClick = () => {
        setOpenAlert(true);
      };
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenAlert(false);
    };

    const [editMsgState, setEditMsgState] = useState();
    const [open, setOpen] = useState(false);
    const [msgState, setMsgState] = useState("");
    const [msgEditState, setMsgEditState] = useState("");


    const { data, isLoading, isSuccess, refetch } = useGetMessageQuery();
    const [addMsg, addMessageResult] = useAddMessageMutation();
    const [editMsg, editMessageResult] = useEditMessageMutation();
    const [deleteMsg] = useDeleteMessageMutation();

    const openDrawer = async (e) => {
        console.log(e);
        setEditMsgState(e.id);
        edittitleRef.current.value = e.title;
        setMsgEditState(e.description);
        await setOpen(true);
    };
    const closeDrawer = () => setOpen(false);

    const AddMsgHandler = async (e) => {
        e.preventDefault();
        if(titleRef.current.value == "" || msgState == ""){
            setResult({
                success:"",
                isSuccess:false,
                warning:true,
                error:false,
                msg:"Please Enter All Data"
              });
              handleClick();
              return;
        }else if(msgState.length > 65000){
            setResult({
                success:"",
                isSuccess:false,
                warning:true,
                error:false,
                msg:"Your message is too long"
              });
              handleClick();
              return;
        }
       
        let body = {
            title: titleRef.current.value,
            description: msgState
        }
        await addMsg(body);
        refetch();
        titleRef.current.value = "";
        //discRef.current.value = "";
        setMsgState("")
    }

    const editCategoryHandler = async (e) => {
        //  e.preventDefault();
        let body = {
            id: editMsgState,
            title: edittitleRef.current.value,
            description: msgEditState,
        }
        await editMsg(body);
        refetch();
        edittitleRef.current.value = "";
        //editDiscRef.current.value = "";
        setMsgEditState("")
        closeDrawer();
    }
    const deleteMsgHandler = async (id) => {
        console.log(id)
        await deleteMsg(id);
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
                deleteMsgHandler(id)
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
            }
        });
    };
    const header = [

        {
            field: 'title',
            headerName: 'Title',
            width: 300,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex:1,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
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
    return (

        <div className="flex flex-col gap-4 px-16 max-h-full">
            <Drawer placement="right" open={open} onClose={closeDrawer}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Edit Message
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <form className="flex flex-col gap-6 p-4">
                    <Input
                        type="text"
                        label="Title"
                        defaultValue={open ? edittitleRef.name : ""}
                        inputRef={edittitleRef}
                    />
                    <Textarea
                        type="text-area"
                        label="Discription"
                        //  defaultValue={open ? editDiscRef.eng_name : ""}
                        value={msgEditState}
                        onChange={(e) => setMsgEditState(e.target.value)}
                    />

                    <Button onClick={editCategoryHandler}>
                        {editMessageResult.isLoading ? <Spinner /> : "Save"}
                    </Button>
                </form>
            </Drawer>
            <div className='flex flex-row w-full h-fit justify-between items-center'>
                <Breadcrumbs>
                    <BiHome size={20} className='opacity-50'/>
                    <p className="font-poppins">
                        Message
                    </p>
                </Breadcrumbs>
            </div>
            <div className="w-full px-6 py-2 h-22 border-2 border-gray-200 md:flex flex-row gap-2 items-end justify-center rounded-xl">
                <form className="flex flex-1 xl:flex-row md:flex-col gap-2 m-2 justify-end" onSubmit={AddMsgHandler} >
                    <div className='flex flex-col w-full gap-3'>
                        <Input
                            type="text"
                            label="Title"
                            // defaultValue={open ? editCustomerRef.customer : ""}
                            inputRef={titleRef}
                        />
                        <Textarea
                            type="text"
                            label="Message"
                            value={msgState}
                            onChange={(e) => setMsgState(e.target.value)}

                        />
                    </div>
                    <div className='flex flex-col justify-end'>
                        <div className="flex-none">
                            <Button
                                type="submit"
                                variant="outlined"
                                className="flex items-center gap-3 px-4 py-2 m-1">
                                {addMessageResult.isLoading ? <Spinner color="indigo" /> : <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />}
                                Add
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='flex flex-col w-full h-fit'>
                <Box sx={{ height: '100%', width: '100%' }}>
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

                        /> : <></>}
                </Box>
            </div>
            <WarnningComponent result={result} open={openAlert} handleClose={handleClose}/>
        </div>
    )
}

export default AddMessage