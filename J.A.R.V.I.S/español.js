let btnStart = document.querySelector("#arc_container")

btnStart.addEventListener("click",()=>{
    reconocedor.start()
})

const reconocedorVoz = window.SpeechRecognition || window.webkitSpeechRecognition;

const reconocedor = new reconocedorVoz();
let frenar = false;
reconocedor.onstart = function(){
}
reconocedor.onend = function(){
    if(frenar==false){
        reconocedor.start()
    }
}

reconocedor.onresult= function (e){
    var transcript =  e.results[0][0].transcript
    transcript = transcript.toLowerCase()
    console.log("jarvis escuchó: "+transcript)
        responder(transcript)
}

function Hablar(message){
    const Speech = new SpeechSynthesisUtterance(message);
    const voces = speechSynthesis.getVoices()
    console.log("Jarvis dice:  "+message)
    Speech.volume = 1; // 0 to 1
    Speech.rate = 1; // 0.1 to 10
    Speech.pitch = 0.3; //0 to 2
    Speech.lang = 'es-AR';// ireland en
    window.speechSynthesis.speak(Speech);
}


function Saludar(){
    greetings=["Hola","Hey","como esta","saludos","bienvenido"]
    complements=["estoy muy feliz de verlo otra vez","es un placer escucharlo otra vez","como va todo?","Como le esta llendo hoy?","En que ha estado trabajando?","Como se siente hoy?"]
    Hablar(greetings[Math.floor(Math.random()*greetings.length)]+" señor, " + complements[Math.floor(Math.random()*complements.length)])
}

function DecirClima(){
    console.log(document.getElementById("temp").textContent)
    Hablar("Hoy en su ubicación tenemos una temperatura de "+clima.temp+" con una máxima de "+clima.tmax+" y una mínima de "+clima.tmin)
}

async function ContarChiste(){  
    let chiste = "no encontre chiste"
    await fetch('https://v2.jokeapi.dev/joke/Programming,Dark,Pun')
        .then(response => response.json())
        .then(response => {
            if(response.setup){
                chiste = response.setup+ response.delivery
            }
            else{
                chiste=response.joke
            }
        })
        .catch(err => console.error(err));
        Hablar(chiste)
}

function responder(res){
    //saludo
    if (res.includes("hola")){
        Saludar()
    }

    //clima
    if(res.includes("clima")){
        DecirClima()
    }

    //abrir youtube
    if(res.includes("abrir youtube") || res.includes("abre youtube")|| res.includes("abrime youtube")){
        Hablar("como desee señor")
        window.open("https://www.youtube.com/")
    }

    //buqueda de google
    if((res.includes("buscar") || res.includes("búscame") || res.includes("buscá") ||res.includes("busca")) && res.includes("google")){
        Hablar("Estos es lo que encontre señor")
        res = res.split("google")
        res = res[1].split(" ").join("+")
        window.open("https://www.google.com/search?q="+res)
    }

    //informacion
    if(res.includes("hoy") && res.includes("información")){
        DecirClima();
    }

    //joke
    if(res.includes("chiste") || res.includes("chistes")){
        ContarChiste();
    }

    //apagar
    if(res.includes("descansar")){
        Hablar("De acuerdo señor, estare aqui por si me necesita")
        frenar=true
        reconocedor.stop()
    }

    //
}






//PROTOCOLOS

//PROTOCOLO ESTUDIO
document.querySelector("#studing").addEventListener("click",()=>{ProtocoloStuding()})

function ProtocoloStuding(){
    Hablar("Iniciating studing protocol...")
    setTimeout(()=>{
        window.open("https://campus.ort.edu.ar/secundaria/almagro/informatica/2022-ni5b")
    },1000)
    window.open("https://www.youtube.com/watch?v=sWtEYPva4A0")
    Hablar("Hope you have a wonderful study session sir, i would wish you luck, but you dont need it")
    
}

//PROTOCOLO SEGURIDAD
document.querySelector("#emergency").addEventListener("click",()=>{protocoloEmergencia()})

function protocoloEmergencia(){
    Hablar("Iniciating Emergency protocol...")
    let url = "https://www.youtube.com/watch?v=K1491Qq4Ch8"
    window.open(url, "_tab")
}



    window.addEventListener("load",()=>{
        reconocedor.start()
    })