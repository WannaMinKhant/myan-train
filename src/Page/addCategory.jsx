
import React, { useState, useRef, useEffect } from 'react'
import { Select, Option } from "@material-tailwind/react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IoAddCircleOutline } from "react-icons/io5";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import MyToolTip from '../Components/MyToolTip';

import {
    Button,
    Input,
    Card,
    Typography,
    Drawer,
    IconButton,
    Spinner,
    Tooltip,
} from "@material-tailwind/react";

import {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation
} from '../ApiService/catagorySlice'

const AddCategory = () => {
    const nameRef = useRef();
    const engNameRef = useRef();
    const editnameRef = useRef();
    const editengNameRef = useRef();
    const [cateValue, setCateValue] = useState()

    const [editCategoryState, setEditategoryState] = useState();
    const [open, setOpen] = useState(false);


    const { data, isLoading, isSuccess, refetch } = useGetCategoryQuery();
    const [addCategory, addCategoryResult] = useAddCategoryMutation();
    const [editCategory, editCategoryResult] = useEditCategoryMutation();
    const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();

    const openDrawer = async (e) => {
        console.log(e);
        setEditategoryState(e.id);
        editnameRef.current.value = e.name;
        editengNameRef.current.value = e.eng_name;
        await setOpen(true);
    };
    const closeDrawer = () => setOpen(false);

    const AddCategoryHandler = async (e) => {
        e.preventDefault();
        let body = {
            name: nameRef.current.value,
            eng_name: engNameRef.current.value,
            status: "0",
            note: "0"
        }
        await addCategory(body);
        refetch();
        nameRef.current.value = "";
        engNameRef.current.value = "";
    }

    const editCategoryHandler = async (e) => {
        //  e.preventDefault();
        let body = {
            id: editCategoryState,
            name: editnameRef.current.value,
            eng_name: editengNameRef.current.value,
        }
        await editCategory(body);
        refetch();
        editnameRef.current.value = "";
        editengNameRef.current.value = "";
        closeDrawer();
    }
    const deleteCategoryHandler = async (id) => {
        console.log(id)
        await deleteCategory(id);
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
                deleteCategoryHandler(id)
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
            }
        });
    };
    const header = [

        {
            field: 'name',
            headerName: 'အမျိုးအစား',
            width: 300,
            editable: true,
        },
        {
            field: 'eng_name',
            headerName: 'Category',
            width: 400,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <div className="flex flex-row gap-4 justify-between">
                    {/* <div> */}
                    <MyToolTip style={'bg-green-500'} content={'Edit'}>
                        <IconButton
                            onClick={() => openDrawer(params.row)}
                            // onClick={() => console.log(params)}
                            className="w-6 h-6 bg-green-200 p-4"
                        >
                            <FaEdit className="h-4 w-4 text-green-600 font-extrabold" />
                        </IconButton>
                    </MyToolTip>
                    <MyToolTip style={'bg-red-500'} content={'Delete'}>
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
                        Edit Category
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <form className="flex flex-col gap-6 p-4">
                    <Input
                        type="text"
                        label="အမျိုးအစား"
                        defaultValue={open ? editnameRef.name : ""}
                        inputRef={editnameRef}
                    />
                    <Input
                        type="text"
                        label="Category"
                        defaultValue={open ? editengNameRef.eng_name : ""}
                        inputRef={editengNameRef}
                    />

                    <Button onClick={editCategoryHandler}>
                        {editCategoryResult.isLoading ? <Spinner /> : "Save"}
                    </Button>
                </form>
            </Drawer>
            <div className="flex-row w-full justify-start flex">
                <p className="px-4 py-2 bg-[#57626c] rounded-lg text-white font-bold">
                    Add Category
                </p>
            </div>
            <div className="w-full px-6 py-2 h-22 border-2 border-gray-200 md:flex flex-row gap-2 items-end justify-center rounded-xl">
                <form className="flex flex-1 xl:flex-row md:flex-col gap-2 m-2" onSubmit={AddCategoryHandler}>
                    <Input
                        type="text"
                        label="အမျိုးအစား"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={nameRef}
                    />
                    <Input
                        type="text"
                        label="Category"
                        // defaultValue={open ? editCustomerRef.customer : ""}
                        inputRef={engNameRef}
                    />
                    <div className="flex-none">
                        <Button
                            type="submit"
                            variant="outlined"
                            className="flex items-center gap-3 px-4 py-2 m-1">
                            {addCategoryResult.isLoading ? <Spinner color="indigo" /> : <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />}
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
                            pageSizeOptions={[5]}
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
        </div>
    )
}

export default AddCategory