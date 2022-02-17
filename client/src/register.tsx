import React from 'react';
import { 
  Container,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'

export default function Register() {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleName = (e: any) => {
        setName(e.target.value);
        setSubmitted(false);
    };
     

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
     
    const handlePassword = (e: any) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <Center>
                <Container style={{ border: "solid #FDFDFD", borderRadius: "4px" }}>
                <FormControl>
                    <FormLabel htmlFor='first-name'>Pseudo</FormLabel>
                    <Input onChange={handleName} id='email' type='text' />
                    <FormLabel htmlFor='email'>Email address</FormLabel>
                    <Input onChange={handleEmail} id='email' type='email' />
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input onChange={handlePassword} id='email' type='password' />
                    <FormLabel htmlFor='password'>Confirm Password</FormLabel>
                    <Input id='email' type='password' />
                    <Button onClick={handleSubmit} mt={4} colorScheme='teal'type='submit' >Créer un compte</Button>
                </FormControl>
                </Container>
            </Center>
        </React.Fragment>
    )
}