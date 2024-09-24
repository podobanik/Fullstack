import {Container, Row, Col} from "reactstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import ModalProblem from "../Problems/ModalProblem";
import {API_URL_PROBLEMS, API_URL_USERS, API_URL_PROBLEM_STATUS_ALL, API_URL_PROBLEM_TYPE_ALL, API_URL_OBJECTS_OF_WORK} from "./App";
import { ListProblems } from "../components/ListProblems";



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const Home = () => {
    const [problems, setProblems] = useState([])
    const [users, setUsers] = useState([])
    const [problem_type_all, setProblemTypeAll] = useState([])
    const [problem_status_all, setProblemStatusAll] = useState([])
    const [objects_of_work, setObjectsOfWork] = useState([])
    


    useEffect(()=>{
        getUsers()
        getProblems()
        getProblemTypeAll()
        getProblemStatusAll()
        getObjectsOfWork()        
    },[])


    const getUsers = (data)=>{
        axios.get(API_URL_USERS, {withCredentials: true}).then(data => setUsers(data.data))
    }
    const getProblems = (data)=>{
        axios.get(API_URL_PROBLEMS, {withCredentials: true}).then(data => setProblems(data.data))
    }
    const getProblemTypeAll = (data)=>{
        axios.get(API_URL_PROBLEM_TYPE_ALL, {withCredentials: true}).then(data => setProblemTypeAll(data.data))
    }
    const getProblemStatusAll = (data)=>{
        axios.get(API_URL_PROBLEM_STATUS_ALL, {withCredentials: true}).then(data => setProblemStatusAll(data.data))
    }
    const getObjectsOfWork = (data)=>{
        axios.get(API_URL_OBJECTS_OF_WORK, {withCredentials: true}).then(data => setObjectsOfWork(data.data))
    }



    const resetState = () => {
        getUsers();
        getProblems();
        getProblemTypeAll();
        getProblemStatusAll();
        getObjectsOfWork();     
    };


    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ListProblems problems={problems} users={users} problem_type_all={problem_type_all} problem_status_all={problem_status_all} objects_of_work={objects_of_work} resetState={resetState} newProblem={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalProblem
                    create={true}
                    users={users}
                    problem_type_all={problem_type_all}
                    problem_status_all={problem_status_all}
                    objects_of_work={objects_of_work}
                    resetState={resetState}
                    newProblem={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;