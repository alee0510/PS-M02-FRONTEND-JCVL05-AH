import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

function Navbar () {
    return (
        <Box backgroundColor={"#319795"} h="180" w="100%" px={161}>
            <Flex py="1%" w="100%" h="100%" flexDirection={"column"} justifyContent="flex-end">
                <Text fontSize={"5xl"} fontWeight="bold" color={"white"}>Data Management</Text>
            </Flex>
        </Box>
    )
}

export default Navbar