import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link,useHistory } from "react-router-dom";
import {getUser, resetUserSession} from '../redux/AuthService';


const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: white;
  color: black;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Navbar = () => {
  const user = getUser();
  console.log("test");
  const quantity = useSelector(state=>state.cart.quantity)
  let condLg,condRg, condCt, condNm;


  const logoutHandler = () => {
    resetUserSession();
    window.location.reload();
  }

  if(user === null){
    condRg = <Link to="/register"><MenuItem>REGISTER HERE</MenuItem></Link>
    condLg = <Link to="/login"><MenuItem>SIGN IN</MenuItem></Link>
    condCt = <Link to="/cart"><MenuItem><Badge badgeContent={quantity} color="primary"><ShoppingCartOutlined /></Badge></MenuItem></Link>
  }else{
    condNm = <Button onClick={logoutHandler}> Welcome {user.name} </Button> 
  }


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><Link to='/' style={{ textDecoration: 'none', color: 'black' }}><Logo>BOOKSWAP</Logo></Link>
        </Center>
        <Right>
          {condNm}
          {condRg}
          {condLg}
          {condCt}
        </Right>
      </Wrapper>
    </Container>
  );
};



export default Navbar;
