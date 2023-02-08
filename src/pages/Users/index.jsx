import { getUsers } from "../../helpers"
import User from "./User";
import { Box} from '@chakra-ui/react'
import { getCurrentUser } from "../../helpers";
import { useUser } from "../../Contexts/UserContext";
const users = getUsers()
// const currentUser=getCurrentUser()



export default function Users () {

    const {currentUser} = useUser()

    const filteredUsers = users.filter((element) => element.id !== currentUser.id) // useMemo
    
    return (
        <Box
        display="flex"
        flexWrap="wrap"
        >
            {
               filteredUsers.map((user) => (
                    <User
                        key={user.id}
                        fullName={`${user.first_name} ${user.last_name}`}
                        avatar={user.avatar}
                        id={user.id}
                    />
                ))
            }
        </Box>
    )
}