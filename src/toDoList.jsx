import React, { useEffect ,useState } from "react";
import "./index.css";

function ToDoList() {
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(()=>{
        const savedTasks=JSON.parse(localStorage.getItem("tasks"));
        if(savedTasks && Array.isArray(savedTasks)){
            setTask(savedTasks);
        }
        
    },[])

    useEffect(()=>{
        if(task.length>0){
        localStorage.setItem("tasks", JSON.stringify(task));
        }
    },[task]);
    
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }


    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTask(prevTask => [...prevTask, newTask]);
            setNewTask("");
        }
    }

    function removeTask(index) {
        const updatedTask = task.filter((_, i) => i !== index);
        setTask(updatedTask);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    function moveTaskDown(index) {
        if (index < task.length - 1) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter the task"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {task.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => removeTask(index)}>
                            Delete
                        </button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            ⬆️
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            ⬇️
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
