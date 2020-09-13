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
    
    let taskList = document.getElementById("tasks-list")
    let task = document.createElement("li")
    let todoSpan = document.createElement("span")

    task.setAttribute("class", "todoTask")
    task.appendChild(document.createElement('input')).setAttribute("type", "checkbox")
    todoSpan.setAttribute("class", "todoSpan")
    todoSpan.appendChild(document.createTextNode("Todo: "))

    task.appendChild(todoSpan)
    task.appendChild(document.createTextNode(taskText))
    task.appendChild(document.createElement("hr"))
    taskList.appendChild(task)
    textArea.value = ""
}

function deleteTasks() {
    const tasks = document.querySelectorAll("#tasks-list li")
    //const tasks = document.querySelectorAll(".todoTask")
    for(let li of tasks) {
        const isTaskDone = li.querySelector("input").checked
        console.log(isTaskDone)
        isTaskDone && li.remove()
    }
}

initListeners()