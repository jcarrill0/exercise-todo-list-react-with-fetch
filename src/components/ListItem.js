import React from 'react'

const ListItem = ({task, deleteTask}) => {
    return (
        <li className="list-group-item d-flex align-items-center">{task}
            <span 
                className="delTask ms-auto bg-danger px-2 text-light rounded fw-bold"
                onClick={() => deleteTask(task)}
            >X</span>
        </li>
    )
}

export default ListItem
