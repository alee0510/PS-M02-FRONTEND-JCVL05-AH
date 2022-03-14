import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Box, Table, Tbody, Td, Th, Thead, Tr, CircularProgress, Flex } from '@chakra-ui/react'

function ShowTable () {
    const [students, setStudent] = useState([])
    const [loading, setLoading] = useState(false)

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
                    <Td></Td>
                </Tr>
            )
        })
    }

    return (
        <Box px={161} py={35} w="100%" h="auto">
            { 
                loading ?
                <Flex w="100%" h="16" justifyContent="center" alignItems="center">
                    <CircularProgress isIndeterminate color='#319795' /> 
                </Flex> 
                : 
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
            }
        </Box>
    )
}

export default ShowTable