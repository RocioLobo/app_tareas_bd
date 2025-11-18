// Base de Datos Simulada
// Esta variable simula una respuesta de tipo json desde el servidor.
let tasks= []

//Función para renderizar(acción  que realiza el servidor por una acción realizada por el usuario) tareas existentes en mi respuesta de Api.
const renderTask=()=>{
    const containerTasks=document.querySelector("#tasks")
    containerTasks.innerHTML=""
    tasks.forEach((el)=>{
        const div =document.createElement("div")
        div.className="task" + (el.done?" task-done":"")
        div.innerHTML=`
        <span>${el.text}</span>
        <div>
            <button onclick="toggleDone(${el.id})">✅</button>
            <button onclick="editTask(${el.id})">✏️</button>
            <button onclick="deleteTask(${el.id})">🗑️</button>
        </div>`

        containerTasks.appendChild(div)
    })
}

// Creando una función para agregar una tarea
const addTask=()=>{
    const input=document.querySelector("#taskInput")
    //validación para evitar espacios
    const cleanText=input.value.trim()
    //validación para evitar tareas vacías.
    if(cleanText=="") return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Se necesita agregar una tarea'
      });
    // Crear nuestro objeto.
    const newTask={
        id: Date.now(),//simular id de base de datos.
        text:cleanText,
        done:false
    }
    //agregar a mi base de datos (variable de tipo lista tasks)
    tasks.push(newTask) //usando métodos
    //tasks=[...tasks,new] //con EcmaScript6 destructuring
    //limpiar input
    input.value=""
    //renderizar.
    Swal.fire({
        title: "Tarea agregada!",
        icon: "success",
        draggable: true
      });
    renderTask()
}

//marcar tareas como completado
const toggleDone=(id) =>{
    tasks=tasks.map(el=>
        el.id === id?{...el,done:!el.done}:el
    )

    renderTask()
}

//editar una tarea
const editTask=(id)=>{
    const task=tasks.find(t=>tasks.id===id)
    const newText=prompt("Editar la tarea:",tasks.text)
    //validación
    if (newText === null || newText.trim() === "") return

//Recorrer las tareas una vez encontrado la tarea con el id indicando setear el nuevo texto.
tasks=tasks.map(el=>
    el.id === id ? {...el,text:newText}:el
)

renderTask()
}

const deleteTask=(id)=>{
    tasks=tasks.filter(t=>t.id!==id)
    renderTask()
}