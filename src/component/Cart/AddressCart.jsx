import { Button, Card } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CheckIcon from '@mui/icons-material/Check';

const AddressCart = ({ item, select,handleSelectAddress }) => {
    return (
        <Card className='flex gap-5 w-64 p-5'>
            <HomeIcon />
            <div className='space-y-3'>
                <h1 className='font-semibold text-lg text-white'>Home</h1>
                <p>
                    {`${item.streetAddress}, ${item.stateProvince}, ${item.city}, Viet Nam`}
                </p>
                {
                    
                    <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>{select ? 
                        <>
                        <CheckIcon/>
                        Delivery Here
                        </> 
                        : 'Select'
                    }</Button>
                }
            </div>
        </Card>
    )
}

export default AddressCart
