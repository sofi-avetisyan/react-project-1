import { 
  Box,
  Flex,
  Text,
  Button,
  Input,
  Link 
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Link  as ReactLink, useNavigate} from 'react-router-dom';
import { useRef } from 'react';  
import {v4 as uuid} from 'uuid';

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUp() {
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const profileImage=useRef("");

  const navigate = useNavigate();

  const addUserToLocalStorage = (user) =>{
    const usersJSONData=localStorage.getItem("users")
    const usersData=JSON.parse(usersJSONData)
    const users=usersData ? usersData :  []
    users.push(user)
    const usersJSONnData=JSON.stringify(users)
    localStorage.setItem('users', usersJSONnData)
  }

  const onImgChange=(e) => { 
    const imgPath = URL.createObjectURL(e.target.files[0])
    profileImage.current = imgPath
  }

  const onSubmit = (user) => {
    addUserToLocalStorage({ 
      id:uuid(), 
      ...user, 
      avatar: profileImage.current,
      followers: JSON.stringify([]),
      followings: JSON.stringify([])
    })
    
    navigate("/sign-in")
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
      width={"700px"}
      height={"700px"}
      bgColor="white"
      borderRadius={"15px"}
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      p={0}
      >
        <Text 
        as={"h1"} 
        textAlign="center"
        >
          Sign Up
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Text >First Name</Text>
          <Input placeholder="First name" 
          width={"500px"}
          height="40px"
          {...register("first_name", 
            {
              required: "First name is required", 
              minLength:{ value: 3, message: "Min length is 3"}
            }) 
          }
        />
        {
            errors?.first_name?.message && ( <Text
              color={"red"}
              fontSize="12px"
              >
                {
                  errors?.first_name?.message
                }
              </Text>)
          }
        </Box>
        <Box>
        <Text >Last Name</Text>
          <Input placeholder="Last name" 
          width={"500px"}
          height="40px"
          {...register("last_name", 
          {required:"Last name is required"})}
          />
         {
          errors?.last_name && (  <Text
            color={"red"}
            fontSize="12px"
            >
              {
                errors?.last_name?.message
              }
            </Text>)
         }
         
        </Box>
        <Box>
        <Text >Email</Text>
          <Input placeholder="Email" 
          width={"500px"}
          height="40px"
          {...register("email", 
          {required:"Email  is required", pattern:{
            value: emailPattern, 
            message:"Wrong Email Format"
          }})}
          />
          {
            errors?.email?.message && ( <Text
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
          <Input placeholder="Password" 
          type={"password"}
          width={"500px"}
          height="40px"
          {...register("password", 
          {required:"Password name is required"})}
          />
          {
            errors?.password?.message && ( <Text
              color={"red"}
              fontSize="12px"
              >
                {
                  errors?.password?.message
                }
              </Text>)
          }
         <Link as={ReactLink} to="/sign-in">Have an account</Link>
        </Box>
        <Box>
            <Text >User avatar</Text>
            <Input type={"file"}
            onChange={onImgChange}
            />

        </Box>
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
          Sign Up
        </Button>
      </form>
     </Box>
  </Flex>
</>
  );
}

export default SignUp;
