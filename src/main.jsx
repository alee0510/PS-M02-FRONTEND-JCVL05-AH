import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './components/navbar'
import ShowTable from './pages/show-table'
import Controller from './components/controller'

function Main () {
    return (
        <Box w="100vw" h="100vh" backgroundColor={"#F9F9F9"}>
            <Navbar/>
            <Controller/>
            <ShowTable/>
        </Box>
    )
}

export default Main