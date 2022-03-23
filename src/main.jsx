import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// components
import Navbar from './components/navbar'
import Controller from './components/controller'

// pages
import ShowTable from './pages/show-table'
import StudentFormInput from './pages/form-input'
import LoginPage from './pages/login-page'

function Main () {
    const location = useLocation()

    return (
        <Box w="100vw" h="100vh" backgroundColor={"#F9F9F9"}>
            <Navbar pathname={location.pathname}/>
            { location.pathname !== '/login' ? <Controller/> : null }
            <Routes>
                <Route path='/' element={<StudentFormInput/>}/>
                <Route path='/table' element={<ShowTable/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </Box>
    )
}

export default Main