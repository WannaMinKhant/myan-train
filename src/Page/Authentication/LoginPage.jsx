import React, { useEffect , useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../image/images.jpeg'

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { MdVisibility,MdVisibilityOff,MdOutlineKeyboardArrowRight  } from "react-icons/md";
import Button from '@mui/material/Button';
import { useLoginMutation } from '../../ApiService/authApiSlice';
import { Spinner } from "@material-tailwind/react";
import AlertComponent from '../../Components/AlertComponent';

const LoginPage = () => {

    const navigate = useNavigate();

    const [login, result] = useLoginMutation();

    const nameRef = useRef("");
    const passwordRef = useRef("");


    const [open,setOpen] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  
    const handleClick = () => {
      setOpen(true);
    };

    useEffect(()=>{
        const auth = localStorage.getItem('auth');
        if(!auth){
            navigate("/login");
        }

    },[])

    const checkAuth = async () => {
      const auth = {
        name: nameRef.current.value,
        password: passwordRef.current.value,
        iv: "passenger-informations-system",
        station_id:'0',
        role_id:'1',
      };

      // console.log(auth)
  
      await login(auth);
      
    };

    useEffect(() => {
      if (result.isSuccess) {
        console.log(result)
        localStorage.setItem('token',result.data.token);
        localStorage.setItem('user',JSON.stringify(result.data.data));
        localStorage.setItem('auth',1);
        handleClick();
        navigate("/dashboard");
      } else if (result.isError) {
        handleClick();
        console.log(result)
      }
      // console.log('response login')
    }, [result]);


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    <div className='row flex-row w-full h-screen bg-blue-gray-300 justify-center items-center'>
        
        <div className='m-auto w-1/3 text-center'>
            <img src={logo} alt='' className='rounded-full p-4 inline-block' width={150} height={150}/>
            <p className='w-full text-lg font-bold'>Login Here</p>
            <TextField
                label="Username"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '30ch', "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },}}
                inputRef={nameRef}
                
                />

          <FormControl sx={{ m: 1, width: '30ch', "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
        
        <div className='w-fit m-auto flex flex-row'>
        {result.isLoading ? (
              <Button variant="contained">
                <Spinner />
              </Button>
            ) : (
              <Button variant="contained" sx={{ m: 1, width: '30ch'}} onClick={checkAuth}>
                LogIn<span><MdOutlineKeyboardArrowRight size={30}/></span>
              </Button>
            )}
        </div>
        <AlertComponent open={open} handleClose={handleClose} result={result}/>
        </div>
    </div>
  )
}

export default LoginPage
