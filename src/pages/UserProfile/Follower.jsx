import {Flex,
        Text,
        Button,
    } from '@chakra-ui/react'


export default function Follower ({fullName, user, onDelete}){
 
    return (
        <>
            <Flex
                justifyContent="space-between"
                mb="20px"
            >
                <Text
                    as="p" 
                    fontSize="20px"
                    color="rgb(14,36,14)"
                >
                    {fullName}
                </Text>
                <Button
                    color="white"
                    backgroundColor="rgb(14,36,14)"
                    onClick={() => onDelete(user)}
                >
                    Delete
                </Button>
            </Flex>
        </>
    )
}