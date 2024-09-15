import {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL_PROBLEMS} from "../App/App";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const ProblemForm = (props) => {
    const [problem, setProblem] = useState({})
    const {users} = props
    const {problem_status_all} = props
    const {problem_type_all} = props
    const {objects_of_work} = props

    const onChange = (e) => {
        const newState = problem
        newState[e.target.name] = e.target.value
        setProblem(newState)
    }


    useEffect(() => {
        if (!props.newProblem) {
            setProblem(problem => props.problem)
        }
        
        // eslint-disable-next-line
    }, [props.problem])

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }



    const submitDataEdit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const result = await axios.put(API_URL_PROBLEMS + problem.id + '/', problem, {withCredentials: true}, {headers: {'Content-Type': 'multipart/form-data'}})
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
        const result = await axios.post(API_URL_PROBLEMS, data, {withCredentials: true}, {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})
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
                    onChange={onChange}
                >
                    <option value={problem.user}>{users?.filter(start => start.user_id === problem.user).map(filtered => (filtered.last_name + " " + filtered.first_name + " " + filtered.second_name))}</option>
                    {users?.map((user) => <option key={user.user_id} value={user.user_id}> {(user.last_name + " " + user.first_name + " " + user.second_name)}</option>)}     
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
                    onChange={onChange}
                >
                    <option value={problem.problem_type}>{problem_type_all?.filter(start => start.id === problem.problem_type).map(filtered => filtered.problem_type_text)}</option>
                    {problem_type_all?.map((problem_type) => <option key={problem_type.id} value={problem_type.id}>{problem_type.problem_type_text}</option>)}     
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
                    onChange={onChange}
                >
                    <option value={problem.problem_status}>{problem_status_all?.filter(start => start.id === problem.problem_status).map(filtered => filtered.problem_status_text)}</option>
                    {problem_status_all?.map((problem_status) => <option key={problem_status.id} value={problem_status.id}>{problem_status.problem_status_text}</option>)}     
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
                    onChange={onChange}
                >
                    <option value={problem.object_of_work}>{objects_of_work?.filter(start => start.id === problem.object_of_work).map(filtered => filtered.object_of_work_text)}</option>
                    {objects_of_work?.map((object_of_work) => <option key={object_of_work.id} value={object_of_work.id} onChange={onChange}>{object_of_work.object_of_work_text}</option>)}     
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