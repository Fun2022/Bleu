import { Fragment, useEffect, useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    InputRightElement,
    FormErrorMessage,
    ScaleFade,
    Spinner
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaAt } from "react-icons/fa";
import SweetAlert from 'sweetalert2';

import { registryApi } from './index';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaT = chakra(FaAt);

export default function Register() {

    const [usernameValue, setUsername] = useState('');
    const [emailValue, setEmail] = useState('');
    const [passwordValue, setPassword] = useState('');
    const [cpasswordValue, setCPassword] = useState('');

    const [usernameError, setUserError] = useState(false);
    const [usernameErrorMessage, setUserMessageError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailMessageError] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordMessageError] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isLoadingPage, setLoadingPage] = useState(false);
    const [isAnimation, setAnimation] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const handleShowClick2 = () => setShowPassword2(!showPassword2);

    const isInvalid = usernameValue == '' || emailValue == '' || passwordValue == '' || cpasswordValue == '';

    const handleSign = (event: any) => {
        event.preventDefault();
        setLoading(true);

        fetch(registryApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameValue, email: emailValue, password: passwordValue, confirmpassword: cpasswordValue })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setUserError(false); setEmailError(false); setPasswordError(false);
                switch (data["message"]) {
                    case 'INVALID_USERNAME':
                        setUserError(true);
                        setUserMessageError('Your name must have at least 4 characters and less than 16 characters!');
                        setLoading(false);
                        break;
                    case "TOO_MANY_PEOPLE_USE_THIS_NAME":
                        setUserError(true);
                        setUserMessageError('Too many people use this name!');
                        setLoading(false);
                        break;
                    case "INVALID_EMAIL":
                        setEmailError(true);
                        setEmailMessageError('Your Email is invalid !');
                        setLoading(false);
                        break;
                    case "EMAIL_ALREADY_USED":
                        setEmailError(true);
                        setEmailMessageError('Your Email is already used !');
                        setLoading(false);
                        break;
                    case "INVALID_PASSWORD":
                        setPasswordError(true);
                        setPasswordMessageError('Your password must be more than 8 characters long and must include a capital letter, a number and a special character!');
                        setLoading(false);
                        break;
                    case "INVALID_CONFIRM_PASSWORD":
                        setPasswordError(true);
                        setPasswordMessageError('You must enter your password correctly twice!');
                        setLoading(false);
                        break;
                    case "ACCOUNT_CREATED":
                        setLoading(false);
                        SweetAlert.fire('Account created !', 'Your account has been created!', 'success').then(() => {
                            window.location.reload();
                        });
                }
            });
    }

    useEffect(() => {
        setLoadingPage(true);
        setTimeout(() => {
            setLoadingPage(false);
            setAnimation(true);
        }, 1500);
    }, []);

    return (
        <Fragment>
            {isLoadingPage ? (
                <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
                    <Spinner width="50px" height="50px" />
                </Flex>
            ) : (
                <ScaleFade initialScale={1.5} in={isAnimation}>
                    <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
                        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center" >
                            <Avatar bg="teal.500" />
                            <Heading color="teal.400">Welcome</Heading>
                            <Box minW={{ base: "90%", md: "700px" }}>
                                <form onSubmit={handleSign}>
                                    <Stack spacing={4} p="2rem" backgroundColor="gray.700" boxShadow="md">
                                        <FormControl isInvalid={usernameError}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                                                <Input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                                            </InputGroup>
                                            {!usernameError ? ("") : (<FormErrorMessage>{usernameErrorMessage}</FormErrorMessage>)}
                                        </FormControl>
                                        <FormControl isInvalid={emailError}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none" children={<CFaT color="gray.300" />} />
                                                <Input type="email" placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                                            </InputGroup>
                                            {!emailError ? ("") : (<FormErrorMessage>{emailErrorMessage}</FormErrorMessage>)}
                                        </FormControl>
                                        <FormControl isInvalid={passwordError}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                                                <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                                <InputRightElement width="4.5rem">
                                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                        {showPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {!passwordError ? ("") : (<FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>)}
                                        </FormControl>
                                        <FormControl isInvalid={passwordError}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                                                <Input type={showPassword2 ? "text" : "password"} placeholder="Confirm Password" onChange={e => setCPassword(e.target.value)} />
                                                <InputRightElement width="4.5rem">
                                                    <Button h="1.75rem" size="sm" onClick={handleShowClick2}>
                                                        {showPassword2 ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {!passwordError ? ("") : (<FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>)}
                                        </FormControl>
                                        <Button loadingText="Creating Account..." isLoading={isLoading} isDisabled={isInvalid} borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
                                            Create Account
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>
                        </Stack>
                        <Box>
                            Already have an account?{" "}
                            <Link color="teal.500" href="#">
                                Sign In
                            </Link>
                        </Box>
                    </Flex>
                </ScaleFade>
            )}
        </Fragment>
    )
}