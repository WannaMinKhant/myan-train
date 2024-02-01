import React,{ useState, useEffect, useRef } from 'react'
import Swal from "sweetalert2";
import { Breadcrumbs } from "@material-tailwind/react";
import { BiTrash, BiHome } from "react-icons/bi";
import { Select, Option } from "@material-tailwind/react";
import MyToolTip from '../../Components/MyToolTip';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Input,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IoAddCircleOutline } from "react-icons/io5";
import { useGetStationAccountQuery, useGetStationQuery,useAddStationAccountMutation,useDeleteStationAccountMutation } from '../../ApiService/stationSlice'
import AlertComponent from '../../Components/AlertComponent';
import WarnningComponent from "../../Components/WarnningComponent";

const StationAccount = () => {

  const { data:stationData, isLoading:stationLoading, isSuccess:stationSuccess } = useGetStationQuery();
  const { data, isLoading, isSuccess, refetch } = useGetStationAccountQuery();
  const [addAccount, addAccountResult] = useAddStationAccountMutation();
  const [deleteAccount, deleteAccountResult] = useDeleteStationAccountMutation();
  const [ stationId,setStationId] = useState(0);
  const nameRef = useRef();
  const passwordRef = useRef();


   // alert box 
  const [alertResult, setAlertResult] = useState(false);
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
          deleteStationAccount(id)
          Swal.fire("Deleted!", "Your Account has been deleted.", "success");
      }
  });
};

  const header = [
    {
        field: 'station',
        headerName: 'Station',
        flex:1,
        renderCell:(params) =>(
          <div>
             { params.row.station.name }
          </div>
        )
    },
    {
        field: 'name',
        headerName: 'User Name',
        flex:1,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 100,
        flex: 1,
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
const AddStationAccount = async ()=>{

    if(nameRef.current.value == "" || passwordRef.current.value == "" || stationId == "0"){
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

    const body = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
      iv: "passenger-informations-system",
      station_id: stationId,
      role_id:'2',
  }
  
  await addAccount(body);
  nameRef.current.value = "";
  passwordRef.current.value = "";

  refetch();
}

const deleteStationAccount = async (id)=>{
  await deleteAccount(id);
  refetch();
}
    useEffect(() => {
     if(addAccountResult.isSuccess)
     {
      setAlertResult(addAccountResult)
      handleClick();
     }else{
      setAlertResult(addAccountResult)
      handleClick();
     }

    }, [addAccountResult])

    useEffect(() => {
      if(deleteAccountResult.isSuccess)
      {
       setAlertResult(deleteAccountResult)
       handleClick();
      }else{
       setAlertResult(deleteAccountResult)
       handleClick();
      }
 
     }, [deleteAccountResult])



  return (
    <div className='flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide'>
      <div className='flex flex-row w-full h-fit justify-between items-center'>
        <Breadcrumbs>
            <BiHome size={20} className='opacity-50'/>
            <p className="font-poppins">
                Station Account
            </p>
        </Breadcrumbs>
      </div>
      <div className='flex md:flex-row lg:flex-row xl:flex-row  flex-col w-full mt-4'>
      <div className='flex-1 h-full order-2'>
        <Box sx={{ height: 650, width: '100%'}}>
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

                            loading={isLoading ? true : false}

                        /> : <></>}
                </Box>
      </div>
        <div className='flex flex-col md:w-1/3 lg:w-1/3 xl:w-1/3 w-full p-2 border-2 mx-2 rounded-xl order-1'>
          <div className="flex flex-1 xl:flex-col md:flex-col flex-col gap-2 m-2">
            <Input
                type="text"
                label="Username"
                
                inputRef={nameRef}
            />
            <Input
                type="password"
                label="Password"
               
                inputRef={passwordRef}
            />
            {stationSuccess && <div className="w-full">
                <Select label="Select Station" onChange={(e) => setStationId(e)} >

                  {
                    stationData.data.map(station =>(
                       <Option value={station.id.toString()} key={uuidv4()}>{ station.name}</Option>
                    ))
                  }
                   
                </Select>
            </div>}
            <div className="flex-row flex justify-end">
                { addAccountResult.isLoading ?
                  <Button
                    variant="filled"
                    className="flex items-center gap-3 px-4 py-2 m-1">
                    <Spinner color="indigo" />
                </Button> :
                <Button
                    variant="filled"
                    className="flex items-center gap-3 px-4 py-2 m-1" onClick={AddStationAccount}>
                    <IoAddCircleOutline strokeWidth={2} className="h-5 w-5"/>
                    Add
                </Button>}
            </div>
          </div>
        </div>
        <WarnningComponent result={result} open={openWarn} handleClose={handleWarnClose}/>
      </div>
      <AlertComponent open={openAlert} handleClose={handleClose} result={alertResult}/>
    </div>
  )
}

export default StationAccount
