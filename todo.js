class Task {
    text;
    id;
    dateCreated;
    static nextId = 1;
    constructor(text) {
        this.text = text
        this.id = Task.nextId
        let now = new Date(Date.now())
        this.dateCreated = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate()
        Task.nextId++
    }
};

const taskList = document.getElementById("tasks-list")
let tasks = [new Task('Make a TODO app'),
            new Task('<h1>Test App for vulnerabilities</h1>'),
            new Task('Commit to prod on Friday'),
            new Task('Pick Jimmy up from school'),
            new Task('Play ball with Jimmy')]

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
}

function createTask() {
    let textArea = document.getElementById("task-text")
    let taskText = textArea.value
    if (taskText.trim() === "") {
        return
    }
    
    tasks.push(new Task(taskText))
    textArea.value = ""
    render()
}

function deleteTasks() {
    const taskElements = document.querySelectorAll("#tasks-list li")
    
    for(let li of taskElements) {
        const isTaskDone = li.querySelector("input").checked
        if(isTaskDone) {
            tasks = tasks.filter(item => item.id != li.dataset.id)
        }
    }
    render()
}

initListeners()

function render() {
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

render()
