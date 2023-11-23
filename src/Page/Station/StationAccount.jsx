import React from 'react'
import { BiTrash, BiHome } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Breadcrumbs } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import {
  Button,
  Input,
  Typography,
  Drawer,
  IconButton,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IoAddCircleOutline } from "react-icons/io5";

const StationAccount = () => {
  return (
    <div className='flex flex-col w-full max-h-screen select-none overflow-y-auto scrollbar-hide'>
      <div className='flex flex-row w-full h-fit justify-between items-center'>
        <Breadcrumbs>
            <BiHome size={20} className='opacity-50'/>
            <p className="font-poppins">
                Station Account
            </p>
        </Breadcrumbs>
        <div>
          Add Account
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col w-1/3 '>
          <form className="flex flex-1 xl:flex-col md:flex-col gap-2 m-2" onSubmit={()=>{}}>
            <Input
                type="text"
                label="ရထား"
                // defaultValue={open ? editCustomerRef.customer : ""}
                // inputRef={""}
            />
            <Input
                type="text"
                label="Train"
                // defaultValue={open ? editCustomerRef.customer : ""}
                // inputRef={""}
            />
            <div className="w-full">
                <Select label="Select Way" onChange={(e) => {}} >
                    <Option value='1'>Circular Train</Option>
                    <Option value='2'>Express Train</Option>
                </Select>
            </div>
            <div className="w-full">
                <Select label="Select Lane" onChange={(e) => {}} >
                    <Option value='1'>Lane 1</Option>
                    <Option value='2'>Lane 2</Option>
                </Select>
            </div>
            <div className="flex-none justify-end">
                <Button
                    type="submit"
                    variant="contained"
                    className="flex items-center gap-3 px-4 py-2 m-1">
                    {false ? <Spinner color="indigo" /> : <IoAddCircleOutline strokeWidth={2} className="h-5 w-5" />}
                    Add
                </Button>
            </div>
          </form>
        </div>
        <div className='flex-1 bg-blue-400 h-4'>

        </div>
      </div>
      
    </div>
  )
}

export default StationAccount
