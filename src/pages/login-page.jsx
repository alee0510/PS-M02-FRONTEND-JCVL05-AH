import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { Box, Flex, Text, Input, Button, Spinner, useToast } from '@chakra-ui/react'
import { UnlockIcon } from '@chakra-ui/icons'

const API_URL = process.env.REACT_APP_API_URL
function LoginPage () {
    const username = useRef("")
    const password = useRef("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onButtonLogin = () => {
        setLoading(true)
        Axios.get(API_URL + `/users?username=${username.current.value}&password=${password.current.value}`)
        .then((respond) => {
            console.log(respond.data)
            setLoading(false)

            // if failed => data = []
            if (!respond.data.length) return toast({
                title : 'Error',
                description : "Username & password doesn't found",
                status : 'error',
                duration : 3000,
                isClosable : true
            })

            // if success 
            // save token to localstorage
            localStorage.setItem("token", respond.data[0].id)

            // save user data to global state
            dispatch({ type : 'LOGIN', payload : respond.data[0] })

            // -> redirect to home page
            navigate('/')

            toast({
                title : 'Login success',
                status : 'success',
                duration : 3000,
                isClosable : true
            })

        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }

    // protection
    const token = localStorage.getItem('token')
    if (token) return <Navigate to="/"/>

    return (
        <Box w="100%">
            <Flex w="100%" alignItems="center" justifyContent="center">
                <Box 
                    w="630px" 
                    backgroundColor="#FFFFFF" 
                    px="5%" 
                    py="5%" 
                    marginTop="5%" 
                    boxShadow="base"
                >
                    <Text marginBottom="15px">Username</Text>
                    <Input ref={username} marginBottom="15px" type="text" placeholder="firas kun"/>

                    <Text marginBottom="15px">Password</Text>
                    <Input ref={password} marginBottom="25px" type="password" placeholder='*****'/>

                    <Button 
                        leftIcon={loading ? <Spinner size="md"/> : <UnlockIcon />} 
                        colorScheme='teal' 
                        variant='solid'
                        onClick={onButtonLogin}
                        disabled={loading}
                    >
                        { loading ? 'Loading....' : 'Login' }
                    </Button>
                </Box>
            </Flex>
        </Box>
    )

}

export default LoginPage