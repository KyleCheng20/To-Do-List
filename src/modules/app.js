import { Project } from "./project";
import { Todo } from "./todo";
import { setStorage, loadStorage } from "./storage";

const projects = [];
let activeProject = null;

function initProject(){
    const loadProjects = loadStorage();
    if(loadProjects && loadProjects.length > 0){
        projects.push(...loadProjects);
        activeProject = projects[0].id;
    } else{
        const defaultProject = new Project("Project 1", "Default Project");
        projects.push(defaultProject);
        activeProject = defaultProject.id;
    }
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

    setStorage(projects);

    return project;
}

function addTodoToActiveProject(todo){
    const project = getActiveProject();

    const newTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority);
    project.addTodo(newTodo);

    setStorage(projects);
}

function deleteTodoFromActiveProject(todo){
    const project = getActiveProject();
    project.deleteTodo(todo);
    
    setStorage(projects);
}

export {
    getActiveProject,
    setActiveProject,
    createProject,
    addTodoToActiveProject,
    deleteTodoFromActiveProject,
}