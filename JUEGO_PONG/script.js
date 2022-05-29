function juego(){
 let tiempo= 30;
 let movimiento=10;
 let puntosp1=0;
 let puntosp2=0;
 let movimientoBar=20;
 let width = document.documentElement.clientWidth - movimiento;
 let height = document.documentElement.clientHeight - movimiento;
 let controlJuego;
 let player1,player2;

    function start(){
        init();
        //va ejecutando la funcion play cada la variablñe tiempo(en milisegundos)
        controlJuego = setInterval(play, tiempo)

    }

    function init(){
        ball.style.left=0;
        ball.state = 1;
        ball.direction = 1; //1 derecha 2 izquierda
        player1 = new Object();
        player2 = new Object();
        player1.nombre="jugador1"
        player2.nombre="jugador2"
        player1.keypress = false;
        player1.keyCode = null;
        player2.keypress= false;
        player2.keyCode=null;
        movimiento=10;

    }
     function play(){
        moverPelota();
        moverBarra();
        punto();
        Terminar();
     }
     function Terminar(){
         if(puntosp1==5){
            stop(player1);
         }
         if(puntosp2==5){
             stop(player2);
         }
     }
     function reiniciar(){
        ball.style.left= "100px";
        ball.style.top="20px"
        ball.state = 1;
        ball.direction = 1;
        player1.keypress = false;
        player1.keyCode = null;
        player2.keypress= false;
        player2.keyCode=null;
        movimiento=10;
     }

     function punto(){
        if(ball.offsetLeft >= width){
            PuntoGanado(1);
            console.log("punto player 1");
            reiniciar();
        }
        if(ball.offsetLeft <= 0){
            PuntoGanado(2);
            console.log("punto player 2");
            reiniciar();
        }
        
     }
     function PuntoGanado(puntoPara){
         if(puntoPara==1)
         {
            puntosp1+=1
            puntos1.innerText=puntosp1
         }
         if(puntoPara==2)
         {
            puntosp2+=1
            puntos2.innerText=puntosp2
         }
     }

     function moverPelota(){
        checkStateBall();
        switch(ball.state){
            case 1: // derecha, abajo
                ball.style.left = (ball.offsetLeft + movimiento) +"px";
                ball.style.top = (ball.offsetTop + movimiento) +"px";
                break;
            case 2: // derecha, arriba
                ball.style.left = (ball.offsetLeft + movimiento) +"px";
                ball.style.top = (ball.offsetTop - movimiento) +"px";
                break;
            case 3: // izquierda, abajo
                ball.style.left = (ball.offsetLeft - movimiento) +"px";
                ball.style.top = (ball.offsetTop + movimiento) +"px";
                break;
            case 4: // izquierda, arriba
                ball.style.left = (ball.offsetLeft - movimiento) +"px";
                ball.style.top = (ball.offsetTop - movimiento) +"px";
                break;
        }
    }

    function checkStateBall(){

            if(colisionarPlayer2()){
                ball.direction = 2;
                if(ball.state ==1) ball.state=3;
                if(ball.state ==2) ball.state=4;
            }else if(colisionarPlayer1()){
                ball.direction = 1;
                if(ball.state ==3) ball.state=1;
                if(ball.state ==4) ball.state=2;
            }


            if(ball.direction ===1){
                if(ball.offsetTop>=height) ball.state=2;
                else if(ball.offsetTop <=0) ball.state=1;
            }else{
                if(ball.offsetTop>=height) ball.state=4;
                else if(ball.offsetTop <=0) ball.state=3;
        }
    }   

    function colisionarPlayer1(){
        if(ball.offsetLeft <= (bar1.clientWidth) &&
           ball.offsetTop >= bar1.offsetTop &&
           ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)){
            movimiento+=2
            return true;
        }

        return false;
    }
    function colisionarPlayer2(){
        if(ball.offsetLeft >= (width-bar2.clientWidth) &&
           ball.offsetTop >= bar2.offsetTop &&
           ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)){
            movimiento+=2
            return true;
        }

        return false;
    }

     function moverBarra(){
        if(player1.keyPress){
            if(player1.keyCode==87 && bar1.offsetTop >=0){
                bar1.style.top = (bar1.offsetTop - movimientoBar) + "px"; //recibe el top que ya tiene le div y le resta 20px mas de movimietno
            }
            if(player1.keyCode==83 && (bar1.offsetTop + bar1.clientHeight)<=height){
                bar1.style.top = (bar1.offsetTop + movimientoBar) + "px"; //recibe el top que ya tiene le div y le suma 20px mas de movimietno
            }
        }
        if(player2.keyPress){
            if(player2.keyCode==80 && bar2.offsetTop >=0){
                bar2.style.top = (bar2.offsetTop - movimientoBar) + "px"; //recibe el top que ya tiene le div y le resta 20px mas de movimietno
            }
            if(player2.keyCode==76 && (bar2.offsetTop + bar2.clientHeight)<=height){
                bar2.style.top = (bar2.offsetTop + movimientoBar) + "px"; //recibe el top que ya tiene le div y le suma 20px mas de movimietno
            }
        }
     }

     document.onkeydown = function(e){
         tecla=e
        switch(tecla.keyCode){
            case 87: //w
            case 83: //s
                player1.keyCode = tecla.keyCode;
                player1.keyPress = true;
            case 80: //arriba
            case 76: //abajo
                player2.keyCode = tecla.keyCode;
                player2.keyPress = true;
            break;
        }
     }
     document.onkeyup = function(e){
         tecla=e
        if(tecla.keyCode == 87 || tecla.keyCode == 83){
            player1.keyPress = false;
        }
        if(tecla.keyCode == 80 || tecla.keyCode == 76){
            player2.keyPress = false;
        }
     }
     //w= 87 s=83 arriba=38 abajo=40
     function stop(ganador){
         clearInterval(controlJuego);
         Swal.fire({
            title: puntos1.innerText="El ganador es: " + ganador.nombre,
            background: '#2d2e30',
            confirmButtonColor: '#6a6b6e',
          })
        linea.style.display="none"
        puntos2.innerText=""
        ball.style.display="none"
         //hacer una alert con my sweet alert 2 pque diga game over
     }
    start();
}
juego()