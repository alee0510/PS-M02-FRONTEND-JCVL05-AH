import React, { useEffect } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// components
import Navbar from './components/navbar'
import Controller from './components/controller'
import Loading from './components/loading'

// pages
import ShowTable from './pages/show-table'
import StudentFormInput from './pages/form-input'
import LoginPage from './pages/login-page'

function Main () {
    const location = useLocation()

    // global state
    const loading = useSelector((state) => state.user.loading)
    const dispatch = useDispatch()

    // side-effect
    useEffect(() => {
        const id = localStorage.getItem("token")
        dispatch({ type : 'ON_START' })

        Axios.get(process.env.REACT_APP_API_URL + `/users/${id}`)
        .then((respond) => {
            dispatch({ type : 'LOGIN', payload : respond.data })
            dispatch({ type : 'ON_END'})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : 'ON_END'})
        })
    }, [])

    return (
        <Box w="100vw" h="100vh" backgroundColor={"#F9F9F9"}>
            <Navbar pathname={location.pathname}/>
            { location.pathname !== '/login' ? <Controller pathname={location.pathname}/> : null }
            <Routes>
                <Route path='/' element={<StudentFormInput/>}/>
                <Route path='/table' element={<ShowTable/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
            <Loading isLoading={loading}/>
        </Box>
    )
}

export default Main