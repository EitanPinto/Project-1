const DOM = {
    taskDateRef: null,
    taskTimeRef: null,
    taskInfoBoxRef: null,
    taskHeaderRef: null,
    mainNotesRow: null,
    navbarRef: null,
    
 };

const state = { tasks: []}

let isCheckboxSelected = false

function init() {
   DOM.taskTimeRef = document.querySelector("#taskTime");
   DOM.taskDateRef = document.querySelector("#taskDate");
   DOM.taskInfoBoxRef = document.querySelector("#taskInfoBox");
   DOM.taskHeaderRef = document.querySelector("#taskHeader");
   DOM.mainNotesRow = document.querySelector("#mainNotesRow");
   DOM.navbarRef = document.querySelector("#navbar");
   const saveTaskButton = document.querySelector("#addTaskNote");
   saveTaskButton.addEventListener("click", addTask )
   const resetTaskForm = document.querySelector("#resetTaskForm");
   resetTaskForm.addEventListener("click", resetTasksForm )

   try {
    const tasksString = localStorage.getItem("tasks");
          if (!tasksString) return;
          state.tasks = JSON.parse(tasksString);
        } catch{}
        draw(state.tasks);
        if(state.tasks.length > 0){
        const lastTask = getTaskUI(state.tasks[state.tasks.length - 1])
        DOM.mainNotesRow.append(lastTask);
        }


}
  
init();

function addTask() {  
    if (DOM.taskHeaderRef.value.length > 52){
        alert("It looks like your title is too Long, please try to make it shorter");
    return;
    }
    if (DOM.taskHeaderRef.value === ""){
       const titleOrNot = confirm("are you sure you want to save your Task note without a Title ? press OK if yes , Cancel to Return");
       if (titleOrNot === false) {
        return;
       }
    }
    if (DOM.taskTimeRef.value === ""){
    const timeOrNot = confirm("are you sure you want to save your Task note without a due Hour ? press OK if yes , Cancel to Return");
    if (timeOrNot === false) {
        return;
       }
    }
    if (DOM.taskDateRef.value === ""){
        const dateOrNot = confirm("are you sure you want to save your Task note without a due Date ? press OK if yes , Cancel to Return");
        if (dateOrNot === false) {
            return;
           }
        }
    if (DOM.taskInfoBoxRef.value === ""){
    const infoBoxDetailsOrNot = confirm("are you sure you want to save your Task note without any details about it ? press OK if yes , Cancel to Return");
     if (infoBoxDetailsOrNot === false) {
        return;
       }
    }
    const task = {
        date: DOM.taskDateRef.value,
        time: DOM.taskTimeRef.value,
        infoBox: DOM.taskInfoBoxRef.value,
        header: DOM.taskHeaderRef.value,
        id: _getTaskNoteId(),
        isFavorite: false,
};

state.tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(state.tasks));

draw(state.tasks);
drawWithAnimation(state.tasks)
    
function _getTaskNoteId() {
    const taskNoteName = DOM.taskHeaderRef.value || "";
     return "task_note_name_id_" + taskNoteName + Math.ceil(Math.random() * 999)
    };

     DOM.taskDateRef.value = "";
     DOM.taskTimeRef.value = "";
     DOM.taskInfoBoxRef.value = "";
     DOM.taskHeaderRef.value = "";
    

    
}


function resetTasksForm () {
    DOM.taskDateRef.value = "";
    DOM.taskTimeRef.value = "";
    DOM.taskInfoBoxRef.value = "";
    DOM.taskHeaderRef.value = "";
}

function draw(tasks) {
        DOM.mainNotesRow.innerHTML = "";
       for (let index = 0; index < tasks.length-1; index++) {
       const taskDetails = getTaskUI(tasks[index]);
        if (!taskDetails) return;
        DOM.mainNotesRow.append(taskDetails);

        drawFavorites()
    }
}
function drawFavorites() {
     DOM.navbarRef.innerHTML = "";
     const favoriteTaskNotes = getFavoriteTaskNotesNewArray(state.tasks)
        if(favoriteTaskNotes.length > 1){
            const navbar = getNavBarUI();
            if (!navbar) return;
            DOM.navbarRef.append(navbar);
        }
}

    


function drawWithAnimation(tasks) {

   const lastTask = getTaskUI(tasks[tasks.length - 1])
   DOM.mainNotesRow.append(lastTask);
   lastTask.classList.add("fade-in-on-save")

}

function getTaskUI(task) { 

const firstCardDiv = document.createElement("div");
firstCardDiv.classList.add("col-md-4")

const secCardDiv = document.createElement("div");
secCardDiv.classList.add("card", "card-design-various")
secCardDiv.style.border = "solid #212529"
secCardDiv.addEventListener("mouseenter", function(){
    secCardDiv.classList.add("card-background-on-enter")
});
secCardDiv.addEventListener("mouseleave", function(){
    secCardDiv.classList.remove("card-background-on-enter")
});

const thirdCardDiv = document.createElement("div");
thirdCardDiv.classList.add("card-body")

const lowerElementsDiv = document.createElement("div");

const innerCardHeader = document.createElement("h5");
innerCardHeader.classList.add("card-title")
innerCardHeader.innerText = task.header

const fourthCardDivTextSection = document.createElement("div");

const paraTextSection = document.createElement("p");
paraTextSection.classList.add("card-text")
paraTextSection.innerText = task.infoBox
paraTextSection.style.overflowY = "auto"
paraTextSection.classList.add("card-design-various")
paraTextSection.style.height = "150px";
paraTextSection.classList.add("scroller-design")


const innerCardDivTime = document.createElement("div");
innerCardDivTime.classList.add("note-date", "font-12", "text-muted", "time-design")
innerCardDivTime.innerText = task.time
innerCardDivTime.classList.add("time-date-design");

const innerCardDivDate = document.createElement("div");
innerCardDivDate.classList.add("note-date", "font-12", "text-muted", "date-design")
innerCardDivDate.innerText = task.date
innerCardDivDate.classList.add("time-date-design");


const mainDeleteButtonDiv = document.createElement("div");
mainDeleteButtonDiv.classList.add("deleteButtonDiv");
mainDeleteButtonDiv.style.visibility = "hidden";
mainDeleteButtonDiv.style.position ="absolute"
mainDeleteButtonDiv.style.bottom ="0"
mainDeleteButtonDiv.style.right ="0"

const mainFavoriteButtonDiv = document.createElement("div");
mainFavoriteButtonDiv.style.position ="absolute";
mainFavoriteButtonDiv.style.right ="40px";
mainFavoriteButtonDiv.style.bottom ="0"

const favoriteIcon = document.createElement("i");
favoriteIcon.classList.add("bi","bi-bookmark-star");

const favoriteButton = document.createElement("button");
favoriteButton.classList.add("btn","btn-light");
favoriteButton.style.backgroundColor = "white";
favoriteButton.style.border = "white";
if(task.isFavorite){
    favoriteIcon.classList.remove("bi","bi-bookmark-star");
    favoriteIcon.classList.add("bi","bi-bookmark-star-fill");
}
favoriteButton.addEventListener("click", function(){
    console.log("aaaa")
    task.isFavorite = !task.isFavorite;
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    draw(state.tasks);
    const lastTask = getTaskUI(state.tasks[state.tasks.length - 1])
    DOM.mainNotesRow.append(lastTask);
 })


const deleteButton = document.createElement("button");
deleteButton.classList.add("btn","btn-light");
deleteButton.style.backgroundColor = "#F0F0F0";
deleteButton.style.border = "#F0F0F0";
deleteButton.addEventListener("click", function(){
const taskNoteIndex = getTaskNoteIndexById(task.id, state.tasks)
if (taskNoteIndex === undefined) return;
state.tasks.splice(taskNoteIndex, 1);

localStorage.setItem("tasks", JSON.stringify(state.tasks));
draw(state.tasks)
if(state.tasks.length>0){
const lastTask = getTaskUI(state.tasks[state.tasks.length - 1])
DOM.mainNotesRow.append(lastTask);
}
})

const trashIcon = document.createElement("i");
trashIcon.classList.add("bi","bi-trash-fill");

firstCardDiv.append(secCardDiv);
secCardDiv.append(thirdCardDiv, lowerElementsDiv);
thirdCardDiv.append(innerCardHeader);
thirdCardDiv.append(fourthCardDivTextSection);
fourthCardDivTextSection.append(paraTextSection);
deleteButton.append(trashIcon);
mainDeleteButtonDiv.append(deleteButton);
lowerElementsDiv.append(innerCardDivDate, innerCardDivTime,mainFavoriteButtonDiv, mainDeleteButtonDiv)
favoriteButton.append(favoriteIcon)
mainFavoriteButtonDiv.append(favoriteButton)


secCardDiv.addEventListener("mouseenter", function(){
    this.querySelector(".deleteButtonDiv").style.visibility = "visible";
    favoriteButton.style.backgroundColor = "#F0F0F0";
    favoriteButton.style.border = "#F0F0F0";

})
secCardDiv.addEventListener("mouseleave", function(){
    this.querySelector(".deleteButtonDiv").style.visibility = "hidden";
    favoriteButton.style.backgroundColor = "white";
    favoriteButton.style.border = "white";
 })

return firstCardDiv;
}


function getTaskNoteIndexById(id, tasks) {
     if (typeof id !== "string") return;
     if (!Array.isArray(tasks)) return;
      for (let index = 0; index < tasks.length; index++) {
    const currentTask = tasks[index];
    if (currentTask.id === id) {
           return index;
         }
    }
}


function getFavoriteTaskNotesNewArray(tasks) {
    if (!Array.isArray(tasks)) return;
       const favoriteTaskNotes = [];
       for (let index = 0; index < tasks.length; index++) {
         if (tasks[index].isFavorite === true) {
            favoriteTaskNotes.push(tasks[index]);
        }
    }
    return favoriteTaskNotes
}


function getNavBarUI (){
        const navBarMain = document.createElement("nav");
        navBarMain.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light", "navbar-design")
        const lowerDivContainer = document.createElement("div");
        lowerDivContainer.classList.add("container-fluid")
        const favoritesButton = document.createElement("button");
        favoritesButton.classList.add("btn", "btn-dark", "btn-md", "pointer-auto")
        favoritesButton.innerText = "Show Favorite Tasks";
        const checkboxInput = document.createElement("input");
        checkboxInput.style.marginLeft = "7px"
        checkboxInput.type = "checkbox";
        checkboxInput.checked = isCheckboxSelected;
        checkboxInput.onchange = function (){
        isCheckboxSelected = !isCheckboxSelected;
        if (checkboxInput.checked){
          const NewFavoritesArray = getFavoriteTaskNotesNewArray(state.tasks)
          draw(NewFavoritesArray)
          const lastTask = getTaskUI(NewFavoritesArray[NewFavoritesArray.length - 1])
          DOM.mainNotesRow.append(lastTask);
        }
        else {draw(state.tasks)
        const lastTask = getTaskUI(state.tasks[state.tasks.length - 1])
        DOM.mainNotesRow.append(lastTask);
        }
    }
        navBarMain.append(lowerDivContainer)
        lowerDivContainer.append(favoritesButton)
        favoritesButton.append(checkboxInput)
        return navBarMain;
}


  

  



 




  