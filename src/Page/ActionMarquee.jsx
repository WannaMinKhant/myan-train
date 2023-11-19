
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
    useGetMarqueeQuery,
    useEditMarqueeMutation,
    useDeleteMarqueeMutation
} from '../ApiService/actionMarqueeSlice'

const ActionMarquee = () => {
    const { data, isLoading, isSuccess, refetch } = useGetMarqueeQuery();
    const [editMarquee, editMarResult] = useEditMarqueeMutation();
    const [deleteMarquee, deleteMarqueeResult] = useDeleteMarqueeMutation();
    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((deleteMarqueeResult) => {
            if (deleteMarqueeResult.isConfirmed) {
                console.log(id)
                deleteMarqueeHandler(id)
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
            }
        });
    };
    const deleteMarqueeHandler = async (id) => {
        console.log(id)
        await deleteMarquee(id);
        refetch();
    }
    const header = [

        {
            field: 'description',
            headerName: 'Myanmar',
            flex: 3,
            editable: true,
        },
        {
            field: 'eng_name',
            headerName: 'English',
            flex: 3,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <div className="flex flex-row gap-4 justify-between">

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

    const [lstMessage, setLstMessage] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            const row = data?.data.map(obj => { return { ...obj, description: obj.message.description } });
            setLstMessage(row);
        }

    }, [data?.data])


    return (
        <div className='flex flex-col gap-4 px-16 max-h-full'>
            <div className="flex-row w-full justify-start flex">
                <p className="px-4 py-2 bg-[#57626c] rounded-lg text-white font-bold">
                    Action Marquee
                </p>

            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                {isSuccess ?
                    <DataGrid
                        rows={lstMessage}
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
    )
}

export default ActionMarquee