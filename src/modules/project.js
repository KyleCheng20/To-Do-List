export class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.todoList = [];
    }

    addTodo(todo){
        this.todoList.push(todo);
    }

    deleteTodo(todo){
        let todoArr = this.todoList;
        this.todoList = todoArr.filter(task => task.id !== todo.id);
    }
}