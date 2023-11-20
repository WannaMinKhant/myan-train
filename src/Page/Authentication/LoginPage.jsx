import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../image/images.jpeg'

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { MdVisibility,MdVisibilityOff } from "react-icons/md";
import Button from '@mui/material/Button';

const LoginPage = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('auth');
        if(!auth){
            navigate("/dashboard");
        }

    },)


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    <div className='row flex-row w-full h-screen bg-blue-gray-300 justify-center items-center'>
        
        <div className='m-auto w-1/3 text-center'>
            <img src={logo} alt='' className='rounded-full p-4 inline-block'/>
            <p className='w-full text-lg font-bold'>Login Here</p>
            <TextField
                label="Username"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
            
                />

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
          />
        </FormControl>
        
        <div>
            <Button variant="contained">Login</Button>
        </div>
       
        </div>
    </div>
  )
}

export default LoginPage
