var datos = ["hola"];
var texto = document.getElementById("texto1");
var texto2 = document.getElementById("texto2");
axios({
    method: 'get',
    url: 'https://would-you-rather-api.abaanshanid.repl.co/',
  }).then(response => {
    datos = response.data.data;
   datos = datos.split("Would you rather")[1];
    datos = datos.split(" or ");
   texto.innerText=datos[0];
   texto2.innerText=datos[1];
  })

document.getElementById("opcion").addEventListener("click", seleccionado);
document.getElementById("opcion2").addEventListener("click", seleccionado);

function seleccionado(){
    document.getElementById("opcion").removeEventListener("click", seleccionado);
    document.getElementById("opcion2").removeEventListener("click", seleccionado);
   let random1 = Math.floor(Math.random() * 100);
   let random2= 100 - random1
   texto.innerText=datos[0];
   texto2.innerText=datos[1];
    animacionNumero(0,random1,texto);
    animacionNumero(0,random2,texto2);
    recargarPagina();
}
function animacionNumero(numero, objetivo, NumeroEnTexto){
    if (numero <= objetivo){
        NumeroEnTexto.innerText = numero + "%";
        numero++;
        setTimeout(function(){animacionNumero(numero,objetivo,NumeroEnTexto)},20);  
        }
}
function recargarPagina(){
    setTimeout(function(){location.reload()},4000);
}