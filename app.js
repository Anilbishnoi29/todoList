const openInput = document.querySelector("#openInput");
const submitInput = document.querySelector("#submitInput");
const todoForm = document.querySelector("#todoForm");
const calendar = document.querySelector("#calendar");
const taskFlag = document.querySelector("#flag");
const todoTaskBody = document.querySelector("#todoTaskBody");
const taskDone = document.querySelector("#taskDone");

const LOCAL_STORAGE_TODO_KEY = "tasks.list";
const todoLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) || [];
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
    const taskHour = document.querySelector("#taskHour").value;
    const taskMin = document.querySelector("#taskMin").value;

    var target = new Date(eventtime);
    const current = formatAMPM(target);
    console.log(current)

    const list = createList(taskTitle, current, taskPriority);
    todoLists.push(list);
    saveAndRender();
}

// save to local storage
function saveToTask() {
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todoLists));
}

function createList(name, dateTime, flag) {
    return {
        id: Date.now().toString(),
        name: name,
        dateTime: dateTime,
        flag: flag
    }
}

function renderList() {
    clearElement(todoTaskBody);
    todoLists.forEach(list => {
        let creatTasks = document.createElement("div");
        creatTasks.classList.add("borderRadius");
        creatTasks.classList.add("w-33");
        creatTasks.classList.add(`${list.flag}Task`);
        let currentTime = new Date();
        let crntTime = formatAMPM(currentTime);
        if (list.dateTime > crntTime) {
            console.log("yes");
        } else {
            creatTasks.classList.add("onGoingTask");
        }
        creatTasks.innerHTML = `<span id="taskTag"> <i class="fas fa-solid fa-bookmark"></i></span>
    <h3>${list.name}</h3>
            <div class="flex flexCenter flexBetween">
                <span id="taskDone"> <i class="fas fa-1x fa-solid fa-check"></i></span>
                <span id="taskTime" class="flex flexCenter "><i class="fas fa-solid fa-clock"></i>
                    <pre>${list.dateTime}</pre></span>
            </div>
            <span id="TaskTime"> On Going Task </span>
            `;
        todoTaskBody.appendChild(creatTasks);
    });
}

function saveAndRender() {
    saveToTask();
    renderList();
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
renderList(); // render all list 