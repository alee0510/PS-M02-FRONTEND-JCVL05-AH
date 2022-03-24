import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { UnlockIcon, LockIcon, ArrowBackIcon } from '@chakra-ui/icons'

function Navbar (props) {
    const title = {
        '/' : 'Home',
        '/table' : 'Data Management',
        '/login' : 'Sign In'
    }

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    
    // global state
    const { email } = useSelector((state) => state.user)
    const dispatch =  useDispatch()

    const onButtonNavigate = () => {
        const location = props.pathname === '/login' ? '/' : '/login'
        navigate(location)
    }

    const onButtonLogout = () => {
        localStorage.removeItem("token")
        dispatch({ type : 'LOGOUT' })
    }

    return (
        <Box backgroundColor={"#319795"} h="180" w="100%" px={161}>
            <Flex py="15px" w="100%" h="100%" justifyContent="space-between" alignItems="flex-end">
                <Text fontSize={"5xl"} fontWeight="bold" color={"white"}>
                    { title[props.pathname] }
                </Text>
                <Flex alignItems="center">
                    <Text fontSize="18px" mr="15px" color="white">{email}</Text>
                    {
                        token ?
                        <Button
                            leftIcon={<LockIcon/>}
                            onClick={onButtonLogout}
                        >
                            Logout
                        </Button>
                        :
                        <Button 
                            leftIcon={ props.pathname === '/login' ? <ArrowBackIcon/> : <UnlockIcon/> }
                            onClick={onButtonNavigate}
                        >
                            { props.pathname === '/login' ? 'back' : 'login' }
                        </Button>
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default Navbar