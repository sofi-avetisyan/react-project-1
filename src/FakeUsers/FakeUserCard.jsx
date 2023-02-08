import { Box,
    Text,
    Button,
    Input,
    Link
  } from '@chakra-ui/react'
import User from '../pages/Users/User'
import { Link  as ReactLink } from 'react-router-dom';

export default function FakeUserCard ({user}) {
    return (
        <>
            <Box
            width="300px"
            height="400px"
            border="1px solid black"
            m="20px"
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            >
                <Text>
                    {user.name}
                </Text>
                <Text>
                    {user.username}
                </Text>
                <Text>
                    {user.email}
                </Text>
                <Text>
                    {user.address.city}
                </Text>
                <Link as={ReactLink}
                to={`/fake-users/${user.id}`}
                >
                    Open single page
                </Link>
            </Box>
        </>
    )
}