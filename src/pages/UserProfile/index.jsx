import { 
    Box, 
    Text, 
    Link,
    Image 
} from '@chakra-ui/react'
// import { getCurrentUser } from '../../helpers';
import { useMemo } from 'react'
import { Link  as ReactLink } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import FollowingsModal from './FollowingsModal';
import FollowersModal from './FollowersModal';
import { getUsers } from '../../helpers';
import { useState } from 'react';
import { useUser } from '../../Contexts/UserContext';


export default function UserProfile () {

    const {currentUser}= useUser()
    console.log(currentUser);

    const users=getUsers()
    const { 
        isOpen: isOpenFollowingsModal, 
        onOpen: onOpenFollowingsModal, 
        onClose: onCloseFollowingsModal 
    } = useDisclosure();
    const { 
        isOpen: isOpenFollowersModal, 
        onOpen: onOpenFollowersModal, 
        onClose: onCloseFollowersModal 
    } = useDisclosure();


    const followings1=useMemo(()=> {
        const followings2=JSON.parse(currentUser.followings || null) || []

        return followings2
    },[])

    const followers1=useMemo(()=>{
        const followers2=JSON.parse(currentUser.followers || null) || []

        return followers2
    },[])


    const [followings, setFollowings] = useState(followings1)

    const [followers, setFollowers] = useState(followers1)

    const updateCurrentUser = (user) => {
        const followers=JSON.parse(currentUser.followers)
        const deleteFollower=followers.filter((element)=> element.id !== user.id)
        delete currentUser.followers

        const newCurrentUser = {
            ...currentUser,
            followers:JSON.stringify(deleteFollower)
        }

        localStorage.setItem("user", JSON.stringify(newCurrentUser))

        return newCurrentUser
    }

    const updateUsers = (newCurrentUser, user) => {
        

        const followings= JSON.parse(user.followings || null) || []
        const updateFollowings = followings.filter((element)=> element.id !== currentUser.id)

        delete user.followings

        const newUser={
            ...user,
            followings: JSON.stringify(updateFollowings)
        }

        const filteredUsers=users.filter((element) => element.id !== currentUser.id)
        const filteredUsers1 = filteredUsers.filter((element)=> element.id !== newUser.id)

        const newUsers=[
            ...filteredUsers1,
            newCurrentUser, 
            newUser
        ]

        localStorage.setItem("users", JSON.stringify(newUsers))
    }

    const updateCurrentUser1 = (user) => {
        const followings=JSON.parse(currentUser.followings || null) || []
        const deleteFollowing = followings.filter((element)=> element.id !== user.id)
        delete currentUser.followings
        
        const newCurrentUser1={
            ...currentUser,
            followings: JSON.stringify(deleteFollowing)

        }
        
        localStorage.setItem("user", JSON.stringify(newCurrentUser1))

        return newCurrentUser1
    }

    const updateUsers1 = (newCurrentUser1, user) => {
        const followers=JSON.parse(user.followers)
        const updateFollowers = followers.filter((element) => element.id !== newCurrentUser1.id)
        delete user.followers

        const newUser = {
           ...user,
           followers: JSON.stringify(updateFollowers)
        }


       const filteredUsers = users.filter((element) => element.id !== currentUser.id)
       const filteredUsers1=filteredUsers.filter((element)=> element.id !== user.id)

       const newUsers1 = [
           ...filteredUsers1,
           newCurrentUser1,
           newUser
       ]

       localStorage.setItem("users", JSON.stringify(newUsers1))
   }

    const onDeleteFollower = (user) => {
        const newCurrentUser=updateCurrentUser(user)
        updateUsers(newCurrentUser, user);
        const newFollowers=JSON.parse(newCurrentUser.followers || null) || [];
        setFollowers(newFollowers)
    }

    const onUnfollow = (user) => {
        const newCurrentUser1=updateCurrentUser1(user)
        updateUsers1(newCurrentUser1, user)
        const newFollowings = JSON.parse(newCurrentUser1.followings || null) || [];
        setFollowings(newFollowings)
    }

    return (
        <>
        <Box
        width="100%"
        height="100vh"
        backgroundColor="rgb(14,36,14)"
        >
            <Box
            width="100%"
            height="100px"
            p="30px"
            >
                <Link as={ReactLink}
                to="/profile-settings"
                color="white"
                fontSize="20px"
                fontWeight="bold"
                >Settings</Link>
            </Box>
            <Box
            width="100%"
            height="max-content"
            marginTop="150px"
            padding="0 150px"
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
                    <Image src={currentUser.avatar}
                     width="350px"
                     height="350px"
                     borderRadius="50%"
                    />
                </Box>
                <Box
                
                >
                    <Text 
                        as="p"
                        color="white"
                        fontSize="40px"
                        cursor="pointer"
                    >
                        {`${currentUser.first_name} ${currentUser.last_name}`}
                    </Text>
                    <Text
                    color={"white"}
                    fontSize="20px"
                    >Email:</Text>
                    <Text
                      color={"white"}
                      fontSize="20px"
                      >
                        {currentUser.email}
                    </Text>
                    <Box
                    display="flex"
                    justifyContent="space-between"
                    mt="20px"
                    >
                        <Box>
                            <Link
                            onClick={onOpenFollowingsModal}
                            color="white"
                            fontSize="20px"
                            >
                                Followings
                            </Link>
                            <Text
                            color="white"
                            >{followings.length}
                            </Text>
                        </Box>
                        <Box>
                            <Link
                                color="white"
                                fontSize="20px"
                                onClick={onOpenFollowersModal}
                            >
                                Followers
                            </Link>
                            <Text color="white">{followers.length}</Text>
                        </Box>
                    </Box>
                    <FollowingsModal 
                        isOpen={isOpenFollowingsModal}
                        onClose={onCloseFollowingsModal}
                        followings={followings}
                        onUnfollow={onUnfollow}
                     />
                     <FollowersModal
                        isOpen={isOpenFollowersModal}
                        onClose={onCloseFollowersModal}
                        followers={followers}
                        onDelete={onDeleteFollower}
                     />

                </Box>
            </Box>
        </Box>
        </>
    )
}
