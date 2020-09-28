class Task {
    text;
    id;
    dateCreated;
    static nextId = 1;
    constructor(text, dateCreated='') {
        this.text = text
        this.id = Task.nextId
        if(dateCreated === '') {
            let now = new Date(Date.now())
            this.dateCreated = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
        } else {
            this.dateCreated = dateCreated
        }
        Task.nextId++
    }
};

function initListeners() {
    var input = document.getElementById("task-text");
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("taskCreateBtn").click();
        }
    });

    let form = document.getElementById('task-form')
    form.addEventListener('submit', e => {
        e.preventDefault()
    })
}

function createTask() {
    let textArea = document.getElementById("task-text")
    let taskText = textArea.value
    if (taskText.trim() === "") {
        return
    }
    
    tasks.push(new Task(taskText))
    textArea.value = ""
    document.getElementById('subheader').style.display = 'none'
    saveAndRender()
}

function deleteSelectedTasks() {
    const taskElements = document.querySelectorAll(".tasks-list li")
    
    for(let li of taskElements) {
        const isTaskDone = li.querySelector("input").checked
        if(isTaskDone) {
            tasks = tasks.filter(item => item.id != li.dataset.id)
        }
    }
    saveAndRender()
}

function deleteAllTasks() {
    tasks = []
    saveAndRender()
}

function saveTasks() {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks))
    tasks.length === 0 && localStorage.removeItem(LOCAL_STORAGE_TASKS_KEY)
}

function saveAndRender() {
    saveTasks()
    render()
}

function getCardByDate(date) {
    for(card in cards) {
        if(card === date) {
            return cards[card]
        }
    }
    let newCard = document.createElement('div')
    newCard.setAttribute('class', 'card')
    let cardHeader = document.createElement('h4')
    cardHeader.innerText = date
    cardHeader.setAttribute('class', 'card-header')
    newCard.append(cardHeader)
    let ul = document.createElement("ul")
    ul.setAttribute('class', 'tasks-list')
    newCard.appendChild(ul)
    cards[date] = newCard
    return newCard
}

function render() {
    newRender()
    return;
    
    taskList.innerHTML = ''

    tasks.forEach(task => {
        let li = document.createElement("li")
        li.setAttribute("class", "todoTask")
        li.appendChild(document.createElement('input')).setAttribute("type", "checkbox")
        li.appendChild(document.createTextNode(task.text))
        li.appendChild(document.createElement("hr"))
        li.dataset.id = task.id
        taskList.appendChild(li)
    });
}

function newRender() {
    taskGridContainer.innerHTML = ''
    cards = {}

    tasks.forEach(task => {
        let card = getCardByDate(task.dateCreated)
        let tasksList = card.childNodes[1]
        let li = document.createElement("li")
        li.setAttribute("class", "todoTask")
        li.appendChild(document.createElement('input')).setAttribute("type", "checkbox")
        li.appendChild(document.createTextNode(task.text))
        li.appendChild(document.createElement("hr"))
        li.dataset.id = task.id
        tasksList.appendChild(li)
    });
    for(card in cards) {
        taskGridContainer.appendChild(cards[card])
    }
}

const LOCAL_STORAGE_TASKS_KEY = 'thetodoapp.tasks'
const taskList = document.getElementById("tasks-list")
const taskGridContainer = document.getElementById('tasks-grid-container')
var cards = {}
// provide initial tasks for demonstration purposes
var tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS_KEY))
if(tasks === null) {
    tasks = [new Task('Make a TODO app', '2020-9-11'),
    new Task('<h1>Test App for vulnerabilities</h1>', '2020-9-11'),
    new Task('Commit to prod on Friday', '2020-9-11'),
    new Task('Pick Jimmy up from school', '2020-9-11'),
    new Task('Play ball with Jimmy', '2020-9-12')]
    document.getElementById('subheader').style.display = 'initial'
}

initListeners()
render()
