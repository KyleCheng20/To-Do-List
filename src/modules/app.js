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

function deleteProject(project){
    // prevent deleting last project
    if(projects.length === 1) return;

    const index = projects.findIndex(p => p.id === project.id);
    if(index === -1) return;

    projects.splice(index, 1);

    // handle if deleting the current active project
    if(activeProject === project.id){
        activeProject = projects.length > 0 ? projects[0].id : null;
    }

    setStorage(projects);
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

function toggleTodoComplete(todo){
    const project = getActiveProject();
    const targetTodo = project.todoList.find(t => t.id === todo.id);

    if(!targetTodo) return;

    targetTodo.isComplete = !targetTodo.isComplete;
    setStorage(projects);
}

export {
    getActiveProject,
    setActiveProject,
    createProject,
    deleteProject,
    addTodoToActiveProject,
    deleteTodoFromActiveProject,
    toggleTodoComplete,
    projects
}