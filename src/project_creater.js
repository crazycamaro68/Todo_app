import {todo} from "./todo_creater.js"

export class project_creator{
    constructor(name){
        this.project = name,
        this.todos = []
    }

    newTodo(task, description, dueDate, priority){
        if(dueDate === undefined){
            dueDate = "No Date";
        }
        const newTodoObject = new todo(task, description, dueDate, priority);
        this.todos.push(newTodoObject);
    }

    deleteTodo(todoName){
        const postion = this.todos.find(({ task }) => task === todoName);
        if(postion === undefined){
            alert("Can not find task!");
        }else{
            this.todos.splice(postion,1);
        }
    }
    
}