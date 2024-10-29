import { project_creator } from "./project_creater";

export class project_storage{
    constructor(){
        this.projects = []
    }
    createNewProject(name){
        let newProject = new project_creator(name);
        this.projects.push(newProject);
    }
    deleteProject(projectName){
        const postion = this.projects.find(({ project }) => project === projectName);
        if(postion === undefined){
            alert("Project not found");
        }else{
            this.projects.splice(postion,1);
        }
    }
}