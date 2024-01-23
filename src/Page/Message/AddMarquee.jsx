import React, { useEffect, useState } from 'react'
import { GrSend } from "react-icons/gr";
import {
  Select, Option, Spinner, Button
} from "@material-tailwind/react";

import {
  useGetMessageQuery,
} from '../../ApiService/messageSlice'
import {
  useAddMarqueeMutation,
} from '../../ApiService/marQueeSlice';
import {
  useGetMarqueeQuery
} from '../../ApiService/actionMarqueeSlice'
import {
  useGetStationQuery,
} from '../../ApiService/stationSlice'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Breadcrumbs } from "@material-tailwind/react";
import { BiHome } from "react-icons/bi";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import WarnningComponent from "../../Components/WarnningComponent";

const AddMarquee = ({socket}) => {
  const { data, isLoading, isSuccess, refetch } = useGetMessageQuery();

  let selectList = [];
  const { data: station, isLoadingStation, isSuccess: stationSuccess, refetch: refetchStation } = useGetStationQuery();
  const [addMarQuee, addMarQueeResult] = useAddMarqueeMutation();
  const { refetch:getMarqueeAction} = useGetMarqueeQuery();

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const notify=()=>{
    socket?.emit('notify','noti')
  }

  const [messageId,setMessageID] = useState(0);
  const [loading, setLoading] = useState(true)
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

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
      field: 'id',
      headerName: 'Id',
      width: 300,
      editable: false,
    },

    {
      field: 'name',
      headerName: 'ဘူတာ',
      flex: 1,
      editable: false,
    },
  ];

  const AddMarqueeHandler = async (e) => {
    e.preventDefault();
    if(rowSelectionModel.length == 0){
      setResult({
        success:"",
        isSuccess:false,
        warning:true,
        error:false,
        msg:"Please Select One or more Station."
      });
      handleWarnClick();
      return;
    }

    for (let i = 0; i < rowSelectionModel.length; i++) {
      console.log(rowSelectionModel.length)
      selectList.push({ "id": rowSelectionModel[i] })
      console.log(selectList);
    }
    let body = {
      message_id: messageId,
      annouce: checked,
      lstTrain: selectList
    }
    await addMarQuee(body);
    getMarqueeAction();
    notify();
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
      <div className='flex flex-row w-full h-fit justify-between items-center'>
        <Breadcrumbs>
            <BiHome size={20} className='opacity-50'/>
            <p className="font-poppins">
                Announcements
            </p>
        </Breadcrumbs>
      </div>

        {/* <div className="w-full border-2 border-gray-200 md:flex flex-col gap-2 items-start justify-center rounded-xl"> */}
        <div className="w-full">

        <div className='flex flex-row justify-between'>
        {isSuccess && <div className="w-full mb-10">
                <Select label="Select Message" onChange={(e) => setMessageID(e)} >

                  {
                    data.data.map(message =>(
                       <Option value={message.id.toString()} key={uuidv4()}>{ message.title}</Option>
                    ))
                  }
                   
                </Select>
            </div>}
            <div className="flex-1">
                { addMarQueeResult.isLoading ? 
                <Button
                  variant="filled"
                    sx = {{ width : '100%'}}
                    className="flex items-center gap-3 px-4 py-2 m-1">
                    <Spinner size={20}/>
                </Button> : 
                  <Button
                    variant="filled"
                    sx = {{ width : '100%'}}
                    className="flex items-center gap-3 px-4 py-2 m-1" onClick={AddMarqueeHandler}>
                    <GrSend size={20}/>Send
                  </Button>
                
                }
              </div>
        </div>
        <FormControlLabel
            control={
              <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            }
            label="အမြဲတမ်းဖော်ပြရန်"
          />

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
                  pageSizeOptions={[5,10,20,50,100]}
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
          </div>
        </div>
       <WarnningComponent result={result} open={openWarn} handleClose={handleWarnClose}/>
      </div>}
    </>

  )
}

export default AddMarquee