'use strick';
const categoryUl = document.querySelector('#categoryUl');
const categoryBtn = document.querySelector('#addNewTaskCategoryBtn');
const colorMode = document.getElementById("mode");

const LOCAL_STORAGE_LIST_KEY = 'task.list';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

renderCategory();
categoryBtn.addEventListener('click', e => {
    e.preventDefault;
    const categoryName = document.querySelector('#addNewTaskCategory').value;
    if (categoryName.length <= 20 && categoryName.length >= 3) {
        const categoryList = createList(categoryName);
        lists.push(categoryList);
        saveAndRender();
    } else {
        alert(`length must be 3 char to 20 char.`);
    }
    document.querySelector('#addNewTaskCategory').value = "";
})

function saveAndRender() {
    saveTaskCategory();
    renderCategory();
}
// save task in local storage

function saveTaskCategory() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}
// create list obj
function createList(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasksList: []
    }
}
// 
categoryUl.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})
// append all category in li
function renderCategory() {
    clearCategoryList(categoryUl);
    lists.forEach(list => {
        const categoryLi = document.createElement("li"); // create a new li
        categoryLi.dataset.listId = list.id;
        categoryLi.classList = "categoryLi"; // add a class that li
        let innerLi = `<button id="trashOfUl"><i class="fas fa-solid fa-trash"></i></button>`
        // categoryLi.innerText = list.name; // set name of task list
        categoryLi.innerHTML = `${list.name} ${innerLi}`; // set name of task list
        if (list.id === selectedListId) {
            categoryLi.classList.add('activeTaskList');
            const trashOfUl = categoryLi.lastChild;
            trashOfUl.addEventListener('click', () => {
                lists = lists.filter(list => list.id !== selectedListId)
                selectedListId = null;
                saveAndRender();
            })
        }
        categoryUl.appendChild(categoryLi); // append li in ul
    })
}
console.log(lists);

function clearCategoryList(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// color mode
colorMode.addEventListener('click', function () {
    document.body.classList.toggle("lightMode");
    colorMode.classList.toggle("modeColorBtn");
})