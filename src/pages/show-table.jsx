import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { 
    Box, 
    Table, 
    Tbody,
    Th, 
    Thead, 
    Tr
} from '@chakra-ui/react'

// components
import Loading from '../components/loading'
import Confirmation from '../components/confirmation'
import RowStudent, { RowStudentEdited } from './sub-components/row-students'

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
            if (student.id === id) {
                return (
                    <RowStudentEdited 
                        student={student}
                        onCancel={onButtonCancelEdit}
                    />
                )
            } else {
                return (
                    <RowStudent
                        key={student.id}
                        student={student}
                        index={index}
                        onDelete={() => onButtonDelete(student.id)}
                        onEdit={() => onButtonEdit(student.id)}
                    />
                )
            }
        })
    }

    // event
    const onButtonDelete = (id) => {
        setConfirm(true)
        setId(id)
    }

    const onButtonCancelDelete = () => {
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

    const onButtonEdit = (id) => {
        setId(id)
    }

    const onButtonCancelEdit = () => {
        setId(null)
    }

    return (
        <Box px={161} py={35} w="100%" h="auto">
            <Loading isLoading={loading}/>
            <Confirmation isConfirm={confirm} title="Confirmation" onCancel={onButtonCancelDelete} onConfirm={onButtonConfirmDelete}/>
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