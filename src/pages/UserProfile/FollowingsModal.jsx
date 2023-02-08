import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import Followings from './Following';

export default function FollowingsModal({isOpen, onClose, followings, onUnfollow}){
    return(
        <>
         <Modal isOpen={isOpen} onClose={onClose}>
                     <ModalContent>
                        <ModalHeader
                        color="rgb(14,36,14)"
                        >Followings</ModalHeader>
                        <ModalCloseButton
                        color="rgb(14,36,14)"
                        />
                        <ModalBody>
                        {
                            followings.map((element)=> (
                                <Followings 
                                user={element}
                                key={element.id}
                                fullName={`${element.first_name} ${element.last_name}`}
                                onUnfollow={onUnfollow}
                                />
                            ))
                        }
                        </ModalBody>
                    </ModalContent>
         </Modal>
        </>
    )
}