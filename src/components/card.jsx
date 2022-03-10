import React from 'react'
import { 
    Text, 
    Box, 
    Stack, 
    Heading,
    Button
} from '@chakra-ui/react'

function Card(props) {
    return (
        <Box
            maxW={'445px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'md'}
            p={5}
            m={5}
            overflow={'hidden'}>
            <Stack>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}>
                    DATA USER - {props.index}
                </Text>
                <Heading
                    color={'gray.700'}
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {props.name}
                </Heading>
                <Text color={'gray.500'}>Email : {props.email}</Text>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>Phone : {props.phone}</Text>
                        <Text color={'gray.700'}>Country : {props.country}</Text>
                </Stack>
            </Stack>
            <Stack mt={2}>
                <Button 
                    bgColor={'red.300'} 
                    color={'white'}
                    onClick={props.onButtonClick}
                >
                    Delete
                </Button>
            </Stack>
        </Box>
    )
}

export default Card