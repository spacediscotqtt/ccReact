import { useState } from "react";
import styled from "styled-components";
import {setUserSession} from '../redux/AuthService';
import { useDispatch, useSelector } from "react-redux";
import {Link,useHistory} from 'react-router-dom';
import axios from "axios";

const loginURL = "https://lpzhrxsohj.execute-api.us-east-1.amazonaws.com/prod/login"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const history = useHistory();

  const submitHandler = (e) =>{
    e.preventDefault();
    if(username.trim() === '' || password.trim() === ''){
      setErrorMessage('Both username and password are required');
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        'x-api-key': 'sbDsROOSnN6xsu54CKHsP73KUQmZRCjK8rkIvLYs'
      }
    }
    const requestBody = {
      username: username,
      password: password
    }

    axios.post(loginURL, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      setErrorMessage('Login Succesful')
      alert("login succesful")
      history.push("/")
    }).catch((error) => {
        setErrorMessage(error);
    })



  }

  return (
    <Container>
      <Wrapper>
      <h1>debug: {errorMessage}</h1>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={submitHandler} >
            LOGIN
          </Button>
          <Link to ="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
