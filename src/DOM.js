import { project } from ".";
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

//Creates the form to make a new project.
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

    //Creates a holder for content, adds a title, and displays all the projects Todos 
    const contentHolder = document.createElement("div");
    contentHolder.setAttribute("id","contentHolder");
    
    contentSpot.appendChild(contentHolder);
    
    let projectTitle = document.createElement("p")
    projectTitle.setAttribute("class","projectTitle");
    projectTitle.textContent = project.projects[currentProject].project
    contentHolder.appendChild(projectTitle);

    //creates a new button to add Todos to a project and form to input data.
    let addTodo = document.createElement("button");
    addTodo.textContent = "Add Todo";
    addTodo.addEventListener("click", (e)=>{
        const body = document.querySelector("body");
        let formBox = document.createElement("div");
        formBox.setAttribute("class", "formBox");
        body.appendChild(formBox);

        let form = document.createElement("form");
        form.setAttribute("method","get");

        let labelTask = document.createElement("label");
        labelTask.setAttribute("for","name");
        labelTask.textContent = "Task Name:";
    
        let inputTask = document.createElement("input");
        inputTask.setAttribute("type","text");
        inputTask.setAttribute("name","name");

        let labelDescription = document.createElement("label");
        labelDescription.setAttribute("for","Description");
        labelDescription.textContent = "Description:";

        let inputDescription = document.createElement("input");
        inputDescription.setAttribute("type","text");
        inputDescription.setAttribute("name","Description")

        let labeldueDate = document.createElement("label");
        labeldueDate.setAttribute("for","dueDate");
        labeldueDate.textContent = "Enter Due Date M/D/Y:"

        let inputDueDate = document.createElement("input");
        inputDueDate.setAttribute("type","date");
        inputDueDate.setAttribute("Name","dueDate");

        let labelPriority = document.createElement("label");
        labelPriority.setAttribute("for","Priority");
        labelPriority.textContent = "Priority (High, Mediuem, Low):"

        let inputPriority = document.createElement("input");
        inputPriority.setAttribute("type","text");
        inputPriority.setAttribute("name","Priority");

        let button = document.createElement("button");
        button.setAttribute("id","addProject");
        button.textContent = "Add";
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if(inputTask.value == "" || inputDescription == "" || inputDueDate == "" || inputPriority == ""){
                alert("Please fill out all boxes!")
            }else{
                project.projects[currentProject].newTodo(inputTask.value, inputDescription.value, inputDueDate.value, inputPriority.value);
                createContent(currentProject);
                formBox.remove();
            }
        } )

        formBox.appendChild(form);
        form.append(labelTask, inputTask, labelDescription, inputDescription, labeldueDate, inputDueDate, labelPriority, inputPriority, button);

    })

    contentHolder.appendChild(addTodo);
    //gets todos and loops over them.
    const Todos = project.projects[currentProject].todos
    for(let i = 0; Todos.length > i; i++){
        //each todo has a task name, desription, duedate, proity.
        const taskHolder = document.createElement("div");
        const taskName = document.createElement("p");
        const taskDesription = document.createElement("p");
        const taskDueDate = document.createElement("p");
        const taskProity = document.createElement("p");
        const deleteButton = document.createElement("button");

        taskHolder.setAttribute("class", "todoHolder");
        taskName.setAttribute("class","TodoList");
        taskName.textContent = Todos[i].task;

        taskDesription.setAttribute("class", "TodoList");
        taskDesription.textContent = Todos[i].description;

        taskDueDate.setAttribute("class","TodoList");
        taskDueDate.textContent = Todos[i].dueDate

        taskProity.setAttribute("class","TodoList");
        taskProity.textContent = Todos[i].priority

        deleteButton.setAttribute("class", "TodoList");
        deleteButton.setAttribute("value", i);
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", (e) => {
            project.projects[currentProject].deleteTodo(Todos[i].task);
            createContent(currentProject);
        })

        contentHolder.appendChild(taskHolder);
        taskHolder.appendChild(taskName)
        taskHolder.appendChild(taskDesription);
        taskHolder.appendChild(taskDueDate);
        taskHolder.appendChild(taskProity);
        taskHolder.appendChild(deleteButton);
    }
}

