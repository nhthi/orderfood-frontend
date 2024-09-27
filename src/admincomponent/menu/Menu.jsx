import React from 'react'
import MenuTable from './MenuTable'
import { Route, Routes } from 'react-router-dom'
import CreateMenuForm from './CreateMenuForm'

const Menu = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MenuTable/>}/>
        <Route path="/create" element={<CreateMenuForm/>}/>
      </Routes>
    </div>
  )
}

export default Menu
