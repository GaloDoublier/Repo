const temp = document.querySelector("#temp")
const tmax = document.querySelector("#tmax")
const tdesc = document.querySelector("#tdesc")
const tmin = document.querySelector("#tmin")
let clima ={}

async function  traerInfo() {
 fetch("https://api.openweathermap.org/data/2.5/weather?lat=-34.61&lon=-58.48&APPID=02a8f1a9d69fa43291dbdf9b927c5dcd")
  .then(res=>res.json())
  .then(data=>{
    if(data.cod=="404"){
        alert("Localidad no encontrada")
    }
    else{
    clima = {
        temp:(data.main.temp-273.15).toFixed(),
        tmax:(data.main.temp_max-273.15).toFixed(),
        tmin:(data.main.temp_min-273.15).toFixed(),
        tdesc:data.weather[0].description,
        tfoto:"http://openweathermap.org/img/w/" + data.weather[0].icon+ ".png",
    }
    temp.textContent = clima.temp+" °C";
    tmin.textContent = clima.tmin+" °C";
    tmax.textContent = clima.tmax+" °C";
    tdesc.textContent = clima.tdesc; 
    }
  })
}
traerInfo();

    // console.log(clima)


//llamar a la api por dia


// let clima=JSON.parse(localStorage.getItem("clima"));

// // let datosClima={fecha:"4/10/2022",temp:"30°",tmax:"33°",tmin:"20°",tdesc:"cloudy"}



// date=new Date()
// currentDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+ date.getFullYear();

// if(!clima || clima.fecha!=currentDate.toString()){
//     //llamar a la API

//     datosClima.fecha=currentDate;
//     localStorage.setItem("clima",JSON.stringify(datosClima))
//     console.log("actualize el clima")
// }
// else{
//     console.log("el clima esta actualizado")
// }

