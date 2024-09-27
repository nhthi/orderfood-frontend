import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { style } from '../../component/Cart/Cart'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, getRestaurantEvents } from '../../component/State/Restaurant/Action';
import EventCard from '../../component/Profile/EventCard';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const initialValues = {
  image: '',
  location: '',
  eventName: '',
  startAt: dayjs(),
  endAt: dayjs()
}
const Events = () => {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpenIngredientsModal = () => setOpen(true)

  const restaurant = useSelector(store => store.restaurant)
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState(initialValues)

  const handleFormChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const reqData = {
      ...formValue,
      endAt: formValue.endAt.format("DD/MM/YYYY hh:mm A"),
      startAt: formValue.startAt.format("DD/MM/YYYY hh:mm A")
    }
    console.log(reqData);
    if (reqData.eventName.length > 0 && reqData.image.length > 0) {
      dispatch(createEventAction(reqData))
      setFormValue(initialValues)
      handleClose()
    }
  }

  const handleDateChange = (date, dateType) => {
    console.log("DateType", dateType, date);
    if (date.isValid()) {
      setFormValue({
        ...formValue,
        [dateType]: date
      });
    } else {
      console.error('Invalid date:', date);
    }
  }

  useEffect(() => {
    dispatch(getRestaurantEvents(restaurant.userRestaurant.id))
  }, [])
  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpenIngredientsModal} variant='contained'>Create New Event</Button>
      </div>
      <div className='mt-4 px-5 flex flex-wrap gap-5 justify-center'>
        {restaurant.restaurantEvents.map(item => <EventCard key={item.id} item={item} />)}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className='text-xl text-center pb-5'>Create Event</h1>
          <form onSubmit={handleSubmit} >
            <Grid container xs={12} className='space-y-5'>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant='outlined'
                  fullWidth
                  value={formValue.image}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant='outlined'
                  fullWidth
                  value={formValue.location}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="eventName"
                  label="Event Name"
                  variant='outlined'
                  fullWidth
                  value={formValue.eventName}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={formValue.startAt}
                      onChange={(newValue) => handleDateChange(newValue, 'startAt')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                      label="End Date and Time"
                      value={formValue.endAt}
                      onChange={(newValue) => handleDateChange(newValue, 'endAt')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button type='submit' variant='contained'>Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Events
