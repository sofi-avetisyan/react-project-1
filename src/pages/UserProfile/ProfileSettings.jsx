import { Box,
        Text,
        Button,
        Input,
      } from '@chakra-ui/react'
// import { getCurrentUser } from '../../helpers'
import { useUser } from '../../Contexts/UserContext';
import { getUsers } from '../../helpers';
import { useForm } from "react-hook-form";
import { useToast } from '@chakra-ui/react';


// const user=getCurrentUser()


export default function ProfileSetting (){


    const {currentUser} = useUser()
    console.log(currentUser);
    const toast = useToast()

    const { register, handleSubmit,  formState: { errors } } = useForm({
        defaultValues:{
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
        }
    });

    const  updateCurrentUser =(newUser) => {
        const newUserJson=JSON.stringify(newUser)
        localStorage.setItem("user", newUserJson)
      }

    const updateUsers = (newUser) => {
        const users = getUsers()

        const filteredUsers = users.filter((user) => user.id !== newUser.id)

        const newUsers =[
            ...filteredUsers,
            newUser
        ]

        localStorage.setItem("users", JSON.stringify(newUsers))
    }


    const onSubmitChanges = (values) => {
        const newUser={
            ...currentUser,
            ...values
        }

        updateCurrentUser(newUser)
        updateUsers(newUser)
        toast({
            title: 'Data saved successfully',
            description: "",
            status: 'success',
            duration: 3000,
        })
      }

    return (
        <Box
            backgroundColor="rgb(14,36,14)"
            width="100%"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
         <form onSubmit={handleSubmit(onSubmitChanges)}>
         <Box mb="30px" >
            <Text as="p"
            color="white"
            fontSize="20px"
            >First name</Text>
            <Input type="text"
            width="400px"
            height="55px"
            backgroundColor="white"
            border="none"
            outline="none"
            {...register("first_name", {required:"First name is required"}) }
            
            />
             {
            errors?.name && ( <Text
              color={"red"}
              fontSize="12px"
              >
                {
                  errors?.name?.message
                }
              </Text>)
          }
         
          </Box>
          <Box
          mb="30px"
          >
            <Text as="p"
            color="white"
            fontSize="20px"
            >Last name</Text>
            <Input type="text"
            width="400px"
            height="55px"
            backgroundColor="white"
            border="none"
            outline="none"
            {...register("last_name", {required:"Last name is required"})}
            />
             {
            errors?.surname?.message && ( <Text
              color={"red"}
              fontSize="12px"
              >
                {
                  errors?.surname?.message
                }
              </Text>)
          }
         
          </Box>  
          <Button type='submit'>Save</Button>
         </form>
        </Box>
    )
}