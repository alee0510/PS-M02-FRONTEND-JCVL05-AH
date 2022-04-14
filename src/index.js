import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

// import main component
import Main from './main'

// configure redux
import userReducer from './redux/reducers/user-reducer'
import studentReducer from './redux/reducers/student-reducer'
import programReducer from './redux/reducers/program-reducer'
import cityReducer from './redux/reducers/city-reducers'

const Reducers = combineReducers({
    user : userReducer,
    student : studentReducer,
    program : programReducer,
    city : cityReducer
})
const store = createStore(Reducers, composeWithDevTools(applyMiddleware(ReduxThunk)))

// render main component
ReactDOM.render( 
    <ChakraProvider>
        <BrowserRouter>
            <Provider store={store}>
                <Main/>
            </Provider>
        </BrowserRouter>
    </ChakraProvider>
    ,document.getElementById("root")
)