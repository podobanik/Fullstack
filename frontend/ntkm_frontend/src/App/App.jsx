import './App.css';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Home from "./Home";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.js";


export const API_URL_PROBLEMS = "http://127.0.0.1:8000/problems/"
export const API_URL_PROFILES = "http://127.0.0.1:8000/profiles/"
export const API_URL_SECTORS = "http://127.0.0.1:8000/sectors/"
export const API_URL_PROBLEM_STATUS_ALL = "http://127.0.0.1:8000/problem_status_all/"
export const API_URL_PROBLEM_TYPE_ALL = "http://127.0.0.1:8000/problem_type_all/"
export const API_URL_OBJECTS_OF_WORK = "http://127.0.0.1:8000/objects_of_work/"


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';




const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});


function App() {

  const [currentUser, setCurrentUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  
  useEffect(() => {
    client.get("/user/",
    {
      withCredentials: true
    }).then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);



  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login/",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout/"
    ).then(function(res) {
      setCurrentUser(false);
    });
  }
  
  
  if (currentUser) {
    return (
      <div>
        <ChakraProvider theme={theme}>
          <Navbar>
            <Container>
             <Navbar.Brand>Учёт работ ОСПАС</Navbar.Brand>
             <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <form onSubmit={e => submitLogout(e)}>
                    <Button type="submit" variant="light">Выход</Button>
                  </form>
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
          </Navbar>
          <Fragment>
            <Home />
          </Fragment>
        </ChakraProvider>
      </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Окно авторизации</Navbar.Brand>
      </Container>
    </Navbar>
    {
      <div className="center">
        <Form onSubmit={e => submitLogin(e)}>
          <FormGroup className='mb-3' controlId='formBasicEmail'>
            <Label for="email">Адрес электронной почты:</Label>
            <Input
                type="email"
                name="email"
                placeholder='Введите email'
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
           </FormGroup>
          <FormGroup className='mb-3' controlId='formBasicPassword'>
            <Label for="password">Пароль:</Label>
            <Input
                type="password"
                name="password"
                placeholder='Введите пароль'
                onChange={e => setPassword(e.target.value)}
                value={password}
             />
          </FormGroup>
          <Button variant="primary" type="submit">
            Подтвердить
          </Button>
        </Form>
      </div>
    }
    </div>
  );
}

export default App;
