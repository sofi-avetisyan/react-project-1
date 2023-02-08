import {Box,
        Flex,
        Text,
        Button,
        Input,
        useToast,
        Link } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Link as ReactLink , useNavigate} from 'react-router-dom';
import { getUsers } from '../helpers';

const users=getUsers()

function SignIn() {

  const toast = useToast()
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const navigate = useNavigate()
  console.log(users);

const emailExists = (email) => {
    const users = getUsers()

    const exists = users.find((user)=> user.email === email)

    return exists ? true : false
}

const emailAndPasswordExists = (password, email) => {
    const users = getUsers()

    const exists = users.find((user)=> user.password === password && user.email===email)

    return exists ? true : false
}


const getUser = (email, password) => {
    const users = getUsers()

    const user = users.find((user) => user.email === email && user.password === password)

    return user
}

const onSubmit = (values) => {

    const userWithEmailExists =  emailExists(values.email);
    
    if(!userWithEmailExists){
        toast({
            title: 'Wrong Email.',
            description: "Following email doesn't exists",
            status: 'error',
            duration: 3000,
        })

        return
}

const userWithPasswordExists = emailAndPasswordExists(values.password, values.email)

if(!userWithPasswordExists){
        toast({
            title: 'Wrong Email or password.',
            description: "Following email and password doesn't exists",
            status: 'error',
            duration: 3000,
        })
        return
    }

    const user = getUser(values.email, values.password)
    localStorage.setItem('user', JSON.stringify(user))
    
    toast({
        title: 'User loged in succsesfully',
        description: "",
        status: 'success',
        duration: 3000,
    })
    navigate("/profile")
  }

  return (
    <>
     <Flex
    width={"100%"}
    height={"100vh"}
    bgColor={"blue"}
    justifyContent={"center"}
    alignItems={"center"}
    >
      <Box
      width={"600px"}
      height={"600px"}
      bgColor="white"
      borderRadius={"15px"}
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      p={0}
      >
        <Text as={"h1"}
        textAlign="center"
        fontSize={"50px"}>
          Sign In
        </Text>
    <form  onSubmit={handleSubmit(onSubmit)}>
        <Box mb={6}>
          <Text >Email</Text>
          <Input placeholder="Enter email" 
          width={"500px"}
          height="40px"
          {...register("email", 
          {required:"Email is required"})}
          />
          {
            errors?.email?.message && (<Text
              color={"red"}
              fontSize="12px"
              >
                {
                  errors?.email?.message
                }
              </Text>)
          }
          
        </Box>
        <Box>
        <Text >Password</Text>
          <Input placeholder="Enter password" 
          width={"500px"}
          height="40px"
          {...register("password", 
          {required:"Passwordis required"}) }
          />
           {
            errors?.password?.message && (<Text
              color={"red"}
              fontSize="12px"
              >
                {
                  errors?.password?.message
                }
              </Text>)
          }
          
        </Box>
        <Link as={ReactLink} to="/sign-up">Create an account</Link>
        <Button
            type='submit'
            width="500px"
            height={"40px"}
            bgColor="blue"
            color="white"
            fontWeight={"bold"}
            border="none"
            marginTop="30px"
            borderRadius={"10px"}
            _hover ={{
            bgColor:"darkblue",
            cursor:"pointer"
            }}
        >
            Submit
        </Button>
      </form>  
    </Box>
   </Flex>
 </>
 );
}

export default SignIn;