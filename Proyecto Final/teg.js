//           Proyecto Final
// Solá Torino, Perez Junqueira y Parisi

var reglas = "¿Cómo jugar? \n\nPara realizar un ataque: \nLlama a la función ataque() e ingresa como parámetros el país atacante y el país defensor. \nSi conquistas un país deberás llamar inmediatamente a la función pasarFichas() e indicar como parámetro la cantidad de fichas que deseas pasarle \n\nPara enviar fichas de un país a otro: \nLlama a la función reagrupar() e ingresa como parámetros el país emisor, el país receptor y la cantidad de fichas \n\nPara agregar fichas a un país: \nLlama a la función agregarFichas() e ingresa como parámetros el país y la cantidad de fichas \n\nSi quieres volver a leer las reglas tan sólo llama a la función repetirReglas() \n\nSi quieres consultar qué paises limitan con un determinado país llama a la función consultarLimitrofes() e ingresa como parámetro el país \n\nCada vez que termines de realizar tus ataques o de agregar tus fichas llama a la función finalizarTurno() \n\n¡Buena suerte!";

var turno = 3;

var fichas1 = 7;

var fichas2 = 7;

var jugador1 = {
  paises: [],
};

var jugador2 = {
  paises: [],
};

class pais {
  constructor(nombre,limitrofes){
    this.nombre = nombre;
    this.jugador = 1;
    this.fichas = 1;
    this.limitrofes = limitrofes
  }
};

let argentina = new pais("Argentina",["Perú", "Brasil", "Islas Malvinas"]);
let brasil = new pais("Brasil",["Perú", "Venezuela", "Argentina"]);
let peru = new pais("Perú",["Venezuela", "Brasil", "Argentina"]);
let venezuela = new pais("Venezuela",["Perú", "Brasil", "México"]);
let islasMalvinas = new pais("Islas Malvinas",["Argentina", "Sudáfrica"]);
let mexico = new pais("México",["Estados Unidos", "Venezuela"]);
let estadosUnidos = new pais("Estados Unidos",["Canadá", "México"]);
let canada = new pais("Canadá",["Estados Unidos", "Rusia"]);
let portugal = new pais("Portugal",["Inglaterra", "Francia", "Marruecos"]);
let inglaterra = new pais("Inglaterra",["Portugal", "Francia"]);
let francia = new pais("Francia",["Portugal", "Inglaterra", "Alemania"]);
let alemania = new pais("Alemania",["Francia", "Rusia", "Afghanistan"]);
let rusia = new pais("Rusia",["Alemania", "Canadá", "Afghanistan", "China"]);
let afghanistan = new pais("Afghanistan",["Alemania", "Rusia", "China", "Irán"]);
let china = new pais("China",["Rusia", "Afghanistan", "Irán"]);
let marruecos = new pais("Marruecos",["Portugal", "Egipto", "Nigeria"]);
let nigeria = new pais("Nigeria",["Marruecos", "Egipto", "Somalia", "Sudáfrica"]);
let egipto = new pais("Egipto",["Marruecos", "Nigeria", "Somalia", "Arabia Saudita"]);
let somalia = new pais("Somalia",["Egipto", "Nigeria", "Sudáfrica"]);
let sudafrica = new pais("Sudáfrica",["Nigeria", "Somalia", "Islas Malvinas"]);
let iran = new pais("Irán",["Arabia Saudita", "China", "Afghanistan"])
let arabiaSaudita = new pais("Arabia Saudita", ["Egipto", "Irán"])

var paisesTotales = [argentina, brasil, peru, venezuela, islasMalvinas, mexico, estadosUnidos, canada, portugal, inglaterra, francia, alemania, rusia, afghanistan, china, marruecos, nigeria, egipto, somalia, sudafrica, iran, arabiaSaudita];

var jugadores = [jugador1, jugador2];

function mezclar(array){
    array.sort(()=> Math.random() - 0.5);
};

mezclar(paisesTotales);

function repartir() {
  for (var i = 0; i < 11; i++) {
  paisesTotales[i].jugador = 2
 }
};

repartir();

function asignar() {
  for (var i = 0; i < 11; i++) {
    jugador2.paises.push(paisesTotales[i].nombre);
  };

  for (var i = 11; i < 22; i++) {
    jugador1.paises.push(paisesTotales[i].nombre);
  }
};

asignar();

function repetirReglas() {
  console.log(reglas)
};

function recordarPaises() {
  console.log(paises);
}

function consultarLimitrofes(pais) {
  console.log(pais.limitrofes);
};

function sacarDelArray ( array, pais ) {
    var i = array.indexOf( pais );
    array.splice( i, 1 );
};

function finalizarTurno() {
  if (turno == 1) {
    turno = 2;
    console.log("Es el turno del jugador 2 de atacar");
  } else if (turno == 2) {
    fichas1 = jugador1.paises.length / 2;
    fichas2 = jugador2.paises.length / 2;
    turno = 3;
    console.log("Es el turno del jugador 1 de agregar fichas");
  } else if (turno == 3) {
    turno = 4;
    console.log("Es el turno del jugador 2 de agregar fichas");
  } else if (turno == 4) {
    turno = 1;
    console.log("Es el turno del jugador 1 de atacar");
  } else {
    console.log("ERROR --> VALOR ERRÓNEO DE VARIABLE TURNO");
  }
};

var ultimoAtacante;
var ultimaConquista;

function ataque(paisAtacante, paisDefensor) {
  if (paisAtacante.fichas >= 2) {
    if (paisAtacante.jugador == turno && paisDefensor.jugador != turno) {
      if (paisAtacante.limitrofes.includes(paisDefensor.nombre)) {

        let dados = [];
        let ataque = [];
        let defensa = [];
        ultimoAtacante = paisAtacante;
        ultimaConquista = paisDefensor;

        if (paisAtacante.fichas <= 4) {
          var dados1 = paisAtacante.fichas - 1;
        } else {
          dados1 = 3;
        };

        if (paisDefensor.fichas <= 3) {
          var dados2 = paisDefensor.fichas;
        } else {
          dados2 = 3;
        };

        dadosTotal = dados1 + dados2;

        for (var i = 0; i < dadosTotal; i++) {
          dados.push(Math.floor((Math.random() * 6) + 1));
        };

        for (var i = 0; i < dados1; i++) {
          ataque.push(dados[i])
        };

        for (var i = dados1; i < dadosTotal; i++) {
          defensa.push(dados[i])
        };

        ataque.sort(function(a, b){return b - a});
        defensa.sort(function(a, b){return b - a});

        let choques;
        let resultado = 0;

        if (dados1 == 1 || dados2 == 1) {
          choques = 1
        } else if (dados1 == 2 || dados2 == 2) {
          choques = 2
        } else if (dados1 == 3 && dados2 == 3) {
          choques = 3
        } else {
          console.log("ERROR --> DADOS ATAQUE");
        }

        switch (choques) {
          case 3:
            if (ataque[2] > defensa[2]) {
              resultado++
            } else {
              resultado--
            }
          case 2:
            if (ataque[1] > defensa[1]) {
              resultado++
            } else {
              resultado--
            }
          case 1:
            if (ataque[0] > defensa[0]) {
              resultado++
            } else {
              resultado--
            }
            break;
          default:
            console.log("ERROR --> SWITCH 1 ATAQUE");
        };

        switch (resultado) {
          case 3:
            paisDefensor.fichas -= 3;
            console.log("El defensor perdió 3 fichas");
            break;
          case 2:
            paisDefensor.fichas -= 2;
            console.log("El defensor perdió 2 fichas");
            break;
          case 1:
            if (choques == 3) {
              paisDefensor.fichas--;
              paisAtacante.fichas--;
              console.log("Ambos perdieron 1 ficha");
            }
            paisDefensor.fichas--;
            console.log("El defensor perdió 1 ficha. A " + paisAtacante.nombre + " le quedan " + paisAtacante.fichas + " fichas");
            break;
          case 0:
            paisDefensor.fichas--;
            paisAtacante.fichas--;
            console.log("Ambos perdieron 1 ficha. A " + paisAtacante.nombre + " le quedan " + paisAtacante.fichas + " fichas");
            break;
          case -1:
            if (choques == 3) {
              paisDefensor.fichas--;
              paisAtacante.fichas--;
              console.log("Ambos perdieron 1 ficha");
            }
            paisAtacante.fichas--;
            console.log("El atacante perdió 1 ficha. A " + paisAtacante.nombre + " le quedan " + paisAtacante.fichas + " fichas");
            break;
          case -2:
            paisAtacante.fichas -= 2;
            console.log("El atacante perdió 2 fichas. A " + paisAtacante.nombre + " le quedan " + paisAtacante.fichas + " fichas");
            break;
          case -3:
            paisAtacante.fichas -= 3;
            console.log("El atacante perdió 3 fichas. A " + paisAtacante.nombre + " le quedan " + paisAtacante.fichas + " fichas");
            break;
          default:
            console.log("ERROR --> SWITCH 2 ATAQUE");
        };

        if (paisDefensor.fichas == 0) {
          switch (turno) {
            case 1:
              paisDefensor.jugador = 1;
              sacarDelArray( jugador2.paises, paisDefensor );
              jugador1.paises.push(paisDefensor);
              console.log("Jugador 1, conquistaste " + paisDefensor.nombre + ". Recuerda utilizar la función pasarFichas()");
              break;
            case 2:
              paisDefensor.jugador = 2;
              sacarDelArray( jugador1.paises, paisDefensor );
              jugador2.paises.push(paisDefensor);
              console.log("Jugador 2, conquistaste " + paisDefensor.nombre + ". Recuerda utilizar la función pasarFichas()");
              break;
            default:
              console.log("ERROR --> SWITCH 3 ATAQUE");
          };
//retirar el país conquistado de un array y meterlo en el otro
//jugador1.paises y jugador2.paises
        }
      } else {
        console.log("Esos paises no son limitrofes");
      }
    } else {
      console.log("No es tu turno o Estas atacando a tu propio país");
    }
  } else {
    console.log("El país no cuenta con fichas suficientes para atacar");
  }
};

function pasarFichas(num) {
  if (num <= 3) {
    if (num < ultimoAtacante.fichas) {
      ultimaConquista.fichas = num;
      ultimoAtacante.fichas -= num;
      console.log("Pasaste " + num + " fichas de " + ultimoAtacante.nombre + " a " + ultimaConquista.nombre + ". A " + ultimoAtacante.nombre + " le quedan " + ultimoAtacante.fichas + " fichas y a " + ultimaConquista.nombre + " le quedan " + ultimaConquista.fichas + " fichas.");
      ultimaConquista = undefined;
      ultimoAtacante = undefined
    }
  } else {
    console.log("No puedes pasar más de 3 fichas");
  }
};

function reagrupar(paisEmisor, paisReceptor, cantidadFichas) {
  if (turno == paisEmisor.jugador || turno == paisEmisor.jugador + 2 && turno == paisReceptor.jugador || turno == paisReceptor.jugador + 2) {
    if (paisEmisor.limitrofes.includes(paisReceptor.nombre)) {
      if (paisEmisor.fichas > cantidadFichas) {
        paisEmisor.fichas -= cantidadFichas;
        paisReceptor.fichas += cantidadFichas;
      } else {
        console.log("No cuentas con esa cantidad de fichas");
      }
    } else {
      console.log("Esos paises no son limítrofes");
    }
  } else {
    console.log("Alguno de los 2 paises no es tuyo");
  }
};

function agregarFichas(pais, cantidadFichas) {
  if (pais.jugador == turno-2) {
    if (turno == 3) {
      if (cantidadFichas <= fichas1) {
        pais.fichas += cantidadFichas;
        fichas1 -= cantidadFichas;
        console.log("Agregaste " + cantidadFichas + " fichas a " + pais.nombre + ". Te quedan " + fichas1 + " fichas.")
      } else {
        console.log("No tienes esa cantidad, te quedan " + fichas1 + " fichas");
      }
    } else if (turno == 4) {
      if (cantidadFichas <= fichas2) {
        pais.fichas += cantidadFichas;
        fichas2 -= cantidadFichas;
        console.log("Agregaste " + cantidadFichas + " fichas a " + pais.nombre + ". Te quedan " + fichas2 + " fichas.")
      } else {
        console.log("No tienes esa cantidad, te quedan " + fichas2 + " fichas");
      }
    } else {
      console.log("Sólo puedes reagrupar en el momento de agregar fichas");
    }
  } else {
    console.log("Ese país no te pertenece");
  }
};

var paises = "Los países del jugador 1 son: " + jugador1.paises.join(", ") + "\n\nLos países del jugador 2 son: " + jugador2.paises.join(", ");

console.log(reglas);
console.log(paises);
console.log("¡Comienza la partida!");
console.log("Es el turno del jugador 1 de agregar fichas");

//hola
//Math.floor((Math.random() * 6) + 1)
