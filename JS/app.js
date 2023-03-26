import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); //selecciona tosos los inputs del HTML

inputs.forEach ( input => { //Le agregará a cada uno de esos inputs ...
    input.addEventListener("blur", (input) => { //cuando el usuario salga del foco (de la sección donde se ubica el elemento), entonces hará la funcion
        valida(input.target); //valida esta en el otro js
    })
})