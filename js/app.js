

//========= VARIABLES ==============
const taskList = document.querySelector("#lista-tareas");

//================ EVENT LISTENER=================

//funcion con todos los event listener
eventListener();

function eventListener() {
    //agregar Tareas
    document.querySelector('#formulario').addEventListener('submit', addTodo);
    // borrar Tareas
    taskList.addEventListener('click', deleteTodo);
    //Dejar cargado el DOM con lo almacenado en localstorage
    document.addEventListener('DOMContentLoaded', cargarTaskLocalStorage);


}

//=============== FUNCIONES =================

//agregar tarea
function addTodo(event) {
    event.preventDefault();

    //leer valor de textarea
    const txtTask = document.querySelector('#textarea').value;
    if (txtTask !== "") {
        //crear boton eliminar
        const btnDelete = document.createElement('a');
        btnDelete.classList = 'btn-delete'; // aniade clase al boton
        btnDelete.innerText = 'X'; //aniade inner text
        //crear li
        const li = document.createElement('li');
        li.innerText = txtTask;//aniade li a la lista-tareas -todo-
        li.appendChild(btnDelete)//aniade boton a li


        //agregar li al div lista-tareas
        taskList.appendChild(li);
        //agregar tarea al local storage
        agregarTodoLocalStorage(txtTask);

        //borra el textarea
        borrarTextarea();
    }else{
        alert("Escribe una tarea");
    }




}
//borrar tareas
function deleteTodo(event) {
    event.preventDefault();
    if (event.target.className === 'btn-delete') {
        event.target.parentElement.remove();
        borrarTaskLocalStorage(event.target.parentElement.innerText);

    }
}

//funcion agregar al local storage
function agregarTodoLocalStorage(txtTask) {
    let tasks;
    tasks = obtenerTasksLocalStorage()
    tasks.push(txtTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//funcion para comprobar que haya elementos en local storage
function obtenerTasksLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}
//funcion que carga los elementos de local storage en el DOM
function cargarTaskLocalStorage() {
    let tasks;
    tasks = obtenerTasksLocalStorage();

    tasks.forEach(function (task) {

        //crear boton eliminar
        const btnDelete = document.createElement('a');
        btnDelete.classList = 'btn-delete'; // aniade clase al boton
        btnDelete.innerText = 'X'; //aniade inner text
        //crear li
        const li = document.createElement('li');
        li.innerText = task;//aniade li a la lista-tareas -todo-
        li.appendChild(btnDelete)//aniade boton a li


        //agregar li al div lista-tareas
        taskList.appendChild(li);


    });
}
//funcion que elimina task de localstorage
function borrarTaskLocalStorage(task) {
    let tasks, taskDeleted;
    //elimina la X del task
    taskDeleted = task.substring(0, task.length - 1);

    tasks = obtenerTasksLocalStorage();
    tasks.forEach(function (task, index) {
        if (taskDeleted === task) {
            tasks.splice(index, 1);

        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//funcion borra el textarea
function borrarTextarea() {
    txtTask = document.querySelector('#textarea');
    if (txtTask.value != "") {
        txtTask.value = "";
    }

}