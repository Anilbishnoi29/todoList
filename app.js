const openInput = document.querySelector("#openInput");
const submitInput = document.querySelector("#submitInput");
const todoForm = document.querySelector("#todoForm");


// event 
openInput.addEventListener("click", function () {
    todoForm.classList.add("openTodoForm");
    openInput.classList.add("closedBtn");
});
submitInput.addEventListener("click", function () {
    todoForm.classList.remove("openTodoForm");
    openInput.classList.remove("closedBtn");
});