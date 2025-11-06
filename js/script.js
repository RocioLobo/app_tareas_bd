// base de datos simulada
// Esta variable simula una respuesta de tipo json desde el servidor
let tasks=[]


// funcion para renderizar (accion de crear elementos en mi navegador)tareas  existentes en mi respuesta de api.
const renderTask=()=>{
    const containerTasks=document.querySelector("#tasks")
    containerTasks.innerHTML=""
    tasks.forEach((el)=>{
        const div =document.createElement("div")
        div.className="task" + (el.done?"done":"")
        div.innerHTML=`
        <span>${el.text}</span>
        <div>
            <button onclick="toggleDone(${el.id})">✅</button>
            <button onclick="editTask(${el.id})">✏</button>
            <button onclick="deletetask(${el.id}")>🗑</button> 
        </div>    
    `
        containerTasks.appendChild(div)
    })
}
// creando funcion para agregar una tarea
const addTask=()=>{
    const input=document.querySelector("#taskInput")
    //validacion para evitar espacios
    const cleanText=input.value.trim()
    // validacion para evitar tareas vacias
    if (cleanText=="") return alert("escribe una tarea delincuente")
    // crearnuestro objeto
const newTask={
    id:Date.now(), //simular id de base de datos
    text:cleanText,
    done:false
}

//agregar a mi base  de datos(variable de tipo lista tasks)
tasks.push(newTask)
//tasks = [...tasks,new] // con 6 destructurin
// renderizar
renderTask()
}

// marcatareas como completado
const toggleDone=(id)=>{
    tasks=tasks.map(el=>
        el.id === id?{...el,done:!el.done}:el
    )
    renderTask()
}