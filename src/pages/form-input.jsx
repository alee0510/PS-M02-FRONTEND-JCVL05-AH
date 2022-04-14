import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    Box, 
    Text, 
    Input, 
    Button, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem,
    Flex,
    Spinner,
    useToast
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'

// actions
import { getProgram } from '../redux/actions/program-actions'
import { getCity } from '../redux/actions/city-actions'
import { postStudentData } from '../redux/actions/student-actions'

function StudentFormInput () {
    const name = useRef("")
    const email = useRef("")
    const [programIdx, setProgramIdx] = useState(null)
    const [cityIdx, setCiyyIdx] = useState(null)

    // initialize
    const toast = useToast()
    const dispatch = useDispatch()

    // global state
    const { programs, cities, loading } = useSelector((state) => {
        return {
            programs : state.program.data,
            cities : state.city.data,
            loading : state.program.loading
        }
    })

    // event
    const onButtonSubmit = async () => {
        // input validation
        if (name.current.value === "" || email.current.value === "") {
            return toast({
                title: 'Warning.',
                description: "Name and email cannot be empty.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }

        const newStudent = {
            name : name.current.value,
            email : email.current.value,
            programId : programs[programIdx].id,
            cityId : cities[cityIdx].id
        }
        console.log(newStudent)

        const [ success, error ] = await dispatch(postStudentData(newStudent))
        if (!success) {
            return toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

        // clear state
        setProgramIdx(null)
        setCiyyIdx(null)
        name.current.value = ''
        email.current.value = ''
        
        return toast({
            title: 'Info',
            description: "New data has been added.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    // side-effect
    useEffect(() => {
        dispatch(getProgram())
        dispatch(getCity())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // generate dropdown list
    const generateProgramList = () => {
        return programs.map((program, index) => {
            return (
                <MenuItem 
                    key={program.id}
                    value={program.program} 
                    onClick={() => setProgramIdx(index)}
                >
                    {program.program}
                </MenuItem>
            )
        })
    }
    const generateCityList = () => {
        return cities.map((city, index) => {
            return (
                <MenuItem 
                    key={city.id}
                    value={city.city} 
                    onClick={() => setCiyyIdx(index)}
                >
                    {city.city}
                </MenuItem>
            )
        })
    }

    return (
        <Box px="161px" py={35} w="45%" h="auto">
            <Flex flexDirection="column">
                <Text marginBottom="15px">Name</Text>
                <Input ref={name} marginBottom="15px" type="text" placeholder='e.x. Firas Kun' />

                <Text marginBottom="15px">Email</Text>
                <Input ref={email} marginBottom="15px" type="email" placeholder='e.x. firas.kun@gmail.com' />

                <Text marginBottom="15px">Programs</Text>
                <Menu>
                    <MenuButton marginBottom="15px" textAlign="left" as={Button} rightIcon={<ChevronDownIcon />}>
                        { programIdx ? programs[programIdx].program : 'Programs' }
                    </MenuButton>
                    <MenuList>
                        { generateProgramList() }
                    </MenuList>
                </Menu>

                <Text marginBottom="15px">City</Text>
                <Menu>
                    <MenuButton textAlign="left" as={Button} rightIcon={<ChevronDownIcon />}>
                        {cityIdx ? cities[cityIdx].city : 'City' }
                    </MenuButton>
                    <MenuList>
                        { generateCityList() }
                    </MenuList>
                </Menu>
            </Flex>

            <Button 
                marginTop="35px" 
                leftIcon={ loading ? <Spinner size="md"/> : <AddIcon/>} 
                colorScheme='teal' 
                variant='solid'
                onClick={onButtonSubmit}
                disabled={loading}
            >
                { loading ? "Loading..." : "Submit" }
            </Button>
        </Box>
    )
}

export default StudentFormInput