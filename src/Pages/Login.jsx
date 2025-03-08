import { Box, Button, Flex, Image, PasswordInput, TextInput } from "@mantine/core"
import Logo from "../utils/logo/logo.png"
import { joiResolver, useForm } from "@mantine/form"
import {loginSchema} from '../validations/validations'
import { userLogin } from "../apis/makeRequest"
import { apiRoutes } from "../apis/apiRoutes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Login = () => {

    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setIsLoading(true);
        try{
            const payLoad = {
                userEmail : values.userNameorEmail,
                password : values.password
            }

            const response = await userLogin(apiRoutes.loginApi.path,payLoad);
            toast.success(response.msg)
            localStorage.setItem('token',JSON.stringify(response.token));
            setIsLoading(false);
            navigate('/home')
            
        }
        catch(error){
            toast.error(error.msg)
            setIsLoading(false);
        }
    }

    const loginForm = useForm({
        initialValues: {
            userNameorEmail: "",
            password: ""
        },
        validate:joiResolver(loginSchema)
    })
    const {values,errors} = loginForm;

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.add(gsap.from(".logo",{ opacity: 0, x: 500, duration: 1}))
        tl.add(gsap.from(".animate", { opacity: 0, y: 50, duration: 1 ,stagger:0.2}), 0);
    });

    return (
        <Box
            w="100vw"
            h="100vh"
            px={{ base: "1rem", sm: "2rem", md: "4rem", lg: "8rem" }}
            py={{ base: "1rem", sm: "2rem" }}
            bg="#275a57"
            className="text-white"
        >
            <Flex
                w="100%"
                h="100%"
                className="bg-[#030303] sm:bg-[radial-gradient(circle,_rgba(67,177,126,0.3)_10px,_#030303_40%)] rounded-3xl"
                justify="center"
                direction="row"

            >
                <Box className=" rounded-tl-3xl rounded-bl-3xl bg-transparent " w={{ base: "100%", sm: "50%", md: "50%", lg: "50%" }} py="3rem" px="3rem">
                    <Box className="logo" mb="3rem">
                        <Image src={Logo} w={"70%"} />
                    </Box>
                    <Box>
                        <Box className="mb-5">Please Enter your Account Details</Box>
                        <form 
                        className="flex flex-col gap-5"
                        onSubmit={loginForm.onSubmit(handleLogin)}
                        >
                            <TextInput
                                withAsterisk
                                placeholder="Enter Email or Username"
                                size="md"
                                label="Username or Email"
                                description=" "
                                error={(errors.userNameorEmail)}
                                value={values.userNameorEmail}
                                onChange={(e)=>{
                                    loginForm.setFieldValue('userNameorEmail',e.target.value)
                                }}
                                className="animate"
                            />
                            <PasswordInput
                                withAsterisk
                                size="md"
                                label="Password"
                                description=" "
                                placeholder="Enter Password"
                                error={errors.password}
                                value={values.password}
                                onChange={(e)=>{
                                    loginForm.setFieldValue("password",e.target.value)
                                }}
                                className="animate"
                            />
                            <Box className="animate text-right underline tracking-wide text-sm">Forgot Password</Box>
                            <Button type="submit" size="md" color="#43b17e" disabled={isLoading} className="animate">Sign in</Button>
                        </form>
                        <Box className="animate hover:text-[#43b17e] mt-5 text-right underline tracking-wide text-sm cursor-pointer" onClick={()=>navigate("/signup")}>Create Account</Box>
                    </Box>
                </Box>
                <Box display={{ base: "none", sm: "block", md: "block" }} className="flex justify-center rounded-tr-3xl rounded-br-3xl  w-[50%] " py="3rem" px="3rem">
                    <Flex bg="#43b17e" className="logo w-80 h-96 bg-gradient-to-b from-green-500 to-green-700  font-[Poppins] text-center flex flex-col justify-center items-center rounded-xl shadow-lg p-6 text-black" w="80%" h="100%" direction="column" justify="center" align="center" gap={20}>
                        <h1 className="animate text-5xl font-bold">Connect,</h1>
                        <h1 className="animate text-5xl font-bold">Share,</h1>
                        <h1 className="animate text-5xl font-bold">Inspire.</h1>
                        <p className="animate text-lg mt-4 font-light">Your story matters.</p>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default Login