import React, { useRef, useState } from 'react'
import Axios from 'axios'
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

const API_URL = process.env.REACT_APP_API_URL
function StudentFormInput () {
    const name = useRef("")
    const email = useRef("")
    const [program, setProgram] = useState("Fullstack Web Development")
    const [country, setCountry] = useState("Japan")
    const [loading, setLoading] = useState(false)

    const toast = useToast()

    // event
    const onProgramClick = (event) => setProgram(event.target.value)
    const onCountryClick = (event) => setCountry(event.target.value)
    const onButtonSubmit = () => {
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
            program : program,
            country : country
        }
        console.log(newStudent)

        setLoading(true)
        Axios.post(API_URL + '/users', newStudent)
        .then((respond) =>  {
            console.log("respond : ", respond.data)

            // reset state
            setProgram("Fullstack Web Development")
            setCountry("Japan")
            name.current.value = ""
            email.current.value = ""

            setLoading(false)

            return toast({
                title: 'Info',
                description: "New data has been added.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }

    return (
        <Box px="161px" py={35} w="40%" h="auto">
            <Flex flexDirection="column">
                <Text marginBottom="15px">Name</Text>
                <Input ref={name} marginBottom="15px" type="text" placeholder='e.x. Firas Kun' />

                <Text marginBottom="15px">Email</Text>
                <Input ref={email} marginBottom="15px" type="email" placeholder='e.x. firas.kun@gmail.com' />

                <Text marginBottom="15px">Programs</Text>
                <Menu>
                    <MenuButton marginBottom="15px" textAlign="left" as={Button} rightIcon={<ChevronDownIcon />}>
                        { program }
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Fullstack Web Development" onClick={onProgramClick}>Fullstack Web Development</MenuItem>
                        <MenuItem value="Data Science" onClick={onProgramClick}>Data Science</MenuItem>
                        <MenuItem value="UI/UX Designer" onClick={onProgramClick}>UI/UX Designer</MenuItem>
                        <MenuItem value="Digital Marketing" onClick={onProgramClick}>Digital Marketing</MenuItem>
                    </MenuList>
                </Menu>

                <Text marginBottom="15px">Counties</Text>
                <Menu>
                    <MenuButton textAlign="left" as={Button} rightIcon={<ChevronDownIcon />}>
                        { country }
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Japan" onClick={onCountryClick}>Japan</MenuItem>
                        <MenuItem value="Korea" onClick={onCountryClick}>Korea</MenuItem>
                        <MenuItem value="USA" onClick={onCountryClick}>USA</MenuItem>
                        <MenuItem value="Rusia" onClick={onCountryClick}>Rusia</MenuItem>
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