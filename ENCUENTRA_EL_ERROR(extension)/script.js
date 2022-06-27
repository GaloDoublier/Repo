let divTexto = document.getElementById("texto");
let random = Math.floor(Math.random() *86)
let letraElegidaN = "";
let letraElegidaE = "";
var dificultad = "no data";
var errores= 0;
var erroresPermitidos= 0;

document.getElementById("facil").addEventListener("click", ()=>{mostrarDificultad("facil");});
document.getElementById("medio").addEventListener("click", ()=>{mostrarDificultad("medio");})
document.getElementById("dificil").addEventListener("click", ()=>{mostrarDificultad("dificil");})
document.getElementById("empezemos").addEventListener("click", empezarJuego)

function mostrarDificultad(dificultad){
  divDificultad=document.getElementById("dificultad");
  if(dificultad=="facil"){
    divDificultad.innerHTML=" <select id='rta' class='form-select selec'><option>8 y &</option><option>8 y B</option></select>"
  erroresPermitidos=3;
  }
  else{
    if(dificultad=="medio"){
      divDificultad.innerHTML="<select id='rta' class='form-select selec'><option>I y 1</option> <option>5 y S</option> </select>"
      erroresPermitidos=2;
    }
    else{
      divDificultad.innerHTML="<select id='rta' class='form-select selec'><option>l y I</option></select>"
      erroresPermitidos=1;
    }
  }
}
function empezarJuego(){
  startTimer();
  dificultad=guardarDatos();
  contenedor= document.getElementsByClassName("container")[0];
  contenedor.remove();
  dificultad = dificultad.split(" y ")
  letraElegidaN=dificultad[0];
  letraElegidaE=dificultad[1];
  jugar();
}
var inicio
function startTimer(){
   inicio = new Date().getTime() ;
  console.log(inicio)
}
function endTimer(){
  var final = new Date().getTime() ;
  tiempo = document.getElementById("tiempo")
  tiempo.innerText="tardaste:   " + (final-inicio)/1000 + " segundos. " + "dificultad: "+ dificultad[0] + " y " + dificultad[1]
  verMejorTiempo((final-inicio)/1000);
}
function verMejorTiempo(tiempoGuardado){
  let tiempo = document.getElementById("tiempo")
  let mejorTiempo = localStorage.getItem("mejorTiempo"+" Dif " + dificultad)
  if(tiempoGuardado< mejorTiempo || mejorTiempo == null){
    localStorage.setItem("mejorTiempo"+" Dif " + dificultad, tiempoGuardado)
  }
  else{
    localStorage.setItem("mejorTiempo"+" Dif " + dificultad, mejorTiempo);
  }
  tiempo.textContent+= " mejor tiempo: " + localStorage.getItem("mejorTiempo"+" Dif " + dificultad) + " segundos"
  }

function guardarDatos(){
  rta=document.getElementById("rta").value
  return rta;
}

function verRTA(letra){
  if(letra=="escondida"){
    ganaron();
  }else{
    errores += 1;
    document.getElementById("errores").innerText="errores: "+errores
    verSiPerdio();
  }
}
function ganaron(){
  contenedor= document.getElementsByClassName("container")[0];
  contenedor.remove();
  p=document.getElementById("errores")
  p.innerText="Ganaste!"
  p.style.color="green"
  p.style.fontSize="80px"
  div = document.getElementById("volverAjugar")
  boton=document.createElement("button" )
  boton.setAttribute("class", "btn btn-warning")
  boton.textContent="volver a jugar"
  boton.addEventListener("click", () =>{
    window.location.href="popup2.html"
  })
  div.appendChild(boton)  
  endTimer();
  
}

function verSiPerdio(){
  if(errores==erroresPermitidos){
    contenedor= document.getElementsByClassName("container")[0];
    contenedor.remove();
    p = document.getElementById("errores")
    p.innerText="Perdiste :("
    p.style.fontSize="80px"
    div = document.getElementById("volverAjugar")
  boton=document.createElement("button" )
  boton.setAttribute("class", "btn btn-warning")
  boton.textContent="volver a jugar"
  boton.addEventListener("click", () =>{
    window.location.href="popup2.html"
  })
  div.appendChild(boton)  
  }
}

function jugar(){
  for(let i=0;i<=86;i++){
    if(i==random){
    let div = document.createElement("div")
    div.setAttribute("class", "col")
    let a = document.createElement("a")
    a.innerText=" "+ letraElegidaE + " "
    a.addEventListener("click", ()=>{verRTA("escondida")})
    div.appendChild(a)
    divTexto.appendChild(div)
    }
    let divParaP = document.createElement("div")
    divParaP.setAttribute("class" , "col")
    let a = document.createElement("a")
    a.innerText=" "+ letraElegidaN + " "
    a.addEventListener("click", ()=>{verRTA("normal")})
    divParaP.appendChild(a)
    divTexto.appendChild(divParaP)
}

}