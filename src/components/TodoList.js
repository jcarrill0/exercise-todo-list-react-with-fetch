import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import PropTypes from 'prop-types';


const TodoList = () => {

    const [task, setTask] = useState("");
    const [arrayTask, setArrayTask] = useState([]);
    const [taskCount, setTaskCount] = useState(arrayTask.length);

    const urlApi = 'https://assets.breatheco.de/apis/fake/todos/user/jcarrill0';

    function addTask() {
        if(task.trim() === "") {
            alert("Es necesario agregar una tarea");
            return
        }
        setArrayTask([...arrayTask, task])
        setTaskCount(arrayTask.length + 1 )
        //newListAPI([...arrayTask, task]);
        setTask("");
    }

    
    function deleteTask(itemTask) {
        const newTasks = arrayTask.filter(myTask =>  myTask !== itemTask);
        setArrayTask(newTasks);
        setTaskCount([arrayTask.length - 1])
        //newListAPI(newTasks);
    }

    const newListAPI = async listTasks => {
        let listApi = [];

        listTasks.forEach(item => {
            let obj = { label: item, done: false }
            listApi.push(obj)
        });

        const initApi = { 
            method: "PUT", 
            body: JSON.stringify(listApi), 
            headers: {
              "Content-Type": "application/json"
            }
        }
        await fetch(urlApi, initApi);
    }

    useEffect(() => {
        const getTask = async () => {
            const res = await fetch(urlApi),
                  data = await res.json();

            let listTask = data.map(item => item.label);
            setArrayTask(listTask);
            setTaskCount(listTask.length);
        }
        getTask();
    }, [])

    useEffect(() => {
        newListAPI(arrayTask);
    }, [arrayTask])

    return (
        <div className="border w-50 px-5 py-3">
            <input 
                type="text"
                className="form-control"
                placeholder="Add a task..."
                onChange= {e => setTask(e.target.value)}
                onKeyDown= {e => (e.key === 'Enter') && addTask()}
                value= {task}
            />
            <ul className="list-group list-group-flush mt-2">
                {
                    arrayTask.map((item, idx) => (
                        <ListItem 
                            key={idx} 
                            task={item}
                            deleteTask={deleteTask} 
                        />
                    ))
                }
                <li className="list-group-item mt-3 text-muted fs-6">
                    { `${taskCount} ${taskCount <= 1 ? 'item left' : 'items left'}` }
                </li>
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    task: PropTypes.string,
    arrayTask: PropTypes.array,
    taskCount: PropTypes.number
};

export default TodoList
