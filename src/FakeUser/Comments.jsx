import { Box,
    Text,
  } from '@chakra-ui/react'

export default function Comments ({comment}) {
    return (
        <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
        >
            <Text>{comment.name}</Text>
            <Text>{comment.email}</Text>
        </Box>
    )
}