import React from 'react'
import { Box, Flex, InputGroup, InputLeftElement, Input, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons'

function Controller () {
    return (
        <Box w="100%" h={50} px={161} py="4">
            <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                <Flex flexDirection="row">
                    <Box minW={100} py="2" cursor="pointer">Form Input</Box>
                    <Box minW={100} py="2" cursor="pointer" borderBottom="2px" borderBottomColor="blue.400" textAlign="center">Table</Box>
                </Flex>
                <Flex>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input type='tel' placeholder='Search' />
                    </InputGroup>
                    <Menu>
                        <MenuButton minW="150px" backgroundColor="#f9f9f9" as={Button} rightIcon={<HamburgerIcon />}>
                            Sort By
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Program</MenuItem>
                            <MenuItem>Country</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Controller