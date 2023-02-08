import { useState, useEffect } from "react"
import axios from "axios"
import FakeUserCard from "./FakeUserCard"
import { 
    Box,
    Input,
    Spinner
  } from '@chakra-ui/react'
  import userService from "../services/userService"

  console.log(userService.getFakeUsers());


export default function FakeUsers () {

    const [fakeUsers, setFakeUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredUsers, setFilteredUsers]=useState([]);

    const initUsers = async() => {
        
        const users = await userService.getFakeUsers()

        setFakeUsers(users.data)
        setFilteredUsers(users.data)
        setLoading(false)
    }

    console.log(filteredUsers);


    const filterByName=(e)=>{
         const query = e.target.value;
       
            const filteredUsers1 = fakeUsers.filter((user)=> {
                return user.name.toLowerCase().startsWith(query.toLowerCase())
            })
            console.log(filteredUsers1);
            setFilteredUsers(filteredUsers1)
    } 

    const filterByEmail = (e) => {
        const query=e.target.value
        
            const filteredUsers2=fakeUsers.filter((user)=> {
                return user.email.toLowerCase().startsWith(query.toLowerCase())
            })
            setFilteredUsers(filteredUsers2)
    }

    const filterByCity=(e)=>{
            const query=e.target.value
        

            const filteredUsers2=fakeUsers.filter((user)=> {
                return user.address.city.toLowerCase().startsWith(query.toLowerCase())
            })
            setFilteredUsers(filteredUsers2)
        
    }

    useEffect(()=> {
      initUsers()
      
    },[])

    return (
        <>
        <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        >
            <Input 
            type={"search"}
            placeholder="User Name"
            onChange={filterByName}
            />
            <Input
            type={"search"}
            placeholder="User Email"
            onChange={filterByEmail}

            />
            <Input
            type={"search"}
            placeholder="User City"
            onChange={filterByCity}

            />
        </Box>
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {
                loading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />: 
              <Box
              display={"flex"}
              flexWrap="wrap"
              >
                  {
                        filteredUsers.map((user) => (
                            <FakeUserCard
                            key={user.id}
                            user={user}
                            
                            />
                        ))
                  }
              </Box>
              
            }
        </Box>
        </>
    )
}