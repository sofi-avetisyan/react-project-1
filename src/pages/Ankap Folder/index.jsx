import CustomButton from "./CustomButton"
import {Flex,
    Text,
    Button,
} from '@chakra-ui/react'

export default function AnkapComponent () {
    return(
        <>
            <CustomButton>
                <Text as="span"
                color="red"
                >Say &nbsp;</Text>
                <Text as="span"
                fontWeight="bold"
                >Hi</Text>
            </CustomButton>
        </>
    )
}