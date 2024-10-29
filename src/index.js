import './style.css';

import { project_storage } from "./project_storage";
import { render } from './DOM';

export let project = new project_storage();
project.createNewProject("Barn");
project.projects[0].newTodo("Order Metal","Order metal from Higgins","09/25/2024","High");

project.createNewProject("House");
project.projects[1].newTodo("Get eletric","call aes and get eletric","10/30/2024","high");
console.log(project);
render(project.projects);