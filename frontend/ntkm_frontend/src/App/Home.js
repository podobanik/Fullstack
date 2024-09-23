import {Container, Row, Col} from "reactstrap";
import ListProblems from "../Problems/ListProblems";
import axios from "axios";
import {useEffect, useState} from "react";
import ModalProblem from "../Problems/ModalProblem";
import {API_URL_PROBLEMS, API_URL_USERS, API_URL_PROBLEM_STATUS_ALL, API_URL_PROBLEM_TYPE_ALL, API_URL_OBJECTS_OF_WORK, API_URL_SECTORS} from "./App";
import { BasicTable } from "../components/BasicTable";
import moment from 'moment'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


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
        axios.get(API_URL_SECTORS, {withCredentials: true}).then(data => setSectors(data.data))
    }

    const getProblemStatusAll = (data)=>{
        axios.get(API_URL_PROBLEM_STATUS_ALL, {withCredentials: true}).then(data => setProblemStatusAll(data.data))
    }

    const getProblemTypeAll = (data)=>{
        axios.get(API_URL_PROBLEM_TYPE_ALL,{withCredentials: true}).then(data => setProblemTypeAll(data.data))
    }

    const getObjectsOfWork = (data)=>{
        axios.get(API_URL_OBJECTS_OF_WORK, {withCredentials: true}).then(data => setObjectsOfWork(data.data))
    }

    const getUsers = (data)=>{
        axios.get(API_URL_USERS, {withCredentials: true}).then(data => setUsers(data.data))
    }

    const getProblems = (data)=>{
        axios.get(API_URL_PROBLEMS, {withCredentials: true}).then(data => setProblems(data.data))
    }



    const resetState = () => {
        getSectors();
        getProblemStatusAll();
        getProblemTypeAll();
        getObjectsOfWork();
        getUsers();
        getProblems();
    };

    const COLUMNS = [
        {
            Header: 'Краткое описание задачи',
            accessor: 'problem_text'
        },
        {
            Header: 'Ответственный сотрудник',
            accessor: ({user}) => {users?.filter((user_filter) => user_filter.user_id === user).map(filteredUser => (filteredUser.last_name + " " + filteredUser.first_name + " " + filteredUser.second_name))},
        },
        {
            Header: 'Категория задачи',
            accessor: 'problem_type'
        },
        {
            Header: 'Статус задачи',
            accessor: 'problem_status'
        },
        {
            Header: 'Объект АСУТП',
            accessor: 'object_of_work'
        },
        {
            Header: 'Контрольный срок',
            accessor: 'control_date',
            Cell: ({value}) => {return moment(value).format('DD.MM.YYYY')}
        },
        {
            Header: 'Дата добавления',
            accessor: 'add_date',
            Cell: ({value}) => {return moment(value).format('DD.MM.YYYY, hh:mm')}
        }
    ]

    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <BasicTable problems={problems} users={users} sectors={sectors} problem_status_all={problem_status_all} problem_type_all={problem_type_all} objects_of_work={objects_of_work} COLUMNS={COLUMNS} resetState={resetState} newProblem={false}/>
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