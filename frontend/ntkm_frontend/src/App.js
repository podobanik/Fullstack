import './App.css';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Home from "./Home";


export const API_URL_PROBLEMS = "http://127.0.0.1:8000/problems/"
export const API_URL_USERS = "http://127.0.0.1:8000/users/"
export const API_URL_SECTORS = "http://127.0.0.1:8000/sectors/"
export const API_URL_PROBLEM_STATUS_ALL = "http://127.0.0.1:8000/problem_status_all/"
export const API_URL_PROBLEM_TYPE_ALL = "http://127.0.0.1:8000/problem_type_all/"
export const API_URL_OBJECTS_OF_WORK = "http://127.0.0.1:8000/objects_of_work/"


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationToggle, setRegistrationToggle] = useState(null);
  const [username, setUsername] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [title, setTitle] = useState('');
  //const [birthday, setBirthday] = useState(date.today());
  const [phone, setPhone] = useState(0);
  //const [sector, setSector] = useState([]);

 

  
  useEffect(() => {
    client.get("/user/")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);
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
        //birthday: birthday,
        title: title,
        phone: phone
      }
    ).then(function(res) {
      client.post(
        "/login/",
        {
          email: email,
          password: password
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
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout/",
      {withCredentials: true}
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Адрес электронной почты</Form.Label>
              <Form.Control type="email" placeholder="Введите email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Логин</Form.Label>
              <Form.Control type="text" placeholder="Введите логин" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Имя сотрудника</Form.Label>
              <Form.Control type="text" placeholder="Введите имя" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Фамилия сотрудника</Form.Label>
              <Form.Control type="text" placeholder="Введите фамилию" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSecondName">
              <Form.Label>Отчество сотрудника</Form.Label>
              <Form.Control type="text" placeholder="Введите отчество" value={secondName} onChange={e => setSecondName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Должность</Form.Label>
              <Form.Control type="text" placeholder="Введите должность" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control type="number" placeholder="Введите номер телефона" value={phone} onChange={e => setPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIsSuperuser">
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Суперпользователь"
                value={isSuperuser}
                onChange={e => setIsSuperuser(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIsStaff">
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Администратор"
                value={isStaff}
                onChange={e => setIsStaff(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIsActive">
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Активный"
                value={isActive}
                onChange={e => setIsActive(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Подтвердить регистрацию
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Адрес электронной почты</Form.Label>
              <Form.Control type="email" placeholder="Введите email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
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
