import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

// import main component
import Main from './main'

// render main component
ReactDOM.render( 
    <ChakraProvider>
        <Main/>
    </ChakraProvider>
    ,document.getElementById("root")
)