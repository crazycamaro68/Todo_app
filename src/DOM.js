import { project } from ".";
import { project_storage } from "./project_storage";
export function render(projects){
    const sideBar = document.querySelector(".sidebar");

    //Deletes side bar buttons
    let buttonsPresent = document.querySelectorAll(".sideButtons");
    if(buttonsPresent !== null){
        for(let i = 0; buttonsPresent.length > i; i++){
            buttonsPresent[i].remove();
        }
    }

    //Keeps buttons stored so functions can be added.
    let sideBarButtons = []

    //Creates new project button and also loops over projects and creates buttons for them
    createSideButton("New Project", "newProject");
    for(let i = 0; projects.length > i; i++){
        createSideButton(projects[i].project, i);
    }

    //Acutal function for creating button.
    function createSideButton(ButtonName, Id){
        let div = document.createElement("div");
        div.setAttribute("class","sideButtons")
        if(Id !== undefined){
            div.setAttribute("id", Id);
        }
        let button = document.createElement("button");
        button.setAttribute("id", "projectButtons")
        button.setAttribute("value", Id)
        button.textContent = ButtonName;
        sideBar.appendChild(div);
        div.appendChild(button)
        sideBarButtons.push(button);
    }

    //Addes function to New Project button.
    sideBarButtons[0].addEventListener("click", createProjectForm);
    
    //Adds function to the Projects button, allowing to show projects in content page.
    for(let i = 1; sideBarButtons.length > i; i++){
        sideBarButtons[i].addEventListener("click", (e) => {
            createContent(e.srcElement.value);
        })
    }
}

//Creates the form to make a new project. Still need to make it wipe the form after submiting.
function createProjectForm(){
    const body = document.querySelector("body");
    let formBox = document.createElement("div");
    formBox.setAttribute("class", "formBox");
    body.appendChild(formBox);

    let form = document.createElement("form");
    form.setAttribute("method","get");

    let label = document.createElement("label");
    label.setAttribute("for","name");
    label.textContent = "New Project Name:";
    
    let input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("name","name");

    let button = document.createElement("button");
    button.setAttribute("id","addProject");
    button.textContent = "Add";
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(input.value == ""){
            alert("Please enter a Project name.")
        }else{
            project.createNewProject(input.value);
            render(project.projects);
            formBox.remove();
        }
    } )

    formBox.appendChild(form);
    form.append(label, input, button);
}
//Displays Project and it Todos. (Needs finished)
function createContent(currentProject){
    const contentSpot = document.querySelector(".content");

    //Clears content box if data is there
    let tobeDeleted = document.querySelector("#contentHolder");
    if(tobeDeleted !== null){
        tobeDeleted.remove();
    }

    //Creates a holder for content and add a title. (Needs finished)
    const contentHolder = document.createElement("div");
    contentHolder.setAttribute("id","contentHolder");
    
    contentSpot.appendChild(contentHolder);
    
    console.log(project.projects[currentProject])
    let projectTitle = document.createElement("p")
    projectTitle.setAttribute("class","projectTitle");
    projectTitle.textContent = project.projects[currentProject].project
    contentHolder.appendChild(projectTitle);
}

