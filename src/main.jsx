import React from 'react'
import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/navbar'
import Controller from './components/controller'

// pages
import ShowTable from './pages/show-table'
import StudentFormInput from './pages/form-input'

function Main () {
    return (
        <Box w="100vw" h="100vh" backgroundColor={"#F9F9F9"}>
            <Navbar/>
            <Controller/>
            <Routes>
                <Route path='/' element={<StudentFormInput/>}/>
                <Route path='/table' element={<ShowTable/>}/>
            </Routes>
        </Box>
    )
}

export default Main