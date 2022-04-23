import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import {useHistory} from 'react-router-dom';

const registerURL = "https://lpzhrxsohj.execute-api.us-east-1.amazonaws.com/prod/register"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { isFetching, error } = useSelector((state) => state.user);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if(username.trim() === '' || email.trim() === ''|| name.trim() === ''|| password.trim() === '') {
      setMessage("all fields required")
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'sbDsROOSnN6xsu54CKHsP73KUQmZRCjK8rkIvLYs'
      }
    }

    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password
    }

    axios.post(registerURL, requestBody, requestConfig).then(response => {
      setMessage('Registration Succesful')
      alert("Registration succesful")
      history.push("/")
    }).catch(error => {
        setMessage(error);
    })


  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" 
          onChange={(e) => setName(e.target.value)}/>
          <Input placeholder="username" 
           onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="email" 
           onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" 
           onChange={(e) => setPassword(e.target.value)}/>
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <h1>debug: {message}</h1>
          <Button onClick={submitHandler} disabled={isFetching}>
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
