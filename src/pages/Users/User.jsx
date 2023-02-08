import { Box,
        Text,
        Link , 
        Image
    } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { generateRandomColor } from '../../helpers'
import { getUsers } from '../../helpers'


const users=getUsers()

export default function User ({fullName, avatar, id}) {

    const color=generateRandomColor()

    return(
        <Box
            width="400px"
            height='500px'
            backgroundColor={color}
            margin="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                width="150px"
                height="150px"
                borderRadius="50%"
                backgroundColor="white"
            >
                <Image 
                    src={avatar}
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    marginBottom="40px"
                />
            </Box>
            <Text 
                as="p"
                color="white"
                fontSize="20px"
            >
                    {fullName}
            </Text>
            <Box 
                marginTop="30px"
            >
              <Link 
                as={ReactLink}
                to={`/users/${id}`}
                justifyContent="space-around"
                margin="20x"
                >
                    Open Profile
              </Link>
            </Box>
        </Box>
    )
}