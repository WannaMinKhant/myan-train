
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import MyToolTip from '../Components/MyToolTip';
import moment from 'moment';
import {IconButton} from "@material-tailwind/react";
import {
    useGetMarqueeQuery,
    useDeleteMarqueeMutation
} from '../ApiService/actionMarqueeSlice'
import { Breadcrumbs } from "@material-tailwind/react";
import { BiHome } from "react-icons/bi";

const ActionMarquee = ({socket}) => {
    const { data, isLoading, isSuccess, refetch } = useGetMarqueeQuery();
    const [deleteMarquee] = useDeleteMarqueeMutation();

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

    // for real time socket connection
  const notify=()=>{
    socket?.emit('notify','noti')
  }


    const deleteMarqueeHandler = async (id) => {
        console.log(id)
        await deleteMarquee(id);
        refetch();
        notify();
    }
    const header = [
        {
            field: 'station',
            headerName: 'Station',
            flex: 2,
        },
        {
            field: 'description',
            headerName: 'Myanmar',
            flex: 3,
        },
        
        {
            field: 'created_at',
            headerName: 'Time',
            flex: 1,
            renderCell:(params)=>{
                return (
                 <p>
                    { moment(new Date(params.row.created_at)).fromNow() }
                </p>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <div className="flex flex-row gap-4 justify-between">

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

    const [lstMessage, setLstMessage] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            console.log(data?.data)
            const row = data?.data.map(obj => { return { ...obj, description: obj.message.description, station: obj.station.name } });
            setLstMessage(row);
        }

    }, [isSuccess,data?.data])


    return (
        <div className='flex flex-col gap-4 px-16 max-h-full'>
            <div className="flex flex-row w-full h-fit justify-between items-center">
                <Breadcrumbs>
                <BiHome size={20} className="opacity-50" />
                <p className="font-poppins">Manage Announce</p>
                </Breadcrumbs>
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