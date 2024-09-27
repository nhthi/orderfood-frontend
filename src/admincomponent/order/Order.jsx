import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'

const orderStatus = [
  {
    label:"Pending",
    value:'PENDING'
  },
  {
    label:"Completed",
    value:'COMPLETED'
  },
  {
    label:"All",
    value:'ALL'
  }
]


const Order = () => {

  const dispatch = useDispatch()
  const [filterValue,setFilterValue] = useState('ALL')
  const restaurant = useSelector(store=>store.restaurant)
  const handleFilterCategory = (e)=>{
    if(e.target.value ==='all') setFilterValue(null)
    setFilterValue(e.target.value)
    console.log(e.target.value);
  }


  useEffect(()=>{
    dispatch(fetchRestaurantsOrder({
      restaurantId:restaurant.userRestaurant.id,
      orderStatus:filterValue
    }))
  },[filterValue])
  return (
    <div className='px-2 space-y-2'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: '1rem', }} variant='h5'>
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup row name='category' onChange={handleFilterCategory} value={filterValue}>
            {orderStatus.map(item =>
              <FormControlLabel
                key={item.value}
                value={item.value}
                label={item.label.toUpperCase()}
                control={<Radio />}
                sx={{color:'gray'}}
              />)
            }
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable filter={filterValue}/>
    </div>
  )
}

export default Order
