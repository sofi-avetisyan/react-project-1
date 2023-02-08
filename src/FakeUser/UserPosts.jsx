import {
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Button,
    Box
  } from '@chakra-ui/react'
  import { useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import Comments from './Comments'

  export default function UserPosts ({post, comments}){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showComments, setShowComments] = useState(false)
   
    return (
        <>
        <TableContainer>
            <Table>
                <Tbody 
                display="flex"
                justifyContent="space-between"
                p={" 0 60px"}
                >
                    <Tr>
                        <Td>{post.title}</Td>
                    </Tr>
                    <Button
                    onClick={onOpen}
                    >View Post</Button>
                </Tbody>
            </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Post body
                </ModalHeader>
                <ModalBody>
                    {
                        post.body
                    }
                </ModalBody>
                <ModalBody>
                    {
                        showComments ? comments.map((comment) => <Comments comment={comment} key={comment.id}/>):<Box></Box>
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        !showComments ? <Button colorScheme='blue' mr={3}
                        onClick={()=> setShowComments(true)}
                        >
                            Show Comments
                        </Button>
                        :
                        <Button
                        colorScheme='blue' mr={3}
                        onClick={()=>setShowComments(false)}>Hide Comments</Button>
                    }
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
  }