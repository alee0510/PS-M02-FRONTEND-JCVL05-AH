import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'

// components
import Card from './components/card'

function Main () {
    const [users, setUser] = useState([
        {
            id : 1,
            name: "Rashad Davis",
            email: "nullam.scelerisque@google.edu",
            country: "Vietnam",
            phone: "(953) 343-2436"
        },
        {
            id : 2,
            name: "Octavius Conley",
            email: "sagittis.placerat.cras@outlook.org",
            country: "Pakistan",
            phone: "(613) 562-8251"
        },
        {
            id : 3,
            name: "Aladdin Rhodes",
            email: "nulla.facilisi@hotmail.net",
            country: "Belgium",
            phone: "(487) 541-6221"
        },
        {
            id : 4,
            name: "Honorato Clarke",
            email: "sed.sapien.nunc@hotmail.org",
            country: "Sweden",
            phone: "1-327-242-5259"
        },
        {
            id : 5,
            name: "Zenia Lewis",
            email: "eu.euismod@yahoo.ca",
            country: "Colombia",
            phone: "1-526-703-8949"
        }
    ])

    const generateUserCards = () => {
        return users.map((user, index) => {
            return (
                <Card
                    key={user.id} 
                    index={index}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    country={user.country}
                    onButtonClick={() => onButtonDelete(index)}
                />
            )
        })
    }

    // event
    const onButtonDelete = (index) => {
        setUser((prevState) => {
            let temp = [...prevState]
            temp.splice(index, 1)
            return temp
        })
    }

    return (
        <Flex p={10} flexWrap={'wrap'}>
            { generateUserCards() }
        </Flex>
    )
}

export default Main