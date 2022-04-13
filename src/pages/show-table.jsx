import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

// actions
import { getStudentData, deleteStudent, editStudent } from '../redux/actions/student-actions'

// components
import Loading from '../components/loading'
import Confirmation from '../components/confirmation'
import RowStudent, { RowStudentEdited } from './sub-components/row-students'

function ShowTable () {
    const [confirm, setConfirm] = useState(false)
    const [editConfirm, setEditConfirm] = useState(false)
    const [id, setId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [page, setPage] = useState(1)

    // edited state
    const inputNameRef = useRef('')
    const inputEmailRef = useRef('')
    const [program, setProgram] = useState('')
    const [country, setCounty] = useState('')

    // redux
    const dispatch = useDispatch()
    const { data, loading, count } =  useSelector(state => {
        return {
            data : state.student.data,
            loading : state.student.loading,
            count : state.student.count
        }
    })

    // side-effect
    useEffect(() => dispatch(getStudentData(page, 5)), [page])

    const generateStudentRows = () => {
        return data.map((student, index) => {
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
                        onDelete={() => onButtonDelete(student.studentId)}
                        onEdit={() => onButtonEdit(student.studentId, student.program, student.country)}
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
        dispatch(deleteStudent(id))
        setId(null)
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
        setEditId(null)
        setCounty("")
        setProgram("")

        dispatch(editStudent(editId, newEditedStudent))
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
            <Table variant="simple" backgroundColor={"white"}>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Student-ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Program</Th>
                        <Th>City</Th>
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
                    disabled={page >= Math.ceil(count / 5)}
                />
            </Flex>
        </Box>
    )
}

export default ShowTable