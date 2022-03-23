import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { 
    Box, 
    Table, 
    Tbody,
    Th, 
    Thead, 
    Tr,
    IconButton,
    Flex,
    Text
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

// components
import Loading from '../components/loading'
import Confirmation from '../components/confirmation'
import RowStudent, { RowStudentEdited } from './sub-components/row-students'

const API_URL = process.env.REACT_APP_API_URL
function ShowTable () {
    const [students, setStudent] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [editConfirm, setEditConfirm] = useState(false)
    const [id, setId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(false)

    // edited state
    const inputNameRef = useRef('')
    const inputEmailRef = useRef('')
    const [program, setProgram] = useState('')
    const [country, setCounty] = useState('')

    // side-effect
    useEffect(() => {
        setLoading(true)
        Axios.get(API_URL + `/students?_page=${page}&_limit=${5}`)
        .then((respond) => {
            if (!respond.data.length) {
                setLastPage(true)
            } else {
                setLastPage(false)
            }
            setStudent(respond.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })

    }, [page])

    const generateStudentRows = () => {
        return students.map((student, index) => {
            if (student.id === editId) {
                return (
                    <RowStudentEdited
                        key={student.id} 
                        student={student}
                        programTitle={program}
                        countryTitle={country}
                        onCancel={() => setEditId(null)}
                        onSave={onButtonSave}
                        nameRef={inputNameRef}
                        emailRef={inputEmailRef}
                        onProgramMenuClick={onProgramMenuClick}
                        onCountryMenuClick={onCountryMenuClick}
                    />
                )
            } else {
                return (
                    <RowStudent
                        key={student.id}
                        student={student}
                        index={index}
                        onDelete={() => onButtonDelete(student.id)}
                        onEdit={() => onButtonEdit(student.id, student.program, student.country)}
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

        Axios.delete(API_URL + `/students/${id}`)
        .then((respond) => {
            console.log(respond.data)

            Axios.get(API_URL + '/students?_page=1&_limit=5')
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

    const onButtonEdit = (id, program, country) => {
        setEditId(id)
        setProgram(program)
        setCounty(country)
    }

    const onProgramMenuClick = (event) => {
        setProgram(event.target.value)
    }
    const onCountryMenuClick = (event) => {
        setCounty(event.target.value)
    }
    const onButtonSave = () => {
        setEditConfirm(true)
    }
    const onButtonCancelEdit = () => {
        setEditConfirm(false)
    }
    const onButtonConfirmEdit = () => {
        const newEditedStudent = {
            id : editId,
            name : inputNameRef.current.value,
            email : inputEmailRef.current.value,
            program : program,
            country : country
        }
        setEditConfirm(false)
        setLoading(true)
        setEditId(null)
        setCounty("")
        setProgram("")

        Axios.put(API_URL + `/students/${editId}`, newEditedStudent)
        .then((respond) => {
            console.log(respond.data)

            Axios.get(API_URL + '/students?_page=1&_limit=5')
            .then((respond2) => {
                setStudent(respond2.data)
                setLoading(false)
            })
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }

    const onButtonPrev = () => {
        if (page <= 1) return

        setPage((prev) => prev - 1)
    }
    const onButtonNext = () => setPage((prev) => prev + 1)

    return (
        <Box px={161} py={35} w="100%" h="auto">
            <Loading isLoading={loading}/>
            <Confirmation 
                isConfirm={confirm} 
                title="Delete Confirmation" 
                onCancel={onButtonCancelDelete} 
                onConfirm={onButtonConfirmDelete}
            />
            <Confirmation
                isConfirm={editConfirm}
                title="Edit Confirmation"
                onCancel={onButtonCancelEdit}
                onConfirm={onButtonConfirmEdit}
            />
            <Table variant="simple" minH="400px" backgroundColor={"white"}>
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
            <Flex 
                backgroundColor="white" 
                px="25px" 
                alignItems="center" 
                justifyContent="flex-start" 
                w="100%" 
                h="50px"
            >
                <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={onButtonPrev}
                    disabled={page <= 1}
                />
                <Text fontSize="16px" mx="15px">{page}</Text>
                <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={onButtonNext}
                    disabled={lastPage}
                />
            </Flex>
        </Box>
    )
}

export default ShowTable