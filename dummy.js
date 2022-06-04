const addNewTaskCategoryBtn = document.getElementById("addNewTaskCategoryBtn");
const categoryLi = document.querySelector("#categoryUl"); // category ul

const categoryArray = []; // an array of category list
let counter = 0;

addNewTaskCategoryBtn.addEventListener('click', function (e) {
    e.preventDefault;
    const categoryName = document.getElementById("addNewTaskCategory").value; // get input value of task category
    const categoryUl = document.getElementById("categoryUl"); // select ul(category) for append li 
    // input validation
    if (categoryName.length <= 20 && categoryName.length >= 3) {
        const categoryLi = document.createElement("li"); // create a new li
        categoryLi.classList = "categoryLi"; // add a class that li
        categoryLi.innerText = categoryName; // set name of task list
        categoryUl.appendChild(categoryLi); // append li in ul
        addNewTaskCategory.value = ""; // input value == null 
        let nameOfCategory = `${categoryName+counter}`;
        counter++;
        categoryArray.push(nameOfCategory);
        console.log(categoryArray);
        addLiStyle(); // a function for set li style
    } else {
        alert(`length must be 3 char to 20 char.`);
        console.log(categoryName.length);
        addNewTaskCategory.value = "";
    }
});
// a function for set style of category li
function addLiStyle(e) {
    let li = document.getElementsByClassName('categoryLi'); // select all li
    //  a loop for set background at current li which is selected
    for (let i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            let n = li[0];
            while (n) {
                if (n.classList[1] === 'activeTaskList') {
                    n.classList.remove('activeTaskList');
                }
                n = n.nextSibling;
            }
            this.classList = 'categoryLi activeTaskList';
        }
    }
}

function addToTaskBar(e) {
    addLiStyle();
    const liName = e.target; // select current li
    const liValue = liName.innerText; // get that li text and set in another field
    const styles = getComputedStyle(liName); // get style that current li
    const bgColor = styles.backgroundColor; // get bg color
    const allTaskTitle = document.querySelector("#ulTitle"); // select ul from another section
    allTaskTitle.innerText = liValue; // set that ul text
    allTaskTitleParent = allTaskTitle.parentElement; // select parent of that ul
    allTaskParent = allTaskTitleParent.parentElement; // select grandparent of that ul
    allTaskParent.parentElement.style.border = `5px solid ${bgColor}`; // set border of grandparent
}

categoryLi.addEventListener('click', addToTaskBar); // this function handle all style of li , ul and also ul text