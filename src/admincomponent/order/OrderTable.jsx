import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/Restaurant Order/Action'


const orderStatus = [
    {
        label: "Pending", value: "PENDING"
    },
    {
        label: "Complete", value: "COMPLETED"
    },
    {
        label: "Out For Delivery", value: "OUT_FOR_DELIVERY"
    },
    {
        label: "Delivered", value: "DELIVERED"
    },
]

const OrderTable = () => {

    const dispatch = useDispatch()
    const restaurantOrder = useSelector(store => store.restaurantOrder)
    const [selectedOrderId, setSelectedOrderId] = useState(null)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, id) => {
        setSelectedOrderId(id)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedOrderId(null)
    };

    const handleUpdateOrderStatus = (status) => {
        console.log({
            orderId: selectedOrderId,
            orderStatus: status
        });
        dispatch(updateOrderStatus({
            orderId: selectedOrderId,
            orderStatus: status
        }))
        handleClose()
    }
    return (
        <Box className=''>
            <Card>
                <CardHeader
                    title="All Orders"
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Customer</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Ingredients</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantOrder.orders.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" >
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="left">
                                        <AvatarGroup sx={{ justifyContent: 'start' }}>
                                            {item.items.map(order =>
                                                <Avatar key={order.id} src={order.food.images[0]} />
                                            )}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="left">{item.customer.email}</TableCell>
                                    <TableCell align="left">{`$ ${item.totalPrice}`}</TableCell>
                                    <TableCell align="left">{item.items.map(
                                        orderItem => <p>{orderItem.food.name}</p>
                                    )}
                                    </TableCell>
                                    <TableCell align="left" className='w-[20%]'>
                                        <div className='flex flex-wrap  items-center'>
                                            {item.items.map(
                                                orderItem => orderItem.ingredients.map((value) => (
                                                    <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                                                ))
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">

                                        <Button
                                            variant='contained'
                                            color={`${item.orderStatus === 'PENDING' ? 'secondary'
                                                : item.orderStatus === 'COMPLETE' ? 'primary'
                                                    : item.orderStatus === 'DELIVERED' ? 'success'
                                                        : item.orderStatus === 'OUT_FOR_DELIVERY' ? 'warning'
                                                            : 'primary'}`}>
                                            {item.orderStatus}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            id={`basic-button-${item.id}`}
                                            aria-controls={open ? `basic-menu-${item.id}` : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, item.id)}
                                        >
                                            Status
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${item.id}`}
                                            anchorEl={anchorEl}
                                            open={open && selectedOrderId === item.id}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': `basic-button-${item.id}`,
                                            }}
                                        >
                                            {orderStatus.map((status) => (
                                                <MenuItem key={status.value} onClick={() => handleUpdateOrderStatus(status.value)}>
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default OrderTable
