import './App.css';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Home from "./Home";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";


export const API_URL_PROBLEMS = "http://127.0.0.1:8000/problems/"
export const API_URL_USERS = "http://127.0.0.1:8000/users/"
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

  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationToggle, setRegistrationToggle] = useState(null);
  const [username, setUsername] = useState('');
  const [isStaff, setIsStaff] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isSuperuser, setIsSuperuser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [title, setTitle] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [phone, setPhone] = useState(null);
  const [sector, setSector] = useState(null);
  const [sectors, setSectors] = useState([])
 

  
  useEffect(() => {
    getSectors()
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


  const getSectors = (data)=>{
    axios.get(API_URL_SECTORS, {withCredentials: true}).then(data => setSectors(data.data))
  }


  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Регистрация";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Вход";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/register/",
      {
        email: email,
        username: username,
        password: password,
        is_staff: isStaff,
        is_active: isActive,
        is_superuser: isSuperuser,
        first_name: firstName,
        last_name: lastName,
        second_name: secondName,
        birthday: birthday,
        title: title,
        phone: phone,
        sector_id: sector
      }
    ).then(function(res) {
      client.post(
        "/login/",
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login/",
      {
        email: email,
        password: password
      },
      {
        withCredentials: true
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout/",
      {
        withCredentials: true,
      }
    ).then(function(res) {
      setCurrentUser(false);
    });
  }
  
  
  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
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
        </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Окно авторизации</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Регистрация</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
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
            <FormGroup className='mb-3' controlId='formBasicUsername'>
              <Label for="username">Логин:</Label>
              <Input
                  type="text"
                  name="username"
                  placeholder='Введите логин'
                  onChange={e => setUsername(e.target.value)}
                  value={username}
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
            <FormGroup className='mb-3' controlId='formBasicLastName'>
              <Label for="last_name">Фамилия сотрудника:</Label>
              <Input
                  type="text"
                  name="last_name"
                  placeholder='Введите фамилию'
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicFirstName'>
              <Label for="first_name">Имя сотрудника:</Label>
              <Input
                  type="text"
                  name="first_name"
                  placeholder='Введите имя'
                  onChange={e => setFirstName(e.target.value)}
                  value={firstName}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicSecondName'>
              <Label for="second_name">Отчество сотрудника:</Label>
              <Input
                  type="text"
                  name="second_name"
                  placeholder='Введите отчество (при наличии)'
                  onChange={e => setSecondName(e.target.value)}
                  value={secondName}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicTitle'>
              <Label for="title">Должность:</Label>
              <Input
                  type="text"
                  name="title"
                  placeholder='Введите должность'
                  onChange={e => setTitle(e.target.value)}
                  value={title}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicPhone'>
              <Label for="phone">Телефон:</Label>
              <Input
                  type="number"
                  name="phone"
                  placeholder='Введите номер телефона'
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicBirthday'>
              <Label for="birthday">День рождения:</Label>
              <Input
                  type="date"
                  name="birthday"
                  placeholder='Выберите дату'
                  onChange={e => setBirthday(e.target.value)}
                  value={birthday}
              />
            </FormGroup>
            <FormGroup>
              <Label for="sectorSelect">
                Выберите сектор
              </Label>
              <Input
                  id="sectorSelect"
                  name="sector"
                  type="select"
                  onChange={e => setSector(e.target.value)}
              >
                  <option value={sector}>{"---"}</option>
                  {sectors?.map((sector) => <option key={sector.id} value={sector.id}>{sector.sector_text}</option>)}     
              </Input>
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicIsSuperuser'>
              <Label for="isSuperuser">
                Суперпользователь:
              </Label>
              <Input
                  type="switch"
                  id="isSuperuser"
                  checked={isSuperuser}
                  onClick={() => {
                  setIsSuperuser(!isSuperuser);
                  }}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicIsStaff'>
              <Label for="isStaff">
                Доступ к администрированию:
              </Label>
              <Input
                  type="switch"
                  id="isStaff"
                  checked={isStaff}
                  onClick={() => {
                  setIsStaff(!isStaff);
                  }}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicIsActive'>
              <Label for="isActive">
                Активный пользователь:
              </Label>
              <Input
                  type="switch"
                  id="isActive"
                  checked={isActive}
                  onClick={() => {
                  setIsActive(!isActive);
                  }}
              />
            </FormGroup>
            <Button variant="primary" type="submit">
              Подтвердить регистрацию
            </Button>
          </Form>
        </div>        
      ) : (
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
      )
    }
    </div>
  );
}

export default App;
