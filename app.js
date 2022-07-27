const openInput = document.querySelector("#openInput");
const submitInput = document.querySelector("#submitInput");
const todoForm = document.querySelector("#todoForm");
const taskFlag = document.querySelector("#flag");
const todoTaskBody = document.querySelector("#todoTaskBody");
const taskDone = document.querySelector("#taskDone");
const complatedTask = document.querySelector("#complatedTask");
const unComplatedTask = document.querySelector("#unComplatedTask");
const allTask = document.querySelector("#allTask");

const LOCAL_STORAGE_TODO_KEY = "tasks.list";
const LOCAL_STORAGE_TODO_LIST_ID = "tasks.selectedListId";
const todoLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) || [];
const selectedListId = localStorage.getItem(LOCAL_STORAGE_TODO_LIST_ID);
// event 
openInput.addEventListener("click",function () {
    todoForm.classList.add("openTodoForm");
    openInput.classList.add("closedBtn");
});
submitInput.addEventListener("click",function () {
    todoForm.classList.remove("openTodoForm");
    openInput.classList.remove("closedBtn");
    createTask();
});

taskFlag.addEventListener("click",function () {
    const taskPriority = document.querySelector("#taskPriority").value;
    if (taskPriority === "p1") {
        taskFlag.classList.add("p1Task");
    } else if (taskPriority === "p2") {
        taskFlag.classList.add("p2Task");
    } else if (taskPriority === "p3") {
        taskFlag.classList.add("p3Task");
    }
});
// date and time
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function createTask() {
    const options = {
        time: 'numeric',
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };

    const taskPriority = document.querySelector("#taskPriority").value;
    const taskTitle = document.querySelector("#todoTitle").value;
    const current = formatAMPM(new Date());
    if (taskTitle !== "") {
        const list = createList(taskTitle,current,taskPriority,false);
        todoLists.push(list);
        saveAndRender();
    } else {
        alert("Enter task name !");
    }
    document.querySelector("#todoTitle").value = "";
}

// save to local storage
function saveToTask() {
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY,JSON.stringify(todoLists));
}

function createList(name,dateTime,flag,done) {
    return {
        id: Date.now().toString(),
        name: name,
        dateTime: dateTime,
        flag: flag,
        done: done
    };
}
// create task
function createTaskList(taskList) {
    clearElement(todoTaskBody);
    taskList.forEach(list => {
        let creatTasks = document.createElement("div");
        creatTasks.classList.add("borderRadius");
        creatTasks.classList.add("w-33");
        creatTasks.classList.add(`${list.flag}Task`);
        creatTasks.dataset.listId = list.id;
        if (list.done === true) {
            creatTasks.classList.add("complated");
        }
        let taskTimeOn = "taskTimeOn";
        creatTasks.innerHTML = `<span id="taskTag"> <i class="fas fa-solid fa-bookmark"></i></span>
    <h3>${list.name}</h3>
            <div class="flex flexCenter flexBetween"><div class="flex flexCenter">
                <span id="taskDone" class="taskDone"> <i class="fas fa-1x fa-solid fa-check"></i></span>
                <span id="taskDelete" class="taskDelete"> <i class="fas fa-1x fa-solid fa-trash"></i></span></div>
                <span id="taskTime" class="flex flexCenter ${taskTimeOn}"><i class="fas fa-solid fa-clock"></i>
                    <pre>${list.dateTime}</pre></span>
            </div>
            `;
        todoTaskBody.appendChild(creatTasks);
    });
    taskNo();
}

function renderList() {
    createTaskList(todoLists);
}

function saveAndRender() {
    saveToTask();
    renderList();
    taskNo();
}
taskDone;

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
renderList(); // render all list 

todoTaskBody.addEventListener("click",(e) => {
    if (e.target.className === "taskDone") {
        let doneBtn = e.target.parentNode;
        let doneBtnParent = doneBtn.parentNode;
        let removeId = doneBtnParent.parentNode.dataset.listId;
        todoLists.forEach(list => {
            if (list.id === removeId) {
                if (list.done == true) {
                    list.done = false;
                    taskNo();
                } else {
                    list.done = true;
                    taskNo();
                }
            }
        });
    }
    if (e.target.className === "taskDelete") {
        let doneBtn = e.target.parentNode;
        let doneBtnParent = doneBtn.parentNode;
        let removeId = doneBtnParent.parentNode.dataset.listId;
        todoLists.forEach(list => {
            if (list.id === removeId) {
                todoLists.splice(todoLists.findIndex(a => a.id === removeId),1);
                taskNo();
            }
        });
    }
    localStorage.removeItem(e);
    saveAndRender();
    taskNo();
});

// complatedTask
complatedTask.addEventListener("click",() => {
    let complatedTaskList = todoLists.filter(list => list.done === true);
    createTaskList(complatedTaskList);
});
unComplatedTask.addEventListener("click",() => {
    let unComplatedTaskList = todoLists.filter(list => list.done !== true);
    createTaskList(unComplatedTaskList);
});
allTask.addEventListener("click",() => {
    createTaskList(todoLists);
    return todoLists.length;
});

function taskNo() {
    const allTaskNo = document.querySelector("#allTaskNo");
    const comTaskNo = document.querySelector("#comTaskNo");
    const unTaskNo = document.querySelector("#unTaskNo");
    let ComplatedTaskNo = todoLists.filter(list => list.done === true).length;
    let unComplatedTaskNo = todoLists.filter(list => list.done !== true).length;
    allTaskNo.innerHTML = todoLists.length;
    comTaskNo.innerHTML = ComplatedTaskNo;
    unTaskNo.innerHTML = unComplatedTaskNo;
}
taskNo();