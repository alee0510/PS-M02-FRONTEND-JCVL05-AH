import React from 'react'
import { Box, Text, Input, Button, Menu, MenuButton, MenuList, MenuItem, Stack } from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'

function StudentFormInput () {
    return (
        <Box px="161px" py={35} w="50%" h="auto">
            <Stack spacing="15px">
                <Text>Name</Text>
                <Input type="text" placeholder='e.x. Firas Kun' />
                <Text>Email</Text>
                <Input type="email" placeholder='e.x. firas.kun@gmail.com' />
                <Text>Programs</Text>
                <Menu>
                    <MenuButton textAlign="left" as={Button} rightIcon={<ChevronDownIcon />}>
                        Fullstack Web Development
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Fullstack Web Development">Fullstack Web Development</MenuItem>
                        <MenuItem value="Data Science" >Data Science</MenuItem>
                        <MenuItem value="UI/UX Designer" >UI/UX Designer</MenuItem>
                        <MenuItem value="Digital Marketing" >Digital Marketing</MenuItem>
                    </MenuList>
                </Menu>
                <Text>Counties</Text>
                <Menu>
                    <MenuButton textAlign="left" as={Button} rightIcon={<ChevronDownIcon />}>
                        Japan
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Japan">Japan</MenuItem>
                        <MenuItem value="Korea" >Korea</MenuItem>
                        <MenuItem value="USA" >USA</MenuItem>
                        <MenuItem value="Rusia" >Rusia</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            <Button marginTop="35px" leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
                Submit
            </Button>
        </Box>
    )
}

export default StudentFormInput