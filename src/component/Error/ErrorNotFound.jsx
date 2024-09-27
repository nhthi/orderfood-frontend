import React from 'react'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ErrorNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center items-center h-[80vh]'>
      <h1 className='text-8xl'>404</h1>
      <p className='text-4xl'>Page Not Found :((</p>
      <DoNotDisturbAltIcon color='primary' sx={{fontSize:'10rem'}}/>
      <Button variant='contained' onClick={()=>navigate('/')}>Go To Home</Button>
    </div>
  )
}

export default ErrorNotFound
