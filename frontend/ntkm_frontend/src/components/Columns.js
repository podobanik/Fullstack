import moment from 'moment'


export const COLUMNS = [
    {
        Header: 'Краткое описание задачи',
        accessor: 'problem_text'
    },
    {
        Header: 'Ответственный сотрудник',
        accessor: ({user}) => `${user.last_name} ${user.first_name} ${user.second_name}`,
    },
    {
        Header: 'Категория задачи',
        accessor: ({problem_type}) => `${problem_type.problem_type_text}`,
    },
    {
        Header: 'Статус задачи',
        accessor: ({problem_status}) => `${problem_status.problem_status_text}`,
    },
    {
        Header: 'Объект АСУТП',
        accessor: ({object_of_work}) => `${object_of_work.object_of_work_text}`,
    },
    {
        Header: 'Контрольный срок',
        accessor: 'control_date',
        Cell: ({value}) => {return moment(value).format('DD.MM.YYYY')},
    },
    {
        Header: 'Дата добавления',
        accessor: 'add_date',
        Cell: ({value}) => {return moment(value).format('DD.MM.YYYY, hh:mm')},
    }
]