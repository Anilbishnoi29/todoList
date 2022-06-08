const openInput = document.querySelector("#openInput");
const submitInput = document.querySelector("#submitInput");
const todoForm = document.querySelector("#todoForm");
const calendar = document.querySelector("#calendar");
const taskFlag = document.querySelector("#flag");
const todoTaskBody = document.querySelector("#todoTaskBody");
const taskDone = document.querySelector("#taskDone");

const LOCAL_STORAGE_TODO_KEY = "tasks.list";
const LOCAL_STORAGE_TODO_LIST_ID = "tasks.selectedListId";
const todoLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) || [];
const selectedListId = localStorage.getItem(LOCAL_STORAGE_TODO_LIST_ID);
// event 
openInput.addEventListener("click", function () {
    todoForm.classList.add("openTodoForm");
    openInput.classList.add("closedBtn");
});
submitInput.addEventListener("click", function () {
    todoForm.classList.remove("openTodoForm");
    openInput.classList.remove("closedBtn");
    createTask();
});

taskFlag.addEventListener("click", function () {
    const taskPriority = document.querySelector("#taskPriority").value;
    if (taskPriority === "p1") {
        taskFlag.classList.add("p1Task");
    } else if (taskPriority === "p2") {
        taskFlag.classList.add("p2Task");
    } else if (taskPriority === "p3") {
        taskFlag.classList.add("p3Task");
    }
})
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

    let eventtime = document.querySelector(".datepicker-inputs").value;
    const taskPriority = document.querySelector("#taskPriority").value;
    const taskTitle = document.querySelector("#todoTitle").value;

    var target = new Date(eventtime);
    const current = formatAMPM(target);
    console.log(current)

    const list = createList(taskTitle, current, taskPriority, false);
    todoLists.push(list);
    saveAndRender();
}

// save to local storage
function saveToTask() {
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todoLists));
}

function createList(name, dateTime, flag, done) {
    return {
        id: Date.now().toString(),
        name: name,
        dateTime: dateTime,
        flag: flag,
        done: done
    }
}

function renderList() {
    clearElement(todoTaskBody);
    todoLists.forEach(list => {
        let creatTasks = document.createElement("div");
        creatTasks.classList.add("borderRadius");
        creatTasks.classList.add("w-33");
        creatTasks.classList.add(`${list.flag}Task`);
        creatTasks.dataset.listId = list.id;
        if (list.done === true) {
            creatTasks.classList.add("complated");
        }
        let currentTime = new Date();
        let crntTime = formatAMPM(currentTime);
        let taskTimeOn = "";
        if (list.dateTime > crntTime) {
            taskTimeOn = "";
        } else {
            taskTimeOn = "taskTimeOn";
        }
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
}

function saveAndRender() {
    saveToTask();
    renderList();
}
taskDone

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
renderList(); // render all list 

todoTaskBody.addEventListener("click", (e) => {
    if (e.target.className === "taskDone") {
        let doneBtn = e.target.parentNode;
        let doneBtnParent = doneBtn.parentNode;
        let removeId = doneBtnParent.parentNode.dataset.listId
        todoLists.forEach(list => {
            if (list.id === removeId) {
                if (list.done == true) {
                    list.done = false;
                } else {
                    list.done = true;
                }
            }
        });
    }
    if (e.target.className === "taskDelete") {
        let doneBtn = e.target.parentNode;
        let doneBtnParent = doneBtn.parentNode;
        let removeId = doneBtnParent.parentNode.dataset.listId
        todoLists.forEach(list => {
            if (list.id === removeId) {
                todoLists.splice(todoLists.findIndex(a => a.id === removeId), 1);
            }
        });
    }
    localStorage.removeItem(e)
    saveAndRender();
})