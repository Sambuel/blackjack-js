/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ["C","D","H","S"]
const especiales = ["A","J","Q","K"]


let puntosJugador = 0;
let puntosBot = 0;

// referencias HTML
const btnPedir = document.querySelector("#btnPedir");

const btnNuevoJuego = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector("#jugador-cartas");

const divCartasBot = document.querySelector("#bot-cartas");

const detenerJuego = document.querySelector("#btnDetener");


const puntosHTML = document.querySelectorAll("small");

const mensajeGanador = document.querySelector("#ganador")





// esta funcion crea un nuevo deck
const crearDeck = () => {

    // for para cada tipo de carta que no son especiales
    for(let i = 2; i <= 10 ; i++){
        for (let tipo of tipos)
            deck.push( i + tipo)
    }

    // for para hacer el push de las cartas especiales
    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp + tipo)
        }
    }

    // console.log(deck); // log de deck ordenado

    deck = _.shuffle(deck);
    console.log(deck);
    return deck
    

}


crearDeck();


// esta funcion me permite tomar una carta 

const pedirCarta = () => {
    
    if ( deck.length === 0){
        throw " No hay cartas del deck"
    }
    
    const carta = deck.pop()
    
    // console.log(deck);
    // console.log({carta});
    return carta; 
}




// pedirCarta();
// const valorCarta = (carta) => {

//     const valor = carta.substring(0,carta.length - 1); // es como el slacing de python
//     // 2 = 2 , 10 = 10 , 3 = 3  
//     console.log({valor});

//     let puntos = 0;
//     if( isNaN(valor)) { // evalua lo que esta en paretensis y dime si es un numero o no 
//         console.log("No es un Numero"); // si da false la condicion ejecuta este log

//         puntos = (valor === "A") ? 11 : 10;

//     } else{
//         console.log("Es un Numero");
//         puntos = Number(valor)
//     }

//     console.log({puntos});


// }

// pedirCarta();
const valorCarta = (carta) => {

    const valor = carta.substring(0,carta.length - 1 );
    return (isNaN(valor)) ? 
            (valor === "A") ? 11 : 10
            : Number(valor)

}

// logica o tuno de la computadora o bot
const turnoBot = (puntosMinimos) => {

     do{
        const carta = pedirCarta();

        puntosBot = puntosBot + valorCarta(carta)
        puntosHTML[1].innerText = puntosBot  

        const imgCarta = document.createElement("img");
        imgCarta.src =  `assets/cartas/${carta}.png`; 
        imgCarta.classList.add("carta"); 
        divCartasBot.append(imgCarta); 

        if (puntosMinimos > 21 ){
            break;
        }



    }while((puntosBot < puntosMinimos) && (puntosMinimos <= 21) );

    if(puntosBot === puntosMinimos){
        mensajeGanador.innerText = "Empate"
    }


}




// eventos

btnPedir.addEventListener("click",() => { // esto es un callback

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta)

    puntosHTML[0].innerText = puntosJugador  // en la posicion cero por que es el primer small


    // agregar cartas 
    const imgCarta = document.createElement("img");
    imgCarta.src =  `assets/cartas/${carta}.png `; // 3H , JD
    imgCarta.classList.add("carta"); // agregamos estilo
    divCartasJugador.append(imgCarta); // agregamos las cartas

    if (puntosJugador > 21){
        console.warn("Perdiste");
        btnPedir.disabled= true;
        mensajeGanador.textContent = "ha ganado el bot"
        turnoBot(puntosJugador);
    }else if (puntosJugador === 21){
        console.warn("GANASTE")
        mensajeGanador.textContent = "ha ganado el jugador"
        btnPedir.disabled= true;
        turnoBot(puntosJugador); // llamamos a la funcion computadora para que se ejecute si es que pierde o gana el jugador 
    }
});


detenerJuego.addEventListener("click", () => {
    

    btnPedir.disabled = true;
    btnNuevoJuego.disables = true;
    turnoBot(puntosJugador);
    detenerJuego.disabled = true;   

});




// Nuevo juego
btnNuevoJuego.addEventListener("click", () => {
    
    location.reload()

});

