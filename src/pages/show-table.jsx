import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { 
    Box, 
    Table, 
    Tbody, 
    Td, 
    Th, 
    Thead, 
    Tr, 
    CircularProgress, 
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Text,
    Menu, 
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button
} from '@chakra-ui/react'
import { MdOutlineMoreVert, MdEdit, MdDelete } from 'react-icons/md'

function ShowTable () {
    const [students, setStudent] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [id, setId] = useState(null)

    // side-effect
    useEffect(() => {
        setLoading(true)

        Axios.get("http://localhost:2000/users")
        .then((respond) => {
            setStudent(respond.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])


    const generateStudentRows = () => {
        return students.map((student, index) => {
            return (
                <Tr key={student.id}>
                    <Td>{index + 1}</Td>
                    <Td>{student.name}</Td>
                    <Td>{student.email}</Td>
                    <Td>{student.program}</Td>
                    <Td>{student.country}</Td>
                    <Td>
                        <Menu>
                            <MenuButton as={IconButton} icon={<MdOutlineMoreVert />}/>
                            <MenuList>
                                <MenuItem icon={<MdEdit/>}>Edit</MenuItem>
                                <MenuItem icon={<MdDelete/>} onClick={() => onButtonDelete(student.id)}>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                    </Td>
                </Tr>
            )
        })
    }

    // event
    const onButtonDelete = (id) => {
        setConfirm(true)
        setId(id)
    }

    const onButtonCancelClick = () => {
        setConfirm(false)
        setId(null)
    }

    const onButtonConfirmDelete = () => {
        setConfirm(false)
        setLoading(true)

        Axios.delete(`http://localhost:2000/users/${id}`)
        .then((respond) => {
            console.log(respond.data)

            Axios.get('http://localhost:2000/users')
            .then((respond2) => {
                setStudent(respond2.data)
                setLoading(false)
                setId(null)
            })
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
            setId(null)
        })
    }

    return (
        <Box px={161} py={35} w="100%" h="auto">
            <Modal isOpen={loading}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Flex w="100%" h="16" justifyContent="center" alignItems="center">
                            <CircularProgress isIndeterminate color='#319795' /> 
                            <Text fontSize="2xl" pl="10px" fontWeight="bold" color='#319795'>Loading . . .</Text>
                        </Flex> 
                    </ModalBody>
                </ModalContent>
            </Modal>
            <AlertDialog
                isOpen={confirm}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Confirmation
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onButtonCancelClick}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' ml={3} onClick={onButtonConfirmDelete}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Table variant="simple" backgroundColor={"white"}>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Program</Th>
                        <Th>Country</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    { generateStudentRows() }
                </Tbody>
            </Table>
        </Box>
    )
}

export default ShowTable