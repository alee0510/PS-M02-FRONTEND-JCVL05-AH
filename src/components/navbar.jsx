import React from 'react'
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

    const onButtonNavigate = () => {
        const location = props.pathname === '/login' ? '/' : '/login'
        navigate(location)
    }

    const onButtonLogout = () => {
        localStorage.removeItem("token")
    }

    return (
        <Box backgroundColor={"#319795"} h="180" w="100%" px={161}>
            <Flex py="15px" w="100%" h="100%" justifyContent="space-between" alignItems="flex-end">
                <Text fontSize={"5xl"} fontWeight="bold" color={"white"}>
                    { title[props.pathname] }
                </Text>
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
        </Box>
    )
}

export default Navbar