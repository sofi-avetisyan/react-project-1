import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Box,
    Text,
  } from '@chakra-ui/react'
import UserPosts from "./UserPosts"
import userService from "../services/userService"



export default function FakeUser () {
    const {id} = useParams()
    const [user, setUser] = useState({})
    const [filteredPosts, setFilteredPosts] = useState([])
    const [comments, setComments] = useState([])
    console.log(id);


    const initUser = async() => {
        const user = await userService.getFakeUser(id);

        setUser(user.data)

    }

    const initPosts = async() => {
        const posts1= await userService.getUserPosts()

        const filteredPost1=posts1.data.filter(post => post.userId ===  +id)

        setFilteredPosts(filteredPost1)
    }

    const initComments = async() => {
        const comments1= await userService.getPostsComments(id) 

        setComments(comments1.data)
    }
  
    useEffect(()=>{
        initUser();
        initPosts();
        initComments();
        console.log(user);
    },[])

    return (
        <>
        <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        flexDirection={"column"}
        m={"20px"}
        fontSize="20px"
        >
            <Text as={"h1"}>
                {user.name}
            </Text>
            <Text as="h1">
                {user.username}
            </Text>
            <Text>
                {user.email}
            </Text>
        </Box>
        <Box>
            {
                filteredPosts.map((post)=> <UserPosts post={post} key={post.id} comments={comments}/>)
            }
        </Box>
       
        
        </>
    )
}