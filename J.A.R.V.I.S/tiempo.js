var currentdate = new Date(); 
dia=document.getElementById("FechaDia")
mes=document.getElementById("FechaMes")
dia.textContent=currentdate.getDate()
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
mes.textContent=monthNames[currentdate.getMonth()]

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("reloj").innerText = time;
    document.getElementById("reloj").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();


// var datetime = "Last Sync: " + currentdate.getDate() + "/"
//                 + (currentdate.getMonth()+1)  + "/" 
//                 + currentdate.getFullYear() + " @ "  
//                 + currentdate.getHours() + ":"  
//                 + currentdate.getMinutes() + ":" 
//                 + currentdate.getSeconds();