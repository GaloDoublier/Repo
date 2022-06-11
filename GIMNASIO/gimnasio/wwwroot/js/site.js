// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function agregarEjercicio(){
    let divEjercicios = document.getElementById("ejercicios");
    let ejercicio = document.getElementById("ejercicio").value;
    let peso = document.getElementById("peso").value;
    let reps = document.getElementById("reps").value;
    let datos = ejercicio + " " + peso + "kg" +" " + reps + " reps";
    if(ejercicio != "" || peso != "" || reps != ""){
        let li = document.createElement("li");
        li.innerHTML = datos;
        li.setAttribute("class", "list-group-item");
        divEjercicios.appendChild(li);
    }
    else{
        alert("Debe ingresar un ejercicio");
    }
}