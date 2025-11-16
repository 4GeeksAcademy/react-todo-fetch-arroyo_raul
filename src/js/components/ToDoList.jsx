import React, { useState, useEffect } from "react";

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function obtenerValoresAPI() {
        fetch('https://playground.4geeks.com/todo/users/arroyo_raul')
            .then(resp => {
                console.log(resp.ok)
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log(data.todos);
                setTareas(data.todos);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function añadirTarea() {
        const tarea = {
            label: inputValue,
            is_done: false,
        }

        fetch('https://playground.4geeks.com/todo/todos/arroyo_raul', {
            method: 'POST',
            body: JSON.stringify(tarea),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log(data);
                setTareas([...tareas, tarea]);
                obtenerValoresAPI();
            })
            .catch(error => {
                console.log(error);
            })
    }

    function onKeyDown(event) {
        if (event.code === 'Enter') {
            añadirTarea();
            event.target.value = "";
        }
    }

    function deleteTask(index) {
        fetch(`https://playground.4geeks.com/todo/todos/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                console.log(resp.ok)
                console.log(resp.status);
                if(resp.ok === true) {
                    obtenerValoresAPI();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(function () {
        obtenerValoresAPI();
    }, []);

    return (
        <>
            <div className="contenedor">
                <h2 className="title">Todo List</h2>
                <div className="list">
                    <input type="text" onKeyUp={onKeyDown} onChange={(e) => { setInputValue(e.target.value) }} id="task" name="task" placeholder="Add any task" />
                    <ol>
                        {tareas.map((tarea) => (
                            <li key={tarea.id}><p>{tarea.label}<span onClick={() => deleteTask(tarea.id)}>X</span></p></li>
                        ))}
                    </ol>
                    {tareas.length === 0 &&
                        <div className="noTasksContainer">
                            <p className="icono"><i className="fa-solid fa-x"></i></p>
                            <p className="noTasks">No tasks, add a task</p>
                        </div>
                    }
                    <p className="itemsLeft">{tareas.length} items left</p>
                </div>
                <div className="fondo1"></div>
                <div className="fondo2"></div>
                <div className="fondo3"></div>
            </div>
        </>
    );
};

export default ToDoList;