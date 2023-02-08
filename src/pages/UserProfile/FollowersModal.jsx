import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import Follower from './Follower';

export default function FollowersModal({isOpen, onClose, followers, onDelete}){

    return(
        <>
         <Modal
            isOpen={isOpen} 
            onClose={onClose}>
                <ModalContent>
                 <ModalHeader
                    color="rgb(14,36,14)"
                 >
                    Followers
                 </ModalHeader>
                 <ModalCloseButton
                    color="rgb(14,36,14)"
                        />
                    <ModalBody>
                        {
                            followers.map((element)=> (
                                <Follower 
                                    user={element}
                                    key={element.id}
                                    fullName={`${element.first_name} ${element.last_name}`}
                                    onDelete={onDelete}
                                />
                            ))
                        }
                        </ModalBody>
                    </ModalContent>
         </Modal>
        </>
    )
}