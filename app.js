const openInput = document.querySelector("#openInput");
const submitInput = document.querySelector("#submitInput");
const todoForm = document.querySelector("#todoForm");
const calendar = document.querySelector("#calendar");
const taskFlag = document.querySelector("#flag");
const todoTaskBody = document.querySelector("#todoTaskBody");


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

function createTask() {
    const options = {
        time: 'numeric',
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };

    let eventtime = document.querySelector(".datepicker-inputs").value;
    const dateTimes = new Date(eventtime);
    dateTimes.setMinutes(dateTimes.getMinutes() - dateTimes.getTimezoneOffset());
    console.log(dateTimes.toISOString().slice(0, 16));
    const dateTime = dateTimes.toLocaleDateString(undefined, options)
    const taskPriority = document.querySelector("#taskPriority").value;
    const taskTitle = document.querySelector("#todoTitle").value;

    let creatTasks = document.createElement("div");
    creatTasks.classList.add("borderRadius");
    creatTasks.classList.add("w-33");
    creatTasks.classList.add(`${taskPriority}Task`);
    creatTasks.innerHTML = `<span id="taskTag"> <i class="fas fa-solid fa-bookmark"></i></span>
    <h3>${taskTitle}</h3>
            <div class="flex flexCenter flexBetween">
                <span id="taskDone"> <i class="fas fa-1x fa-solid fa-check"></i></span>
                <span id="taskTime" class="flex flexCenter "><i class="fas fa-solid fa-clock"></i>
                    <pre>${dateTime}</pre></span>
            </div>`;
    console.log(creatTasks);
    todoTaskBody.appendChild(creatTasks);
}