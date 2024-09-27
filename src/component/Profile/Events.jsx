import React, { useEffect } from 'react'
import EventCard from './EventCard'
import { getAllEvents } from '../State/Restaurant/Action'
import { useDispatch, useSelector } from 'react-redux'

const Events = () => {

  const dispatch = useDispatch()
  const restaurant = useSelector(store=>store.restaurant)
  useEffect(()=>{
    dispatch(getAllEvents())
  },[])
  return (
    <div className='mt-4 px-5 flex flex-wrap gap-5 justify-center'>
      {restaurant.events.map(item => <EventCard  item={item}/>)}
      {/* {[1,1,1].map(item => <EventCard />)} */}

    </div>
  )
}

export default Events
