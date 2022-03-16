import React from 'react'
import { Tr, Td, Menu, MenuButton, MenuList, MenuItem, IconButton, Input, Button } from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { MdOutlineMoreVert, MdEdit, MdDelete } from 'react-icons/md'

export default function RowStudent ({ student, index, onDelete, onEdit }) {
    return (
        <Tr>
            <Td>{index + 1}</Td>
            <Td>{student.name}</Td>
            <Td>{student.email}</Td>
            <Td>{student.program}</Td>
            <Td>{student.country}</Td>
            <Td>
                <Menu>
                    <MenuButton as={IconButton} icon={<MdOutlineMoreVert />}/>
                    <MenuList>
                        <MenuItem icon={<MdEdit/>} onClick={onEdit}>Edit</MenuItem>
                        <MenuItem icon={<MdDelete/>} onClick={onDelete}>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    )
}

export function RowStudentEdited ({ student, onCancel }) {
    return (
        <Tr>
            <Td>#</Td>
            <Td>
                <Input type="text" defaultValue={student.name}/>
            </Td>
            <Td>
                <Input type="email" defaultValue={student.email}/>
            </Td>
            <Td>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Programs
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Fullstack Web Development</MenuItem>
                        <MenuItem>Data Science</MenuItem>
                        <MenuItem>UI/UX Designer</MenuItem>
                        <MenuItem>Digital Marketing</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
            <Td>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Countries
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Japan</MenuItem>
                        <MenuItem>Korea</MenuItem>
                        <MenuItem>USA</MenuItem>
                        <MenuItem>Rusia</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
            <Td>
                <IconButton
                    colorScheme='green'
                    icon={<CheckIcon />}
                />
                <IconButton
                    onClick={onCancel}
                    ml="5px"
                    colorScheme='red'
                    icon={<CloseIcon />}
                />
            </Td>
        </Tr>
    )
}