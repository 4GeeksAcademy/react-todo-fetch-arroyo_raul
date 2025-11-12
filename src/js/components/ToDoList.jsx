import React, { useState } from "react";

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);

    function onKeyDown(event) {
        if (event.code === 'Enter') {
            setTareas([...tareas, event.target.value]);
            event.target.value = '';
        }
    }

    function deleteTask(index) {
        // recibimos el índice (lo que usabas como key) y eliminamos la tarea
        setTareas(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <>
            <div className="contenedor">
                <h2 className="title">Todo List</h2>
                <div className="list">
                    <input type="text" onKeyUp={onKeyDown} id="task" name="task" placeholder="Add any task" />
                    <ol>
                        {tareas.map((tarea, index) => (
                            <li key={index}><p>{tarea}<span onClick={() => deleteTask(index)}>X</span></p></li>
                        ))}
                    </ol>
                    {tareas.length === 0 &&
                    <div className="noTasksContainer">
                        <p className="icono"><i class="fa-solid fa-x"></i></p> 
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