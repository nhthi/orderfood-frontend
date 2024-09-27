import { Backdrop, Box, Button, CircularProgress, Modal, TextField, Typography } from '@mui/material'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgotPassword, loginUser, resetPassword } from '../State/Authentication/Action'
import * as Yup from "yup"



const initialValues = {
  verifyCode: '',
  newPassword: '',
  confirmPassword: ''
}

const validationSchema = Yup.object({
  verifyCode: Yup.string().required("Verify code is requires"),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required')
})




const ForgorPassword = () => {

  const [isLoading, setIsLoading] = useState(false)
  const auth = useSelector(store => store.auth)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()


  const handleSubmit = (values) => {
    console.log("value: ", values);
    if (email.length > 0) {
      dispatch(resetPassword({
        email: email,
        code: values.verifyCode,
        newPassword: values.newPassword
      }))
      setEmail('')
    }
  }


  const handleSendVerifyCode = async() => {
    console.log(email);
    if (email.length > 0) {
      setIsLoading(true)
      await dispatch(forgotPassword(email))
      setIsLoading(false)
    }
  }

  return (
    <div className='relative'>
      <Typography variant='h5' className='text-center'>
        Forgot Password
      </Typography>
      {
        auth.notify &&
        <h2 className='text-center text-sm mt-2 text-green-500'>
          {auth.notify.message}
        </h2>
      }
      {
        auth.error &&
        <h2 className='text-center text-sm mt-2 text-red-500'>
          Invalid email
        </h2>
      }
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        <Form>
          <div className='flex justify-center items-center gap-2'>

            <Field
              as={TextField}
              name="verifyCode"
              label="Verify Code"
              variant="outlined"
              margin="normal"
              helperText={
                <ErrorMessage name="verifyCode">
                  {(msg) => <span className='text-red-600'>{msg}</span>}
                </ErrorMessage>
              }
            />
            <Button sx={{ paddingTop: 1, paddingBottom: 1, width: '40%', backgroundColor: 'gray' }} variant='contained' onClick={handleSendVerifyCode}>Send OTP</Button>
          </div>
          <Field
            as={TextField}
            type='password'
            name="newPassword"
            label="New Password"
            variant="outlined"
            margin="normal"
            fullWidth
            helperText={
              <ErrorMessage name="newPassword">
                {(msg) => <span className='text-red-600'>{msg}</span>}
              </ErrorMessage>
            }
          />
          <Field
            as={TextField}
            type='password'
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            helperText={
              <ErrorMessage name="confirmPassword">
                {(msg) => <span className='text-red-600'>{msg}</span>}
              </ErrorMessage>
            }
          />


          <Button variant='contained' type='submit' fullWidth >New Password</Button>

        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Don't have an account ?
        <Button onClick={() => navigate('/account/register')}>Register</Button>
      </Typography>

      {isLoading && <Backdrop
        sx={{ color: '#fff', zIndex: 1000 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
    </div>
  )
}

export default ForgorPassword
