const toSubmit = document.getElementById("todo-submit");
const task = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const storedData = localStorage.getItem('myData');
toSubmit.addEventListener("click", () => {
    let i;
    const newTask = task.value;
    console.log(newTask);
    console.log(storedData);
    if (!storedData) {
        i = 1;
        console.log(i);
        const newData = [
            {
                task: newTask,
                id: i
            }
        ]
        const jsonData = JSON.stringify(newData);
        localStorage.setItem('myData', jsonData);
    }
    else {
        console.log("Else");
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        i = parsedData.length + 1;
        const newData = {
            task: newTask,
            id: i
        }
        parsedData.push(newData);
        const updatedData = JSON.stringify(parsedData);
        localStorage.setItem('myData', updatedData);
    }
    window.location.href = "index.html";
})
function addList(parsedData) {
    for (let index = 0; index < parsedData.length; index++) {
        const task = parsedData[index].task;
        const id = parsedData[index].id;
        list.innerHTML += `<tr>
        <td>${task}</td>
        <td>
            <center>
                <button class="btn btn-outline-primary"><i class="bi bi-pen" id="${id}"></i></button>
                <button class="btn btn-outline-danger"><i class="bi bi-trash3" id="${id}"></i></button>
            </center>
        </td>
    </tr>`
    }
}
function deleteList(id){
    id=Number(id);
    const parsedData = JSON.parse(storedData);
    for(let index=0;index<parsedData.length;index++){
        //console.log(parsedData[index].id);
        if(parsedData[index].id==id){
            //console.log(index);
            parsedData.splice(index,1);
            const jsonData = JSON.stringify(parsedData);
            localStorage.setItem('myData', jsonData);
            window.location.href = "index.html";
        }
    }
}
function editList(id){
    id=Number(id);
    const parsedData = JSON.parse(storedData);
    const title=prompt("Edit Here");
    for(let index=0;index<parsedData.length;index++){
        //console.log(parsedData[index].id);
        if(parsedData[index].id==id){
            //console.log(index);
            parsedData[index].task=title;
            const jsonData = JSON.stringify(parsedData);
            localStorage.setItem('myData', jsonData);
            window.location.href = "index.html";
        }
    }

}
if (storedData) {
    const parsedData = JSON.parse(storedData);
    console.log(parsedData);
    addList(parsedData);
}
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const id = event.target.id;
        const clas = event.target.classList.value;
        if (clas == "bi bi-pen") {
            editList(id);
            //console.log(` Edit button with ID ${id} was clicked.`);
        }
        else {
            deleteList(id);
            //console.log(`Delete button with ID ${id} was clicked.`);
        }

    });
});
