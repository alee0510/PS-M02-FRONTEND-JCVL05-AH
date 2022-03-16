import React from 'react'
import { Box, Flex, InputGroup, InputLeftElement, Input, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons'
import { MdFilterList } from 'react-icons/md'

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
                        <MenuButton minW="150px" backgroundColor="#f9f9f9" as={Button} rightIcon={<MdFilterList />}>
                            Sort By
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Program a-Z</MenuItem>
                            <MenuItem>Program Z-a</MenuItem>
                            <MenuItem>Country a-Z</MenuItem>
                            <MenuItem>Country Z-a</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Controller