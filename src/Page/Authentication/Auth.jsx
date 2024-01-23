import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  
    const authKey = localStorage.getItem("auth");
    const token = localStorage.getItem("token");
    
  useEffect(()=>{
    if(authKey && token != null){
      navigate('/dashboard');
    }else{
      navigate('/login')
    }
  },[])
  return (
    <div className='w-full h-screen flex flex-row items-center justify-center'>
      <div className='w-32 h-fit p-4 bg-blue-500 rounded-md' onClick={()=> navigate("/dashboard")}>
        Go To Dashboard
      </div>

    </div>
  )
}

export default Auth
