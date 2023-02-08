import { useParams } from "react-router-dom"
import { getUserById } from "../../helpers"
import {
    Box,
    Text, 
    Button,
    Link, 
    Image,
} from '@chakra-ui/react'
import { Link as ReactLink } from "react-router-dom";
import { getUsers } from "../../helpers";
import { useMemo } from "react";
import { useUser } from "../../Contexts/UserContext";


export default function Profile () {
    const { id }=useParams();
    const user = getUserById(id);
    const {currentUser}= useUser()
   
    const isFollower = useMemo(()=>{
        const followings=JSON.parse(currentUser.followings || null) || [];
        const  x = followings.find((following)=> following.id === user.id );

        return x ? true: false;
    },[])

    const updateCurrentUserFollowings = () => {
        const followings = JSON.parse(currentUser.followings || null) || []
        followings.push(user);
        const newCurrentUser = {
             ...currentUser,
            followings: JSON.stringify(followings),
        } 
    
        const newUserJson=JSON.stringify(newCurrentUser)
        localStorage.setItem("user", newUserJson)

        return newCurrentUser;
    }

    const updateUsers = (newCurrentUser) => {
        const users = getUsers();

        const followers = JSON.parse(user.followers || null) || [];
        followers.push(newCurrentUser)
        const newUser = {
            ...user, 
            followers: JSON.stringify(followers),
        }
       
        const filteredUsers = users.filter((user) =>  user.id !== newCurrentUser.id);
        const filteredUsers1 = filteredUsers.filter((item) => item.id !== user?.id);

        const newUsers = [
            ...filteredUsers1,
            newCurrentUser,
            newUser,
        ]

        localStorage.setItem("users", JSON.stringify(newUsers))
    }
    
    const handleClick1 = () => {
        window.location.reload(false)
        const newCurrentUser = updateCurrentUserFollowings()
        updateUsers(newCurrentUser);
    }

    const updateCurrentUserFollowing1=()=>{
        const followings=JSON.parse(currentUser.followings || null) || []
        const newFollowings = followings.filter((element)=> element.id !== user.id)
        delete currentUser.followings
        const newCurrentUser1={
            ...currentUser,
            followings:JSON.stringify(newFollowings)
        }

        localStorage.setItem("user", JSON.stringify(newCurrentUser1))

        return newCurrentUser1
    }

    const updateUsers1 = (newCurrentUser1) => {
        const users=getUsers()

        const followers=JSON.parse(user.followers)
        const updateFollowers = followers.filter((element) => element.id !== currentUser.id)
        delete user.followers

        const newUser = {
           ...user,
           followers: JSON.stringify(updateFollowers)
        }


        const filteredUsers = users.filter((element) => element.id !== currentUser.id)
        const filteredUsers1=filteredUsers.filter((element)=> element.id !== user.id)

        const newUsers = [
           ...filteredUsers1,
           newCurrentUser1,
           newUser
        ]

        localStorage.setItem("users", JSON.stringify(newUsers))
      
    }
    const handleClick2 = () => {
        const newCurrentUser1= updateCurrentUserFollowing1()
        updateUsers1(newCurrentUser1)
        window.location.reload(false)
    }

    return(
        <>
                <Box 
                    width="100%"
                    height="100px"
                    bgColor="rgb(14, 67, 14)"
                    alignItems="center"
                    display="flex"
                    padding="30px"
                >
                <Link 
                    as={ReactLink}
                    to="/users"
                    color="white"
                    fontSize="20px"
                >
                    Users
                </Link>
                </Box>
                <Box
                    width="100%"
                    height="730px"
                    backgroundColor="rgb(14,67,14)"
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                >
                  
                    <Box
                        backgroundColor="white"
                        width="350px"
                        height="350px"
                        borderRadius="50%"
                    >
                        <Image 
                            src={user?.avatar}
                            width="350px"
                            height="350px"
                            borderRadius="50%"
                        />
                    </Box>
                    <Box >
                        <Text 
                            as="p"
                            color="white"
                            fontSize="40px"
                        >
                             {`${user?.first_name} ${user?.last_name}`}
                         </Text>
                        <Text
                            color={"white"}
                            fontSize="20px"
                        >
                            Email:
                        </Text>
                        <Text
                        color={"white"}
                        fontSize="20px"
                        >
                            {user?.email}
                        </Text>
                </Box>
                <Box>
                    {
                     isFollower ? <Button
                         onClick={handleClick2}
                     >
                        Unfollow
                     </Button>:
                     <Button
                        onClick={handleClick1}
                     >
                        Follow
                     </Button>
                    }                  
                </Box>
            </Box>
        </>
    )
}