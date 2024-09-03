import {Container, Row, Col} from "reactstrap";
import ListProblems from "./ListProblems";
import axios from "axios";
import {useEffect, useState} from "react";
import ModalProblem from "./ModalProblem";
import {API_URL_PROBLEMS, API_URL_USERS, API_URL_PROBLEM_STATUS_ALL, API_URL_PROBLEM_TYPE_ALL, API_URL_OBJECTS_OF_WORK, API_URL_SECTORS} from "./App";

const Home = () => {
    const [problems, setProblems] = useState([])
    const [users, setUsers] = useState([])
    const [sectors, setSectors] = useState([])
    const [problem_status_all, setProblemStatusAll] = useState([])
    const [problem_type_all, setProblemTypeAll]= useState([])
    const [objects_of_work, setObjectsOfWork]= useState([])


    useEffect(()=>{
        getSectors()
        getProblemStatusAll()
        getProblemTypeAll()
        getObjectsOfWork()
        getProblems()
        getUsers()
    },[])



    const getSectors = (data)=>{
        axios.get(API_URL_SECTORS).then(data => setSectors(data.data))
    }

    const getProblemStatusAll = (data)=>{
        axios.get(API_URL_PROBLEM_STATUS_ALL).then(data => setProblemStatusAll(data.data))
    }

    const getProblemTypeAll = (data)=>{
        axios.get(API_URL_PROBLEM_TYPE_ALL).then(data => setProblemTypeAll(data.data))
    }

    const getObjectsOfWork = (data)=>{
        axios.get(API_URL_OBJECTS_OF_WORK).then(data => setObjectsOfWork(data.data))
    }

    const getUsers = (data)=>{
        axios.get(API_URL_USERS).then(data => setUsers(data.data))
    }

    const getProblems = (data)=>{
        axios.get(API_URL_PROBLEMS).then(data => setProblems(data.data))
    }



    const resetState = () => {
        getSectors();
        getProblemStatusAll();
        getProblemTypeAll();
        getObjectsOfWork();
        getUsers();
        getProblems();
    };

    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ListProblems problems={problems} users={users} sectors={sectors} problem_status_all={problem_status_all} problem_type_all={problem_type_all} objects_of_work={objects_of_work} resetState={resetState} newProblem={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalProblem
                    create={true}
                    resetState={resetState}
                    newProblem={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;