import { Box, Button, Flex, Group, Image, PasswordInput, Radio, Textarea, TextInput, useMantineTheme } from "@mantine/core"
import Logo from "../utils/logo/logo.png"
import { DatePickerInput } from "@mantine/dates"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { joiResolver, useForm } from "@mantine/form"
import { signUpSchemaOne } from "../validations/validations"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import validator from "validator";
import { userSignUp } from "../apis/makeRequest"
import { apiRoutes } from "../apis/apiRoutes"
import { useNavigate } from "react-router-dom"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);


const Signup = () => {
    const theme = useMantineTheme()

    const [currPage, setCurrPage] = useState(1);
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const signUpFormOne = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            dob: "",
            gender: "male",
            phoneNo: "",
            about: ""
        },
        validate: joiResolver(signUpSchemaOne)
    })

    const { values, errors } = signUpFormOne

    const handleNext = (values) => {
        console.log(errors)
        if (!Object.keys(errors).length) {
            setCurrPage(2)
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (!validator.isStrongPassword(password)) {
                setPassError("Not Valid Password")
            } else {

                setPassError("")
                const payLoad = {
                    firstName: values?.firstName,
                    lastName: values?.lastName,
                    userName: values?.userName,
                    emailId: values?.email,
                    age: dayjs().diff(dayjs(values?.dob), "year"),
                    gender: values?.gender,
                    phoneNo: values?.phoneNo,
                    about: values?.about,
                    password: password
                }

                const response = await userSignUp(apiRoutes.signUpApi.path, payLoad);
                console.log(response)
                navigate('/login')
                toast.success("SignUp successful")
                setIsLoading(false);

            }
        }
        catch (error) {
            toast.error(error.msg)
        }
    }

        useGSAP(() => {
            const tl = gsap.timeline();
            tl.add(gsap.from(".logo",{ opacity: 0, x: 500, duration: 1}))
            tl.add(gsap.from(".animate", { opacity: 0, y: 50, duration: 1 ,stagger:0.2}), 0);
        });
    return (
        <Box
            w="100%"
            h={{ xl: "100vh" }}
            px={{ base: "1rem", sm: "2rem", md: "4rem", lg: "8rem" }}
            py={{ base: "1rem", sm: "4rem" }}
            bg="#275a57"
            className="text-white"
        >
            {
                (currPage === 1) ?
                    <form className="w-[100%]  bg-[#030303] sm:bg-[radial-gradient(circle,_rgba(67,177,126,0.3)_10px,_#030303_40%)] rounded-3xl flex flex-col sm:flex-row justify-center" onSubmit={signUpFormOne.onSubmit(handleNext)}>
                        <Box className=" rounded-tl-3xl rounded-bl-3xl bg-transparent" w={{ base: "100%", sm: "50%", md: "50%", lg: "50%" }} py="3rem" pb={{ base: "2rem" }} px={{ base: "1rem", sm: "3rem" }}>
                            <Box className="logo" mb="3rem">
                                <Image src={Logo} w={"70%"} />
                            </Box>
                            <Flex
                                direction="column"

                                className="gap-10 sm:gap-2 lg:gap-5"
                            >
                                <TextInput
                                    withAsterisk
                                    placeholder="John"
                                    size="md"
                                    label="First Name"
                                    description=" "
                                    error={errors.firstName}
                                    value={values.firstName}
                                    onChange={(e) => {
                                        signUpFormOne.setFieldValue('firstName', e.target.value)
                                    }}
                                    className="animate"

                                />
                                <TextInput
                                    withAsterisk
                                    placeholder="Doe"
                                    size="md"
                                    label="Last Name"
                                    description=" "
                                    error={errors.lastName}
                                    value={values.lastName}
                                    onChange={(e) => {
                                        signUpFormOne.setFieldValue('lastName', e.target.value)
                                    }}
                                    className="animate"
                                />
                                <TextInput
                                    withAsterisk
                                    placeholder="john_doe_123"
                                    size="md"
                                    label="User Name"
                                    description=" "
                                    error={errors.userName}
                                    value={values.userName}
                                    onChange={(e) => {
                                        signUpFormOne.setFieldValue('userName', e.target.value)
                                    }}
                                    className="animate"
                                />
                                <TextInput
                                    withAsterisk
                                    placeholder="john@gmail.com"
                                    size="md"
                                    label="Email"
                                    description=" "
                                    error={errors.email}
                                    value={values.email}
                                    onChange={(e) => {
                                        signUpFormOne.setFieldValue('email', e.target.value)
                                    }}
                                    className="animate"
                                />
                            </Flex>
                        </Box>
                        <Box className="flex flex-col justify-center rounded-tr-3xl rounded-br-3xl  gap-10 sm:gap-5 lg:gap-10" w={{ base: "100%", sm: "50%", md: "50%", lg: "50%" }} pt={{ base: 0, sm: "3rem" }} pb="3rem" px={{ base: "1rem", sm: "3rem" }}>
                            <DatePickerInput
                                label="Date of Birth"
                                placeholder="DD-MM-YYYY"
                                valueFormat="DD-MM-YYYY"
                                w="100%"
                                size="md"
                                description=" "
                                value={(values.dob) ? new Date(values.dob) : null}
                                onChange={(date) => { signUpFormOne.setFieldValue('dob', date) }}
                                withAsterisk
                                clearable
                                error={errors.dob}
                                className="animate"
                            />

                            <Radio.Group
                                name="Gender"
                                label="Gender"
                                description=" "
                                withAsterisk
                                size="md"
                                error={errors.gender}
                                value={values.gender} // Controlled component
                                onChange={(value) => {
                                    if (value) {
                                        console.log(value)
                                        signUpFormOne.setFieldValue('gender', value)
                                    }
                                }}
                                className="animate"
                            >
                                <Group mt="xs">
                                    <Radio value="male" label="Male" color="#43b17e" />
                                    <Radio value="female" label="Female" color="#43b17e" />
                                    <Radio value="other" label="Other" color="#43b17e" />
                                </Group>
                            </Radio.Group>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={values.phoneNo}
                                onChange={(value) => { signUpFormOne.setFieldValue('phoneNo', value) }}
                                defaultCountry="IN"
                                international
                                className="animate"
                                style={{
                                    width: "100%",
                                    backgroundColor: theme.colorScheme === "dark" ? "#1A1B1E" : "#fff",
                                    color: theme.colorScheme === "dark" ? "#fff" : "#000",
                                    border: 'transparent',
                                    padding: "10px",
                                    borderRadius: "6px",
                                    fontSize: "16px",
                                    outline: "none",
                                }}
                            />
                            {
                                (errors.phoneNo) ? <span className="mt-[-35px] text-sm text-red-500">{errors.phoneNo}
                                </span> : <></>
                            }
                            <Textarea
                                size="md"
                                radius="md"
                                label="About"
                                description=" "
                                placeholder="Input placeholder"
                                value={values.about}
                                onChange={(e) => { signUpFormOne.setFieldValue('about', e.target.value) }}
                                className="animate"
                            />
                            <Button type="submit" className="animate" size="md" color="#43b17e">Next</Button>

                        </Box>
                    </form> :
                    (currPage === 2) ?

                        <Box className="w-[100%]  bg-[#030303] sm:bg-[radial-gradient(circle,_rgba(67,177,126,0.3)_10px,_#030303_40%)] rounded-3xl flex flex-col sm:flex-row justify-center">
                            <Box className=" rounded-tl-3xl rounded-bl-3xl bg-transparent" w={{ base: "100%", sm: "50%", md: "50%", lg: "50%" }} py="3rem" pb={{ base: "2rem" }} px={{ base: "1rem", sm: "3rem" }}>
                                <Box className="" mb="3rem">
                                    <Image src={Logo} w={"70%"} />
                                </Box>
                                <Flex
                                    direction="column"
                                    className="gap-10 sm:gap-2 lg:gap-5"
                                >
                                    <TextInput
                                        withAsterisk
                                        placeholder="john_doe_123"
                                        size="md"
                                        label="User Name"
                                        description=" "
                                        error={errors.userName}
                                        value={values.userName}
                                        disabled

                                    />
                                    <TextInput
                                        withAsterisk
                                        placeholder="john@gmail.com"
                                        size="md"
                                        label="Email"
                                        description=" "
                                        error={errors.email}
                                        value={values.email}
                                        disabled
                                    />
                                    <PasswordInput
                                        withAsterisk
                                        size="md"
                                        label="Password"
                                        description=" "
                                        placeholder="Enter Password"
                                        error={passError}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="animate1"
                                    />
                                    <Button type="submit" size="md" color="#43b17e" onClick={
                                        handleSubmit
                                    } disabled={isLoading} >Sign up</Button>
                                    <Button onClick={() => {
                                        setPassword("")
                                        setCurrPage(1)
                                    }} size="md" color="#43b17e" >Back</Button>
                                </Flex>
                            </Box>

                        </Box>


                        : <></>
            }
        </Box>
    )
}

export default Signup