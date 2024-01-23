import React,{ useRef,useState, useEffect } from 'react'
import { useUpdatePasswordMutation } from '../../ApiService/authApiSlice'
import { Breadcrumbs } from "@material-tailwind/react";
import { BiHome } from "react-icons/bi";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import {
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import Button from "@mui/material/Button";
import { Spinner } from "@material-tailwind/react";
import AlertComponent from "../../Components/AlertComponent";


const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const Account = () => {

    const passwordRef = useRef('');
    const [updateAccount, result ] = useUpdatePasswordMutation();

    const user = JSON.parse(localStorage.getItem('user'));

    const updatePassword = async () => {
        const auth = {
            id:user.id,
          name: user.name,
          password: passwordRef.current.value,
          iv: "passenger-informations-system",
          station_id: user.station_id,
          role_id: user.role_id,
        };
    
        await updateAccount(auth)
      };
      const [showPassword, setShowPassword] = useState(false);

      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const [open, setOpen] = useState(false);

      const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };
    
      const handleClick = () => {
        setOpen(true);
      };
      useEffect(() => {
        if (result.isSuccess) {
          handleClick();
        } else if (result.isError) {
          handleClick();
        }

      }, [result]);

  return (
    <div className="flex flex-col gap-4 max-h-full">
        <div className='flex flex-row w-full h-fit justify-between items-center'>
            <Breadcrumbs>
                <BiHome size={20} className='opacity-50'/>
                <p className="font-poppins">
                    Update Account
                </p>
            </Breadcrumbs>
        </div>

        <div className='w-fit m-auto flex flex-col px-4 py-2 border-2 rounded-xl'>
        <FormControl
          sx={{
            m: 1,
            width: "30ch",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "blue",
              },
            },
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputRef={passwordRef}
          />
        </FormControl>
        <div className="w-fit m-auto flex flex-row">
          {result.isLoading ? (
            <Button variant="contained">
              <Spinner />
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ m: 1, width: "30ch" }}
              onClick={updatePassword}
            >
              Update Passsword
              {/* <span>
                <MdOutlineKeyboardArrowRight size={30} />
              </span> */}
            </Button>
          )}
        </div>
        </div>
        <AlertComponent open={open} handleClose={handleClose} result={result} />
    </div>
  )
}

export default Account
