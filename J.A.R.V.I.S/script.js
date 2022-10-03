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
    Speech.lang = 'en-IE';// ireland en
    window.speechSynthesis.speak(Speech);
}


function Saludar(){
    greetings=["hello","Hi","Hi there","Greetings","hey"]
    complements=["Im very happy to see you again","its always nice to hear you","Im very happy to hear you","How’s everything?","What’s going on?","How are you doing today?","What have you been up to?","How are you feeling today?"]
    Hablar(greetings[Math.floor(Math.random()*greetings.length)]+" sir, " + complements[Math.floor(Math.random()*complements.length)])
}

function DecirClima(){
    console.log(document.getElementById("temp").textContent)
    Hablar("Today at your location we have a temperature of "+clima.temp+" with a maximum of "+clima.tmax+" and a minimum of "+clima.tmin)
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
    if (res.includes("hello")){
        Saludar()
    }

    //clima
    if(res.includes("weather")){
        DecirClima()
    }

    //abrir youtube
    if(res.includes("open youtube")){
        Hablar("as you wish, sir")
        window.open("https://www.youtube.com/")
    }

    //buqueda de google
    if(res.includes("google search")){
        Hablar("i will search that for you on google sir!")
        res = res.split("google search")
        res = res[1].split(" ").join("+")
        window.open("https://www.google.com/search?q="+res)
    }

    //informacion
    if(res.includes("information")){
        DecirClima();
    }

    //joke
    if(res.includes("joke") || res.includes("jokes")){
        ContarChiste();
    }

    //saludo pelicula
    if(res.includes("are you there") || res.includes("are you awake")){
        Hablar("for you sir?, Always.")
    }

    //apagar
    if(res.includes("over")){
        Hablar("Okay sir i will be here if you need something else")
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