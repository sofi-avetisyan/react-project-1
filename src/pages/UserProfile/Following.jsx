import {Flex,
         Text, 
         Button,
        } from '@chakra-ui/react'
import { getUsers } from '../../helpers'
// import { getCurrentUser } from '../../helpers'

import { useUser } from '../../Contexts/UserContext'





export default function Followings ({fullName, user, onUnfollow}){
    // const currentUser=getCurrentUser()
    const {currentUser}= useUser()
    const users=getUsers()

    const updateCurrentUser = () => {
        const followings=JSON.parse(currentUser.followings || null) || []
        const deleteFollowing = followings.filter((element)=> element.id !== user.id)
        delete currentUser.followings
        
        const newCurrentUser={
            ...currentUser,
            followings: JSON.stringify(deleteFollowing)

        }
        
        localStorage.setItem("user", JSON.stringify(newCurrentUser))

        return newCurrentUser
    }

    const updateUsers = (newCurrentUser) => {
         const followers=JSON.parse(user.followers)
         const updateFollowers = followers.filter((element) => element.id !== newCurrentUser.id)
         delete user.followers

         const newUser = {
            ...user,
            followers: JSON.stringify(updateFollowers)
         }


        const filteredUsers = users.filter((element) => element.id !== currentUser.id)
        const filteredUsers1=filteredUsers.filter((element)=> element.id !== user.id)

        const newUsers = [
            ...filteredUsers1,
            newCurrentUser,
            newUser
        ]

        localStorage.setItem("users", JSON.stringify(newUsers))
       
    }

    const handleClick=()=>{
       window.location.reload(false);

       const newCurrentUser = updateCurrentUser()
        updateUsers(newCurrentUser)
      
    }

    return (
        <>
            <Flex
            justifyContent="space-between"
            mb="20px"
            >
                <Text as="p" 
                fontSize="20px"
                color="rgb(14,36,14)"
                
                >{fullName}</Text>
                <Button
                color="white"
                backgroundColor="rgb(14,36,14)"
                onClick={() => onUnfollow(user)}
                >Unfollow</Button>
            </Flex>
        </>
    )
}