import { Button, Card, Divider } from '@mui/material'
import React from 'react'

const OrderCard = ({ item, order }) => {
    return (
        <>
            <div className='flex items-center space-x-5'>
                <img
                    src={item.food?.images[0]}
                    alt=''
                    className='h-16 w-16 object-cover'
                />
                <div>
                    <p>{item.food?.name}</p>
                    <p className='text-sm'>${item.food?.price}</p>
                    <p className='text-xs text-gray-400'>x {item.quantity}</p>
                </div>
            </div>
            {order.items[order.items.length-1].id !== item.id && <Divider/>}
        </>
    )
}

export default OrderCard
