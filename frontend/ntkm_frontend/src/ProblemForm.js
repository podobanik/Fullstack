import {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL_PROBLEMS} from "./App";

const ProblemForm = (props) => {
    const [problem, setProblem] = useState({})
    const {users} = props
    const [valueUser, setvalueUser] = useState('')
    const {problem_status_all} = props
    const [valueProblemStatus, setvalueProblemStatus] = useState('')
    const {problem_type_all} = props
    const [valueProblemType, setvalueProblemType] = useState('')
    const {objects_of_work} = props
    const [valueObjectOfWork, setvalueObjectOfWork] = useState('')

    const onChange = (e) => {
        const newState = problem
        if (e.target.name === "file") {
            newState[e.target.name] = e.target.files[0]
        } else newState[e.target.name] = e.target.value
        setProblem(newState)
    }

    useEffect(() => {
        if (!props.newProblem) {
            setProblem(problem => props.problem)
            setvalueUser(valueUser => users?.filter((user) => user.user_id === problem.user).map(filteredUser => (filteredUser.last_name + " " + filteredUser.first_name + " " + filteredUser.second_name)))
            setvalueProblemType(valueProblemType => problem_type_all?.filter((problem_type) => problem_type.id === problem.problem_type).map(filteredProblemType => (filteredProblemType.problem_type_text)))
            setvalueProblemStatus(valueProblemStatus => problem_status_all?.filter((problem_status) => problem_status.id === problem.problem_status).map(filteredProblemStatus => (filteredProblemStatus.problem_status_text)))
            setvalueObjectOfWork(valueObjectOfWork => objects_of_work?.filter((object_of_work) => object_of_work.id === problem.object_of_work).map(filteredObjectOfWork => (filteredObjectOfWork.object_of_work_text)))
        }
        else{
            setvalueUser(valueUser => users?.filter((user) => user.user_id === problem.user).map(filteredUser => (filteredUser.last_name + " " + filteredUser.first_name + " " + filteredUser.second_name)))
            setvalueProblemType(valueProblemType => problem_type_all?.filter((problem_type) => problem_type.id === problem.problem_type).map(filteredProblemType => (filteredProblemType.problem_type_text)))
            setvalueProblemStatus(valueProblemStatus => problem_status_all?.filter((problem_status) => problem_status.id === problem.problem_status).map(filteredProblemStatus => (filteredProblemStatus.problem_status_text)))
            setvalueObjectOfWork(valueObjectOfWork => objects_of_work?.filter((object_of_work) => object_of_work.id === problem.object_of_work).map(filteredObjectOfWork => (filteredObjectOfWork.object_of_work_text)))
        }
        // eslint-disable-next-line
    }, [props.problem])

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }


    const defaultIfEmptyList = value => {
        return value === "" ? "---" : value;
    }

    const submitDataEdit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const result = await axios.put(API_URL_PROBLEMS + problem.pk, problem, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            problem_text: problem['problem_text'],
            user: problem['user'],
            problem_type: problem['problem_type'],
            problem_status: problem['problem_status'],
            object_of_work: problem['object_of_work'],
            control_date: problem['control_date']
        }
        // eslint-disable-next-line
        const result = await axios.post(API_URL_PROBLEMS, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    return (
        <Form onSubmit={props.newProblem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="problem_text">Название задачи:</Label>
                <Input
                    type="text"
                    name="problem_text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.problem_text)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="userSelect">
                    Ответственный сотрудник
                </Label>
                <Input
                    id="userSelect"
                    name="user"
                    type="select"
                    defaultValue={defaultIfEmptyList(valueUser)}
                    value={users?.filter((user) => (user.last_name + " " + user.first_name + " " + user.second_name) === valueUser).map(filteredUser => (filteredUser.id))}
                    
                    onChange={(event) => setvalueUser(event.target.value)}
                >
                    {users?.map((user, index) => <option key={index} onClickvalue={users?.filter((user) => (user.last_name + " " + user.first_name + " " + user.second_name) === valueUser).map(filteredUser => (filteredUser.id))}>{user.last_name + " " + user.first_name + " " + user.second_name}</option>)}     
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="problemTypeSelect">
                    Категория задачи
                </Label>
                <Input
                    id="problemTypeSelect"
                    name="problem_type"
                    type="select"
                    defaultValue={defaultIfEmptyList(valueProblemType)}
                    value={problem_type_all?.filter((problem_type) => problem_type.problem_type_text === valueProblemType).map(filteredProblemType => (filteredProblemType.id))}
                    
                    onChange={(event) => setvalueProblemType(event.target.value)}
                >
                    {problem_type_all?.map((problem_type, index) => <option key={index}>{problem_type.problem_type_text}</option>)}     
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="problemStatusSelect">
                    Статус задачи:
                </Label>
                <Input
                    id="problemStatusSelect"
                    name="problem_status"
                    type="select"
                    defaultValue={defaultIfEmptyList(valueProblemStatus)}
                    value={problem_status_all?.filter((problem_status) => problem_status.problem_status_text === valueProblemStatus).map(filteredProblemStatus => (filteredProblemStatus.id))}
                    
                    onChange={(event) => setvalueProblemStatus(event.target.value)}
                >
                    {problem_status_all?.map((problem_status, index) => <option key={index}>{problem_status.problem_status_text}</option>)}     
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="objectOfWorkSelect">
                    Объект АСУТП:
                </Label>
                <Input
                    id="objectOfWorkSelect"
                    name="object_of_work"
                    type="select"
                    defaultValue={defaultIfEmptyList(valueObjectOfWork)}
                    value={objects_of_work?.filter((object_of_work) => object_of_work.object_of_work_text === valueObjectOfWork).map(filteredObjectOfWork => (filteredObjectOfWork.id))}
                    
                    onChange={(event) => setvalueObjectOfWork(event.target.value)}
                >
                    {objects_of_work?.map((object_of_work, index) => <option key={index}>{object_of_work.object_of_work_text}</option>)}     
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="control_date">Контрольный срок:</Label>
                <Input
                    type="date"
                    name="control_date"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.control_date)}
                />
            </FormGroup>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button>Подтвердить</Button> <Button onClick={props.toggle}>Отменить</Button>
            </div>
        </Form>
    )
}

export default ProblemForm;