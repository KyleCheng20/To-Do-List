import { Project } from "./project";
import { Todo } from "./todo";

function setStorage(projects){
    localStorage.setItem("allProjects", JSON.stringify(projects));
}

function loadStorage(){
    const data = localStorage.getItem("allProjects");
    if(!data) return [];

    const parsedProjects = JSON.parse(data);

    // return rehydrated array of projects
    return parsedProjects.map(projectData => {
        const project = new Project(projectData.title, projectData.description);
        project.id = projectData.id;

        project.todoList = projectData.todoList.map(todoData => {
            const todo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
            todo.id = todoData.id;
            todo.isComplete = todoData.isComplete;
            return todo;
        });
        return project;
    });
}

export {
    setStorage,
    loadStorage
}