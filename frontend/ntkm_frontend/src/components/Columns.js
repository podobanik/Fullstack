import moment from 'moment'



export const COLUMNS = [
    {
        Header: 'Краткое описание задачи',
        accessor: 'problem_text'
    },
    {
        Header: 'Ответственный сотрудник',
        accessor: 'user'
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