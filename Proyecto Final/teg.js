//           Proyecto Final
// Solá Torino, Perez Junqueira y Parisi

var reglas = "¿Cómo jugar? \n\nPara realizar un ataque: \nLlama a la función ataque() e ingresa como parámetros el país atacante y el país defensor. \nSi conquistas un país deberás llamar inmediatamente a la función pasarFichas() e indicar como parámetro la cantidad de fichas que deseas pasarle \n\nPara enviar fichas de un país a otro: \nLlama a la función reagrupar() e ingresa como parámetros el país emisor, el país receptor y la cantidad de fichas \n\nPara agregar fichas a un país: \nLlama a la función agregarFichas() e ingresa como parámetros el país y la cantidad de fichas \n\nSi quieres volver a leer las reglas tan sólo llama a la función repetirReglas() \n\nSi quieres consultar qué paises limitan con un determinado país llama a la función consultarLimitrofes() e ingresa como parámetro el país \n\nCada vez que termines de realizar tus ataques o de agregar tus fichas llama a la función finalizarTurno() \n\n¡Buena suerte!";

var turno = 3;

var fichas1 = 7;

var fichas2 = 7;

function repetirReglas() {
  console.log(reglas)
};

function consultarLimitrofes(pais) {
  console.log(pais.limitrofes);
};

function finalizarTurno() {
  if (turno == 1) {
    turno = 2;
    console.log("Es el turno del jugador 2 de atacar");
  } else if (turno == 2) {
    turno = 3;
    console.log("Es el turno del jugador 1 de agregar fichas");
  } else if (turno == 3){
    fichas1 = jugador1.paises.length / 2;
    fichas2 = jugador2.paises.length / 2;
    turno = 4;
    console.log("Es el turno del jugador 2 de agregar fichas");
  } else if (turno == 4) {
    turno = 1;
    console.log("Es el turno del jugador 1 de atacar");
  } else {
    console.log("ERROR --> VALOR ERRÓNEO DE VARIABLE TURNO");
  }
};

function ataque(paisAtacante, paisDefensor) {
  if (paisAtacante.fichas >= 2) {
    if (paisAtacante.jugador == turno && paisDefensor.jugador != turno) {
      if (paisAtacante[limitrofes].includes(paisDefensor.nombre)) {

        let dados = [];
        let ataque = [];
        let defensa = [];
        let ultimoAtacante;
        let ultimaConquista;

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
            break;
          case 2:
            paisDefensor.fichas -= 2;
            break;
          case 1:
            if (choques == 3) {
              paisDefensor.fichas--;
              paisAtacante.fichas--;
            }
            paisDefensor.fichas--;
            break;
          case 0:
            paisDefensor.fichas--;
            paisAtacante.fichas--;
            break;
          case -1:
            if (choques == 3) {
              paisDefensor.fichas--;
              paisAtacante.fichas--;
            }
            paisAtacante.fichas--;
            break;
          case -2:
            paisAtacante.fichas -= 2;
            break;
          case -3:
            paisAtacante.fichas -= 3;
            break;
          default:
            console.log("ERROR --> SWITCH 2 ATAQUE");
        };

        if (paisDefensor.fichas == 0) {
          switch (turno) {
            case 1:
              paisDefensor.jugador = 1;
              console.log("Jugador 1, conquistaste " + paisDefensor.nombre);
              break;
            case 2:
              paisDefensor.jugador = 2;
              console.log("Jugador 2, conquistaste " + paisDefensor.nombre);
              break;
            default:
              console.log("ERROR --> SWITCH 3 ATAQUE");
          };

          ultimoAtacante = paisAtacante;
          ultimaConquista = paisDefensor
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
      ultimaConquista = undefined;
      ultimoAtacante = undefined
    }
  } else {
    console.log("No puedes pasar mas de 3 fichas");
  }
};

function reagrupar(paisEmisor, paisReceptor, cantidadFichas) {
  if (turno == paisEmisor.jugador || turno == paisEmisor.jugador + 2 && turno == paisReceptor.jugador || turno == paisReceptor.jugador + 2) {
    if (paisEmisor[limitrofes].includes(paisReceptor.nombre)) {
      if (paisEmisor.fichas > cantidadFichas) {
        paisEmisor.fichas -= cantidadFichas;
        paisReceptor.fichas += cantidadFichas;
      }
    }
  }
};

function agregarFichas(pais, cantidadFichas) {
  if (pais.jugador == turno-2) {
    if (turno == 3) {
      if (cantidadFichas <= fichas1) {
        pais.fichas += cantidadFichas;
        fichas1 -= cantidadFichas;
        console.log("Agregaste " + cantidadFichas + " fichas a " + pais.nombre)
      } else {
        console.log("No tienes esa cantidad");
      }
    } else if (turno == 4) {
      if (cantidadFichas <= fichas2) {
        pais.fichas += cantidadFichas;
        fichas2 -= cantidadFichas;
        console.log("Agregaste " + cantidadFichas + " fichas a " + pais.nombre)
      } else {
        console.log("No tienes esa cantidad");
      }
    } else {
      console.log("ERROR");
    }
  } else {
    console.log("Ese país no te pertenece");
  }
};

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
let afghanistan = new pais("Afghanistan",["Alemania", "Rusia", "China"]);
let china = new pais("China",["Rusia", "Afghanistan"]);
let marruecos = new pais("Marruecos",["Portugal", "Egipto", "Nigeria"]);
let nigeria = new pais("Nigeria",["Marruecos", "Egipto", "Somalia", "Sudáfrica"]);
let egipto = new pais("Egipto",["Marruecos", "Nigeria", "Somalia"]);
let somalia = new pais("Somalia",["Egipto", "Nigeria", "Sudáfrica"]);
let sudafrica = new pais("Sudáfrica",["Nigeria", "Somalia", "Islas Malvinas"]);

var paises = [argentina, brasil, peru, venezuela, islasMalvinas, mexico, estadosUnidos, canada, portugal, inglaterra, francia, alemania, rusia, afghanistan, china, marruecos, nigeria, egipto, somalia, sudafrica];

var jugadores = [jugador1, jugador2];

function mezclar(array){
    array.sort(()=> Math.random() - 0.5);
};

mezclar(paises);

function repartir() {
  for (var i = 0; i < 10; i++) {
  paises[i].jugador = 2
 }
};

repartir();

function asignar() {
  for (var i = 0; i < 10; i++) {
    jugador2.paises.push(paises[i].nombre);
  };

  for (var i = 10; i < 20; i++) {
    jugador1.paises.push(paises[i].nombre);
  }
};

asignar();

console.log(reglas);
console.log("Los países del jugador 1 son: " + jugador1.paises.join(", ") + "\n\nLos países del jugador 2 son: " + jugador2.paises.join(", "));
console.log("¡Comienza la partida!");
console.log("Es el turno del jugador 1 de agregar fichas");

//hola
