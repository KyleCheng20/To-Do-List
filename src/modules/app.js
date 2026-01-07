import { Project } from "./project";
import { Todo } from "./todo";

const projects = [];
let activeProject = null;

function initProject(){
    const defaultProject = new Project("Project 1", "Default Project");
    projects.push(defaultProject);
    activeProject = defaultProject.id;
}

initProject();

function getActiveProject(){
    return projects.find(project => project.id === activeProject);
}

function setActiveProject(project){
    activeProject = project.id;
}

function createProject(title, description){
    let project = new Project(title, description);
    projects.push(project);
    activeProject = project.id;

    return project;
}

function addTodoToActiveProject(todo){
    const project = getActiveProject();

    const newTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority);
    project.addTodo(newTodo);
}

function deleteTodoFromActiveProject(todo){
    const project = getActiveProject();

    project.deleteTodo(todo);
}

export {
    getActiveProject,
    setActiveProject,
    createProject,
    addTodoToActiveProject,
    deleteTodoFromActiveProject
}