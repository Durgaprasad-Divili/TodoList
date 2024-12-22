const formData = document.getElementById("form");
let arr = [];
window.addEventListener("load", () => {
    const savedTasks = localStorage.getItem("tasks");
    arr = JSON.parse(savedTasks)?JSON.parse(savedTasks):[];
    if (arr) {
        displayTasks();
        arr.forEach((task) => {
            if(task.status) handleStylings(task.taskItem,task.status);
        });
        
    };
})
formData.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.getElementById("task");
    //getting the task value
    const taskVal = task.value;
    let duplicateItem = "";
    if (taskVal === "") return;
    if (arr) { duplicateItem = arr.some((elem) => elem.taskItem === taskVal); }
    if (duplicateItem) {
        return;
    }
    // creating object
    let taskValObj = {
        id: taskVal,
        taskItem: taskVal,
        status: false
    };
    //adding object into the array
    arr.push(taskValObj);
    //console.log(arr);
    localStorage.setItem("tasks", JSON.stringify(arr));
    console.log(task.value);
    appendElementsToDOM(taskVal);
    task.value = "";

})

// initial call
function displayTasks() {
    arr.forEach((task) => {
        const todoItemsParentDiv = document.getElementById("todo-items");
        const todoItemDiv = document.createElement("div");
        const h1tag = document.createElement("h1");

        //setting classname and id
        todoItemDiv.className = "todoItemDiv " + task.taskItem;
        h1tag.className = "todoItemh1 " + task.id
        todoItemDiv.id = "div" + task.id;
        h1tag.id = "h1" + task.id;

        const completionButton = document.createElement("button");
        completionButton.textContent = "Completed";
        completionButton.id = "btn-" + task.taskItem;
        completionButton.className = "completionBtn";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = "del-" + task.taskItem;
        deleteBtn.className = "deleteBtn";

        //adding completion click event listener
        completionButton.addEventListener("click", (e) => {
            let idVal = completionButton.getAttribute("id");
            idVal = idVal.replace("btn-", "");

            //const findItem = JSON.parse(localStorage.getItem("tasks")).find((each) => each.taskItem === idVal);
            //console.log("findItem", findItem);
            const taskIndex = arr.findIndex((task) => task.id === idVal);
            console.log(taskIndex);
            if(taskIndex!=-1){
                arr[taskIndex].status = !arr[taskIndex].status;
                localStorage.setItem("tasks",JSON.stringify(arr));
                handleStylings(idVal,arr[taskIndex].status);
            }    

        });
        deleteBtn.addEventListener("click",(e)=>{
            let idVal = deleteBtn.getAttribute("id");
            idVal = idVal.replace("del-", "");
            //const findItem = JSON.parse(localStorage.getItem("tasks")).find((each) => each.taskItem === idVal);
            const taskIndex = arr.findIndex((task) => task.id === idVal);
            if(taskIndex!=-1){
                arr.splice(taskIndex, 1);
                console.log("item removed");
                localStorage.setItem("tasks",JSON.stringify(arr));
                const removeEl = document.getElementById("div"+idVal);
                removeEl.remove();
            }
            
        });

        const completionDeletionParentDiv = document.createElement("div");
        completionDeletionParentDiv.className = "completionDeletionParentDiv";


        h1tag.innerHTML = task.taskItem;
        todoItemDiv.appendChild(h1tag);
        completionDeletionParentDiv.appendChild(completionButton);
        completionDeletionParentDiv.appendChild(deleteBtn);
        todoItemDiv.appendChild(completionDeletionParentDiv);
        todoItemsParentDiv.appendChild(todoItemDiv);
    })
}

// appending latest elements
function appendElementsToDOM(taskVal) {
    const todoItemsParentDiv = document.getElementById("todo-items");
    // creating elements
    const todoItemDiv = document.createElement("div");
    const h1tag = document.createElement("h1");

    const completionButton = document.createElement("button");
    completionButton.textContent = "Completed";
    completionButton.id = taskVal;
    completionButton.className = "completionBtn";
    todoItemDiv.className = "todoItemDiv " + taskVal;
    h1tag.className = "todoItemh1 " + taskVal
    todoItemDiv.id = "div" + taskVal;
    h1tag.id = "h1" + taskVal;

    const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = "del-" + taskVal;
        deleteBtn.className = "deleteBtn";

    const completionDeletionParentDiv = document.createElement("div");
    completionDeletionParentDiv.className = "completionDeletionParentDiv";

    h1tag.innerHTML = taskVal;
    todoItemDiv.appendChild(h1tag);
    completionDeletionParentDiv.appendChild(completionButton);
    completionDeletionParentDiv.appendChild(deleteBtn);
    todoItemDiv.appendChild(completionDeletionParentDiv);
    todoItemsParentDiv.appendChild(todoItemDiv);


    //repeated code
    //adding completion click event listener
    completionButton.addEventListener("click", (e) => {
        let idVal = completionButton.getAttribute("id");
        idVal = idVal.replace("btn-", "");

        //const findItem = JSON.parse(localStorage.getItem("tasks")).find((each) => each.taskItem === idVal);
        //console.log("findItem", findItem);
        const taskIndex = arr.findIndex((task) => task.id === idVal);
        console.log(taskIndex);
        if(taskIndex!=-1){
            arr[taskIndex].status = !arr[taskIndex].status;
            localStorage.setItem("tasks",JSON.stringify(arr));
            handleStylings(idVal,arr[taskIndex].status);
        }    

    });
    deleteBtn.addEventListener("click",(e)=>{
        let idVal = deleteBtn.getAttribute("id");
        idVal = idVal.replace("del-", "");
        //const findItem = JSON.parse(localStorage.getItem("tasks")).find((each) => each.taskItem === idVal);
        const taskIndex = arr.findIndex((task) => task.id === idVal);
        if(taskIndex!=-1){
            arr.splice(taskIndex, 1);
            console.log("item removed");
            localStorage.setItem("tasks",JSON.stringify(arr));
            const removeEl = document.getElementById("div"+idVal);
            removeEl.remove();
        }
        
    });
    
    
}


function handleStylings(item,status) {
    console.log("style",item);
    const styleItem = document.getElementById("h1"+item);
    console.log(styleItem);

    if(status){styleItem.style.textDecoration = "line-through"; styleItem.style.color="green";}
    else {styleItem.style.textDecoration = "none"; styleItem.style.color="black"};
}

