//const inputNacimiento = document.querySelector("#birth"); //contsante para llamar a al id birth, se sustituye por una función que valida cada input y llama a un addeventlistenner sin tener que escribir demasiadas veces el evento
export function valida (input){ //recibirá el input
    const tipoInput = input.dataset.tipo // constante que se posiciona (dataset) en el atributo "tipo"
    if(validadores[tipoInput]){ //si dentro de validadores existe el tipo de input
        validadores[tipoInput](input);//si lo hace le pasará el patametro input
    }
    
    if(input.validity.valid){ //por otra parte si para el input en la sección validity en la sección valid (en console $0.validity)
        input.parentElement.classList.remove("input-container--invalid"); //si es true remover la clase, del div (parentElement), que se menciona  
        input.parentElement.querySelector(".input-message-error").innerHTML = "" //si es true nos posicionamos en la clase dicha y sustituimos al HTML un campo vacio 
    } else {
        input.parentElement.classList.add("input-container--invalid"); // si es false agregar la clase que se menciona al div, esta clase resalta en rojo toda la sección, dando a mostrar que el usuario no escribio ningún elemento despues e posicionarse en el input
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);//si es true nos posicionamos en la clase dicha y sustituimos al HTML según la función mostrarMensajeError 
    }
}

//Mostrar diferentes mensajes según el tipo de error con el validity

const tipoDeErrores = [ //variable tipo array con los tipos de validitys
    "valueMissing",//Cada validity es un tipo de validación que hace el navegador al ingresar o no ingresar un dato cuando el usuario se posicione en un campo
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = { //variable que contiene un objeto, recordar, un objeto es una colección de propiedad, y una propiedad es una asociación entre un (nombre) y un {valor}
    nombre: { //
        valueMissing: "El campo NOMBRE no puede estar vacio",
    },
    email: {
        valueMissing: "El campo CORREO no puede estar vacio",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo PASSWORD no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo FECHA DE NACIMIENTO no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo NÚMERO no puede estar vacio",
        patternMismatch: "El formato debe ser a 10 digitos",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe tener entre 10 y 40 caracteres",
    }
}

function mostrarMensajeError(tipoInput, input){ // función mostrarMensajeError que llama a tipoInpur e input
    let mensaje = ""; // variable 
    tipoDeErrores.forEach(error=> { //función que por cada elemento del array (forEach) llama a error que ...
        if(input.validity[error]){ // si el validity es ERROR
            console.log(error)
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoInput][error])
            mensaje = mensajesDeError[tipoInput][error] // la variable mensaje se sustituye por el texto descrito en la variable mensajeDeError segúnsu tipodeInput
        }
    })

    return mensaje; // retorna el mensaje
}

const validadores = { //que este entre comiilas esta constante significa que es un objeto
    nacimiento: input => validarNacimiento(input) //nombre del tipo que será una función que recibe input y mandará a llamar a la función validarNacimiento
};

/*inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
}); //listenet, escucha al llenar el campo (blur) realiza la función (evento) que a su vez llama a otra función llamada validar nacimiento y a su linea de codigo*/

function validarNacimiento(input){ //función que lee un input
    const fechaPersona = new Date(input.value); //realiza una variable. new Date es un elemto que retorna fecha y hora, en este caso del valor en el input seleccionado
    let mensaje = "" //variable sin datos
    if (!mayor(fechaPersona)){ //si la función mayor() NO se cumple, entonces insertar mensaje  
    mensaje = "debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje); //Esto es para que aparezca un mensaje tipo title pero al finalizar el proceso
}

function mayor(fecha){ //función que lee fecha
    const fechaHoy = new Date(); // const que tiene la fecha de hoy
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())//constante que inicia una nueva fecha la cual tiene (año de fecha indica + 18, mes de fecha indicada, dia de la fecha indicada ) 
    return(diferenciaFechas <= fechaHoy ); //si la fecha en diferencia de fechas es menor o igual a fecha hoy, devuelve ese valor

}