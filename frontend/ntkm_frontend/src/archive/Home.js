import {Container, Row, Col} from "reactstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import ModalProblem from "../Problems/ModalProblem.js";
import {API_URL_PROBLEMS, API_URL_PROFILES, API_URL_PROBLEM_STATUS_ALL, API_URL_PROBLEM_TYPE_ALL, API_URL_OBJECTS_OF_WORK, API_URL_SECTORS} from "./App.jsx";
import ProblemTable from "./components/ProblemTable.jsx";


const Home = () => {
    const [problems, setProblems] = useState([])
    const [profiles, setProfiles] = useState([])
    const [problem_type_all, setProblemTypeAll] = useState([])
    const [problem_status_all, setProblemStatusAll] = useState([])
    const [objects_of_work, setObjectsOfWork] = useState([])
    const [sectors, setSectors] = useState([])
    


    useEffect(()=>{
        getSectors()
        getProfiles()
        getProblems()
        getProblemTypeAll()
        getProblemStatusAll()
        getObjectsOfWork()        
    },[])


    const getSectors = (data)=>{
        axios.get(API_URL_SECTORS, {withCredentials: true}).then(data => setSectors(data.data))
    }
    const getProfiles = (data)=>{
        axios.get(API_URL_PROFILES, {withCredentials: true}).then(data => setProfiles(data.data))
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
        getSectors();
        getProfiles();
        getProblems();
        getProblemTypeAll();
        getProblemStatusAll();
        getObjectsOfWork();     
    };


    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ProblemTable problems={problems} sectors={sectors} profiles={profiles} problem_type_all={problem_type_all} problem_status_all={problem_status_all} objects_of_work={objects_of_work} resetState={resetState} newProblem={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalProblem
                    create={true}
                    sectors={sectors}
                    profiles={profiles}
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