import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../State/Order/Action'
import { Button, Card } from '@mui/material'

const Orders = () => {
  const order = useSelector(store => store.order)
  console.log(order.orders);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsersOrders())
  }, [])
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        {
          order.orders.map(order =>
            <Card className='flex justify-between items-center p-5'>
              <div className='w-[70%] space-y-5'>
                {order.items.map(item => <OrderCard order={order} item={item} />)}
                <p>Total: {order.totalPrice} $</p>
              </div>
              <div>
                <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
              </div>
            </Card>)
        }
      </div>
    </div>
  )
}

export default Orders
