import { Button, Card } from '@mui/material'
import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


const PaymentSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen px-5'>
            <div className='flex flex-col items-center justify-center h-[90vh]'>
                <Card className='box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                    <TaskAltIcon sx={{fontSize:'5rem',color:green[500]}}/>
                    <h1 className='text-2xl py-5 font-semibold'>Order Success</h1>
                    <p className='py-3 text-gray-300 text-center'>Thank you for choosing our restaurant! We appreciate your order</p>
                    <p className='text-gray-200 py-2 text-lg text-center'>Have a Greate day!</p>
                    <Button variant='contained' onClick={()=>navigate("/")}>Go to home</Button>
                </Card>
            </div>
        </div>
    )
}

export default PaymentSuccess
