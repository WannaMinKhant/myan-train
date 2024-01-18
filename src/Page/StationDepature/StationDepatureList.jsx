import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { Breadcrumbs } from "@material-tailwind/react";
import { BiTrash, BiHome } from "react-icons/bi";
import MyToolTip from '../../Components/MyToolTip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { useGetAllLaneStationQuery, useDeleteLaneStationMutation } from "../../ApiService/TimeTableSlice";

const StationDepatureList = () => {

    const { data, isSuccess, isLoading, refetch} = useGetAllLaneStationQuery();
    const [deleteLaneStation] = useDeleteLaneStationMutation();

    const [ presentLane, setPresentLane] = useState([]);

    const header = [
        {
            field: 'no',
            headerName: 'No',
            width:70,
            
        },

        {
            field: 'station_name',
            headerName: 'ဘူတာ',
            width:150,
           
        },
        {
            field: 'train_name',
            headerName: 'Station',
            width:150,
        },
        {
            field: 'lane_name',
            headerName: 'Lane Name',
            flex:1,
        },
        {
            field: 'arrivedTime',
            headerName: 'Arrival Time',
            width:120,
        },
        {
            field: 'depatureTime',
            headerName: 'Depature Time',
            width:120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width:100,
            renderCell: (params) => (
                <div className="flex flex-row gap-4 justify-between">
                    {/* <div> */}
                   
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

    const deleteStationHandler = async (id) => {
       await deleteLaneStation(id);
       refetch();
    }

    useEffect(()=>{
        if(isSuccess){
            setPresentLane(data?.data.map((lane,i)=> ({...lane,lane_name:lane.lane.name,no: i +1,station_name: lane.station.name, train_name: lane.train.train_no})))
        }
    },[isSuccess,data?.data])

  return (
    <div className="flex flex-col w-full h-full select-none overflow-y-auto scrollbar-hide">
    <div className="flex flex-row w-full h-fit justify-between items-center">
      <Breadcrumbs>
        <BiHome size={20} className="opacity-50" />
        <p className="font-poppins">Station Time List</p>
      </Breadcrumbs>
    </div>
    <div className='mt-2 justify-center items-center w-full h-full flex flex-row'>
        <Box sx={{ height: 500, width: '100%'}}>
            {isSuccess ?
                <DataGrid
                    rows={presentLane}
                    columns={header}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5,10,25,50,100,200,300]}
                    // checkboxSelection
                    density='compact'
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

                /> : <><Spinner/></>}
        </Box>
    </div>
   
    </div>
  )
}

export default StationDepatureList
