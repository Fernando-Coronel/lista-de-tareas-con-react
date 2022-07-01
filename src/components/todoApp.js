import { useState } from "react";
import Todo from "./todo";
import './todoApp.css';


export default function TodoApp(){
    //Hooks son funciones que permiten actualizar informacion de las variables o estado.
    const [title, setTitle] = useState("Hola");
    const [todos, setTodos] = useState([]); 
    
    

    function handleChange(event){
        const value = event.target.value;

        setTitle(value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false,
        };
        
        //Primero hace la copia del array de las tareas
        const temp = [...todos];
        temp.unshift(newTodo);//Despues las agrega al inio de la copia del array.

        setTodos(temp);
        
        setTitle("");
    }

    function handleUpdate(id, value){
        const temp = [...todos];
        const item = temp.find((item) => item.id === id);
        item.title = value;
        setTodos(temp);
    }

    function handleDelete(id){
        const temp = todos.filter( item => item.id !== id);
        setTodos(temp);    
    }

    return (
    <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={title}/>
            <input onClick={handleSubmit} 
            type="submit" 
            value="Crear Tarea" 
            className="buttonCreate"/>
        </form>

        <div className="todosContainer">
            {
                todos.map(item => (
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                ))}
        </div>
    </div>
    );
}