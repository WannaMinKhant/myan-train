import React, { useEffect, useState } from 'react'
import MyToolTip from '../Components/MyToolTip';
import { IoIosOpen } from "react-icons/io";
import {
  Select, Option, IconButton, Spinner, Button
} from "@material-tailwind/react";

import {
  useGetMessageQuery,
} from '../ApiService/messageSlice'
import {
  useAddMarqueeMutation,
  useDeleteMarqueeMutation
} from '../ApiService/marQueeSlice'
import {
  useGetStationQuery,
} from '../ApiService/stationSlice'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';



const AddMarquee = () => {
  const { data, isLoading, isSuccess, refetch } = useGetMessageQuery();
  let selectList = [];
  const { data: station, isLoadingStation, isSuccess: stationSuccess, refetch: refetchStation } = useGetStationQuery();
  const [addMarQuee, addMarQueeResult] = useAddMarqueeMutation();


  const [loading, setLoading] = useState(true)
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const header = [
    {
      field: 'id',
      headerName: 'Id',
      width: 300,
      editable: true,
    },

    {
      field: 'name',
      headerName: 'ဘူတာ',
      flex: 1,
      editable: true,
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div className="flex flex-row gap-4 justify-between">
    //       {/* <div> */}
    //       <MyToolTip style={'bg-green-500'} content={'Add'}>
    //         <IconButton color='indigo'
    //           // onClick={AddMsgHandler}
    //           onClick={() => console.log(rowSelectionModel)}
    //           variant="text"
    //           className="w-6 h-6 bg-green-200 p-4"
    //         >
    //           <IoIosOpen className="h-4 w-4 text--600" />
    //         </IconButton>
    //       </MyToolTip>
    //     </div>
    //   )
    // },
  ];

  // const onRowsSelectionHandler = (ids) => {
  //   const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
  //   console.log(selectedRowsData);
  // };
  const AddMarqueeHandler = async (e) => {
    e.preventDefault();
    for (let i = 0; i < rowSelectionModel.length; i++) {
      console.log(rowSelectionModel.length)
      // setSelectList([...selectList, { "id": rowSelectionModel[i] }]);
      selectList.push({ "id": rowSelectionModel[i] })
      console.log(selectList);

    }
    let body = {
      message_id: "2",
      station_id: "3",
      annouce: 0,
      lstTrain: selectList
    }
    await addMarQuee(body);
    // refetch();
    // titleRef.current.value = "";
    //discRef.current.value = "";
    // setMsgState("")

    // const marqu = {
    //   anou: 1,
    //   msgId: 1,
    //   lstTrain: dd
    // }
  }

  useEffect(() => {
    if (isSuccess && stationSuccess) {
      setLoading(false);
    }
  }, [data, station])

  useEffect(() => {
    if (addMarQueeResult.isSuccess) {
      selectList = [];
    }
  }, [addMarQueeResult])

  return (
    <>
      {loading ? <div className="flex flex-col gap-4 px-16 h-full justify-center items-center"> <Spinner className="h-12 w-12" /></div> : <div className="flex flex-col gap-4 px-16 max-h-full">
        <div className="flex-row w-full justify-start flex">
          <p className="px-4 py-2 bg-[#57626c] rounded-lg text-white font-bold">
            Add Marquee
          </p>
        </div>

        <div class="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value="1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
        </div>

        {/* <div className="w-full px-6 py-2 h-22 border-2 border-gray-200 md:flex flex-row gap-2 items-end justify-center rounded-xl"> */}
        <div className="w-full">
          <div className='mb-10'>
            <Select label="Select Version" >
              {isSuccess && data?.data.map((option) => (

                <Option value={option.id} key={option.id} >{option.title}</Option>
              )
              )}

            </Select>
          </div>

          <div className='flex flex-col w-full'>
            <Box sx={{ height: 400, width: '100%' }}>
              {stationSuccess ?
                <DataGrid
                  rows={station?.data}
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
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionModel}

                  loading={isLoading ? true : false}

                /> : <></>}
            </Box>
            <div className="flex-none">
              <Button
                variant="outlined"
                className="flex items-center gap-3 px-4 py-2 m-1" onClick={AddMarqueeHandler}>
                {/* {addCategoryResult.isLoading ? <Spinner color="indigo" /> : <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />} */}

                Add
              </Button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>}
    </>

  )
}

export default AddMarquee