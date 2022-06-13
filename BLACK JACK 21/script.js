function empezarJuego() {
if(apuesta==0){alert("aposta algo rata")}
else{
    romperAnterior();
    confirmarApuesta();
    armarMazo();  
    repartir();
}
}
var mazo = armarMazo();
var manoDealer = [];
var manoJugador = [];
var sumJugador = 0;
var sumDealer = 0;
var plataJugador=5000;
document.getElementById("plata").innerText=plataJugador;
var plataJugadorRonda=0;
var apuesta=0;
var plataAdar=0;


function romperAnterior(){



    divDealer=document.getElementById("dealer")
    divJugador =document.getElementById("jugador")
    divDealer.innerHTML=""
    divJugador.innerHTML=""


    sumaDealer = document.createElement("p")
    sumaDealer.setAttribute("id", "sumaDealer");
    sumaJugador =document.createElement("p")
    sumaJugador.setAttribute("id", "sumaJugador");
    divDealer.appendChild(sumaDealer)
    divJugador.appendChild(sumaJugador)

}

function armarMazo(){
    var mazo = [];
    var palos = ["H", "D", "S", "C"];
    var valores = ["A", 2, 3, 4, 5,6, 7, 8, 9, 10, "J", "Q", "K"];

    for (let j=0; j<palos.length; j++){
        for(let i =0; i<valores.length; i++){
            mazo.push({
                palo: palos[j],
                valor: valores[i]
            });
        }
    }
    return mazo;
}
console.log(armarMazo());

function repartir(){


    for (let i = 0; i< 2; i++){
        carta=Math.floor(Math.random(mazo.length)*mazo.length);
        manoDealer.push(mazo[carta]);
        console.log(mazo[carta].valor)
        mazo.splice(carta, 1);
    }

    mostrarCartaDealer(manoDealer);
    sumarDealer(manoDealer);


    for (let i = 0; i< 2; i++){
        carta=Math.floor(Math.random(mazo.length)*mazo.length);
        manoJugador.push(mazo[carta]);//agrega la carta que aparecio ddel mazo
        mazo.splice(carta, 1);// saca la carta que salio del mazo
    }

    mostrarCartaJugador(manoJugador);
    sumarJugador(manoJugador);
    
}

function mostrarCartaDealer(manoDealer){
    let divCartasD = document.createElement("div");
    divCartasD.setAttribute("id", "cartasD")
    for(let i =0; i <manoDealer.length;i++){
    j=i+1
    let cartaDealerj = document.createElement("img");
    if(i==1){cartaDealerj.setAttribute("class", "cartaS");}
    else{cartaDealerj.setAttribute("class", "carta");}
    cartaDealerj.src = "cards/"+manoDealer[i].valor+"-"+manoDealer[i].palo+".png";
    dealer=document.getElementById("dealer");
    divCartasD.appendChild(cartaDealerj);
    dealer.appendChild(divCartasD);
    }
    document.getElementsByClassName("cartaS")[0].src="cards/back.png"
}
function mostrarCartaJugador(manoJugador){
    let divCartas = document.createElement("div");
    divCartas.setAttribute("id", "cartas")
     for(let i=0;i<manoJugador.length;i++){
        j=i+1
        let cartaJugadorj = document.createElement("img");
        cartaJugadorj.setAttribute("class", "carta");
        cartaJugadorj.src = "cards/"+manoJugador[i].valor+"-"+manoJugador[i].palo+".png";
        jugador=document.getElementById("jugador");
        divCartas.appendChild(cartaJugadorj);
        jugador.appendChild(divCartas);
    }

}
function sumarJugador(manoJugador){
    // if(manoJugador.)
    manoJugador[0].valor = conseguirValor(manoJugador[0].valor)     ;
    manoJugador[1].valor = conseguirValor(manoJugador[1].valor);
    sumJugador= (manoJugador[0].valor + manoJugador[1].valor);
    sumaJ=document.getElementById("sumaJugador");
    sumaJ.innerText= sumJugador;
}
function SumarNuevaCarta(carta){
     sumJugador += carta
}
function sumarDealer(manoDealer){
    manoDealer[0].valor = conseguirValor(manoDealer[0].valor);
    manoDealer[1].valor = conseguirValor(manoDealer[1].valor);
    sumDealer= (manoDealer[0].valor + manoDealer[1].valor);
    sumaD=document.getElementById("sumaDealer");
    sumaD.innerText= sumDealer;
}
function conseguirValor(carta){
    if(isNaN(carta)){
        if(carta=="A"){
            return carta=11
        }
        else{ return carta=10}
    }
    else{
        return carta
    }
}
function pedirCarta(){
    carta=Math.floor(Math.random(mazo.length)*mazo.length);
    manoJugador.push(mazo[carta]);
    mostrarCartaJugador(manoJugador);
    cartasAnteriores=document.getElementById("cartas");
    cartasAnteriores.remove();
    mazo[carta].valor=conseguirValor(mazo[carta].valor);
    SumarNuevaCarta(mazo[carta].valor);
    verSiAlgCpaso();
    mazo.splice(carta, 1);
    document.getElementById("sumaJugador").innerText=sumJugador
}
function verSiAlgCpaso(){
    if(sumJugador>21 ){
        document.getElementById("mensajes").innerText="te pasaste"
        document.getElementById("boton1").setAttribute("onclick", "");
        document.getElementById("boton2").setAttribute("onclick", "");
    }
        if(sumDealer>21){
        document.getElementById("mensajes").innerText="me pase xd"
        document.getElementById("boton1").setAttribute("onclick", "");
        document.getElementById("boton2").setAttribute("onclick", "");
        jugadorGana();
        
        }
        else{if(sumDealer===sumJugador){
            document.getElementById("mensajes").innerText="nashe, mi estimado"
            document.getElementById("boton1").setAttribute("onclick", "");
            document.getElementById("boton2").setAttribute("onclick", "");
        }}
    
}
function quedarse(){
    document.getElementById("boton1").setAttribute("onclick", "");
    juegaDealer();

}
function verCualEsMasAlto(){
    if(sumDealer>sumJugador ){
        document.getElementById("mensajes").innerText="te gane negro"
        document.getElementById("boton1").setAttribute("onclick", "");
        document.getElementById("boton2").setAttribute("onclick", "");
        apuesta=0
        document.getElementById("apuesta").innerText = apuesta
    }
    else{
        document.getElementById("mensajes").innerText="Ganaste negraso"
        jugadorGana();
    }
}
function jugadorGana(){
    document.getElementById("boton1").setAttribute("onclick", "");
        document.getElementById("boton2").setAttribute("onclick", "");
        apuesta=0
        document.getElementById("apuesta").innerText = apuesta
        plataJugador=plataAdar*2;
        document.getElementById("plata").innerText = plataJugador
}
function juegaDealer(){
    mostrarCartaSecreta();
    setTimeout(function(){
        if(sumDealer<sumJugador){
            pedirCartaDealer();
        }
        else{verSiAlgCpaso();}
        setTimeout(function(){
            while(sumDealer<sumJugador){
                pedirCartaDealer();  
            }
            if(sumDealer>21 || sumJugador>21 || sumDealer===sumJugador){
                verSiAlgCpaso();
            }
            else{
                verCualEsMasAlto();
            }   
        },1000)
        
    },2000)
}
function pedirCartaDealer(){
    carta=Math.floor(Math.random(mazo.length)*mazo.length);
    manoDealer.push(mazo[carta]);
    mostrarCartaDealer(manoDealer);
    cartasAnteriores=document.getElementById("cartasD");
    cartasAnteriores.remove();
    mazo[carta].valor=conseguirValor(mazo[carta].valor);
    sumDealer += mazo[carta].valor
    verSiAlgCpaso();
    mazo.splice(carta, 1);
    document.getElementById("sumaDealer").innerText=sumDealer
}
function mostrarCartaSecreta(){
    cartaS=document.getElementsByClassName("cartaS");
    cartaS[0].src = "cards/"+manoDealer[1].valor+"-"+manoDealer[1].palo+".png";
}

function apostar(cant){
    apuesta+=cant
    plataAdar=cant
    plataJugador-=cant
    verSiTienePlata();
}
function verSiTienePlata(){
    if(plataJugador<0){
        alert("no tenes mas plata")
        document.getElementById("plata").innerText = 0
        document.getElementById("linkApuesta").setAttribute("onclick", "");
    }
    else{
        document.getElementById("apuesta").innerText = apuesta
        document.getElementById("plata").innerText = plataJugador
    }
}
function confirmarApuesta(){
    document.getElementById("linkApuesta").setAttribute("onclick", "");
}

//hay que hacer la funcion conseguir valor para saber el numero de la carta