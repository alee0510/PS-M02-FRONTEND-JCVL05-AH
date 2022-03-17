import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

// import main component
import Main from './main'

// render main component
ReactDOM.render( 
    <ChakraProvider>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </ChakraProvider>
    ,document.getElementById("root")
)