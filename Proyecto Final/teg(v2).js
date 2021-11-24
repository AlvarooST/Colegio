//          Proyecto Final (v.2)
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
let iran = new pais("Irán",["Arabia Saudita", "China", "Afghanistan"]);
let arabiaSaudita = new pais("Arabia Saudita", ["Egipto", "Irán"]);

var jugadores = [jugador1, jugador2];

var paisesTotales = [argentina, brasil, peru, venezuela, islasMalvinas, mexico, estadosUnidos, canada, portugal, inglaterra, francia, alemania, rusia, afghanistan, china, marruecos, nigeria, egipto, somalia, sudafrica, iran, arabiaSaudita];

var objJugadores = {
  "jugador1": jugador1,
  "jugador2": jugador2
};

var objPaises = {
  "argentina": argentina,
  "brasil": brasil,
  "perú": peru,
  "venezuela": venezuela,
  "islas malvinas": islasMalvinas,
  "méxico": mexico,
  "estados unidos": estadosUnidos,
  "canadá": canada,
  "portugal": portugal,
  "inglaterra": inglaterra,
  "francia": francia,
  "alemania": alemania,
  "rusia": rusia,
  "afghanistan": afghanistan,
  "china": china,
  "marruecos": marruecos,
  "nigeria": nigeria,
  "egipto": egipto,
  "somalia": somalia,
  "sudáfrica": sudafrica,
  "irán": iran,
  "arabia saudita": arabiaSaudita
};

function mezclar(array){
    array.sort(()=> Math.random() - 0.5);
};

mezclar(paisesTotales);

function repartir() {
  for (var i = 0; i < 11; i++) {
  paisesTotales[i].jugador = 2;
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

function circulos() {
  for (var i = 0; i < 11; i++) {
    var auxcelda = "celda-" + paisesTotales[i].nombre;
    var celda = document.getElementById('celda-Brasil');
    celda.classList.add('azul');
  }
};

circulos();

function repetirReglas() {
  console.log(reglas)
};

function recordarPaises() {
  console.log(paises);
};

function consultarLimitrofes(pais) {
  console.log(pais.limitrofes);
};

function sacarDelArray ( array, pais ) {
    var i = array.indexOf( pais );
    array.splice( i, 1 );
};

//////////////////////////////////////////////////////////
function iniciar() {
  var boton = $('#iniciar')
  cambios();
  boton.prop("disabled", true)
};

function cambios() {    // al finalizar turno
  var choose = '<option selected="true" disabled>Choose country</option>'
  var dropdownAg = $('#dropdown-agregar-fichas');

  if (turno == 1 || turno == 2) {
    var dropdown = $('#dropdown-ataque1');
    var dropdown2 = $('#dropdown-ataque2');
    var dropdownEm1 = $('#dropdown-reagrupe1');
    var dropdownEm2 = $('#dropdown-reagrupe2');
    dropdownAg.prop("disabled", true);
  } else {
    var dropdown = $('#dropdown-reagrupe1');
    var dropdown2 = $('#dropdown-reagrupe2');
    var dropdownEm1 = $('#dropdown-ataque1');
    var dropdownEm2 = $('#dropdown-ataque2');
    dropdownAg.prop("disabled", false);
  };

  dropdown.empty();
  dropdown2.empty();
  dropdownEm1.empty();
  dropdownEm2.empty();
  dropdownAg.empty();
  dropdown.append(choose);
  dropdown2.append(choose);
  dropdownEm1.append(choose);
  dropdownEm2.append(choose);
  dropdownAg.append(choose);
  dropdown.prop("disabled", false);
  dropdown2.prop("disabled", false);
  dropdownEm1.prop("disabled", true);
  dropdownEm2.prop("disabled", true);

  switch (turno) {
    case 1:
    case 2:
      var aux1 = objJugadores["jugador" + turno].paises;
      for (var i = 0; i < aux1.length; i++) {
        dropdown.append('<option>' + aux1[i] + '</option>')
      };
      break;
    case 3:
    case 4:
      var aux2 = objJugadores["jugador" + (turno - 2)].paises;
      for (var i = 0; i < aux2.length; i++) {
        dropdown.append('<option>' + aux2[i] + '</option>');
        dropdownAg.append('<option>' + aux2[i] + '</option>')
      };
      if (turno == 3) {
        var auxAgregar = fichas1;
      } else {
        var auxAgregar = fichas2;
      }
      break;
    default:
      console.log("ERROR -> Función cambios()");
  };

  var numerosAgregar = $('#numero-agregar-fichas');
  numerosAgregar.prop("max", auxAgregar);
};


function dropdLimitrofes() { // on change de los dropd 1
  if (turno == 1 || turno == 2) {
    var dropdown2 = $('#dropdown-ataque2');
    var selected = document.getElementById('dropdown-ataque1').value.toLowerCase();
    console.log(selected);
  } else {
    var dropdown2 = $('#dropdown-reagrupe2');
    var selected = document.getElementById('dropdown-reagrupe1').value.toLowerCase();
    console.log(selected);
  };
  dropdown2.empty();
  dropdown2.append('<option selected="true" disabled>Choose country</option>');
  var aux = objPaises[selected].limitrofes
  switch (turno) {
    case 1:
    case 2:
      for (var i = 0; i < aux.length; i++) {
        if (!objJugadores["jugador" + turno].paises.includes(aux[i])) {
          dropdown2.append('<option>' + aux[i] + '</option>')
        }
      };
      break;
    case 3:
    case 4:
      for (var i = 0; i < aux.length; i++) {
        if (objJugadores["jugador" + (turno - 2)].paises.includes(aux[i])) {
          dropdown2.append('<option>' + aux[i] + '</option>')
        }
      };
      break;
    default:
      console.log("ERROR -> Función dropdLimitrofes()");
  }
};
//////////////////////////////////////////////////////////

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
  };
  cambios();
};

var ultimoAtacante;
var ultimaConquista;

function ataque() {
  var paisAtacante = document.getElementById('dropdown-ataque1').value.toLowerCase();
  var paisDefensor = document.getElementById('dropdown-ataque2').value.toLowerCase();
  if (objPaises[paisAtacante].fichas >= 2) {
    if (objPaises[paisAtacante].jugador == turno && objPaises[paisDefensor].jugador != turno) {
      if (objPaises[paisAtacante].limitrofes.includes(objPaises[paisDefensor].nombre)) {

        let dados = [];
        let ataque = [];
        let defensa = [];
        ultimoAtacante = objPaises[paisAtacante];
        ultimaConquista = objPaises[paisDefensor];

        if (objPaises[paisAtacante].fichas <= 4) {
          var dados1 = objPaises[paisAtacante].fichas - 1;
        } else {
          dados1 = 3;
        };

        if (objPaises[paisDefensor].fichas <= 3) {
          var dados2 = objPaises[paisDefensor].fichas;
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
            objPaises[paisDefensor].fichas -= 3;
            console.log("El defensor perdió 3 fichas");
            break;
          case 2:
            objPaises[paisDefensor].fichas -= 2;
            console.log("El defensor perdió 2 fichas");
            break;
          case 1:
            if (choques == 3) {
              objPaises[paisDefensor].fichas--;
              objPaises[paisAtacante].fichas--;
              console.log("Ambos perdieron 1 ficha");
            }
            objPaises[paisDefensor].fichas--;
            console.log("El defensor perdió 1 ficha. A " + objPaises[paisAtacante].nombre + " le quedan " + objPaises[paisAtacante].fichas + " fichas");
            break;
          case 0:
            objPaises[paisDefensor].fichas--;
            objPaises[paisAtacante].fichas--;
            console.log("Ambos perdieron 1 ficha. A " + objPaises[paisAtacante].nombre + " le quedan " + objPaises[paisAtacante].fichas + " fichas");
            break;
          case -1:
            if (choques == 3) {
              objPaises[paisDefensor].fichas--;
              objPaises[paisAtacante].fichas--;
              console.log("Ambos perdieron 1 ficha");
            }
            objPaises[paisAtacante].fichas--;
            console.log("El atacante perdió 1 ficha. A " + objPaises[paisAtacante].nombre + " le quedan " + objPaises[paisAtacante].fichas + " fichas");
            break;
          case -2:
            objPaises[paisAtacante].fichas -= 2;
            console.log("El atacante perdió 2 fichas. A " + objPaises[paisAtacante].nombre + " le quedan " + objPaises[paisAtacante].fichas + " fichas");
            break;
          case -3:
            objPaises[paisAtacante].fichas -= 3;
            console.log("El atacante perdió 3 fichas. A " + objPaises[paisAtacante].nombre + " le quedan " + objPaises[paisAtacante].fichas + " fichas");
            break;
          default:
            console.log("ERROR --> SWITCH 2 ATAQUE");
        };

        if (objPaises[paisDefensor].fichas == 0) {
          var paisConquistado = $('#pais-receptor-fichas');
          var dropdownPasar = $('#dropdown-pasar-fichas')
          var opc1 = $('#1');
          var opc2 = $('#2');
          var opc3 = $('#3');
          paisConquistado.prop("value", objPaises[paisDefensor].nombre);
          if (objPaises[paisAtacante].fichas == 2) {
            opc2.prop("disabled", true);
            opc3.prop("disabled", true)
          } else if (objPaises[paisAtacante].fichas == 3) {
            opc2.prop("disabled", false);
            opc3.prop("disabled", true)
          } else {
            opc2.prop("disabled", false);
            opc3.prop("disabled", false)
          };

          var auxcelda = "celda-" + objPaises[paisDefensor].nombre;
          var celda = document.getElementById(auxcelda);

          switch (turno) {
            case 1:
              objPaises[paisDefensor].jugador = 1;
              sacarDelArray( jugador2.paises, objPaises[paisDefensor] );
              jugador1.paises.push(objPaises[paisDefensor]);
              console.log("Jugador 1, conquistaste " + objPaises[paisDefensor].nombre + ". Recuerda utilizar la función pasarFichas()");

              celda.classList.add('rojo');
              celda.classList.remove('azul')
              break;
            case 2:
              objPaises[paisDefensor].jugador = 2;
              sacarDelArray( jugador1.paises, objPaises[paisDefensor] );
              jugador2.paises.push(objPaises[paisDefensor]);
              console.log("Jugador 2, conquistaste " + objPaises[paisDefensor].nombre + ". Recuerda utilizar la función pasarFichas()");

              celda.classList.add('azul');
              celda.classList.remove('rojo')
              break;
            default:
              console.log("ERROR --> SWITCH 3 ATAQUE");

          };
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

function pasarFichas() {
  var num = document.getElementById('dropdown-pasar-fichas').value;

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

function reagrupar() {
  var paisEmisor = document.getElementById('dropdown-reagrupe1').value.toLowerCase();
  var paisReceptor = document.getElementById('dropdown-reagrupe2').value.toLowerCase();
  var cantidadFichas = Number(document.getElementById('numero-reagrupe').value);
  console.log(objPaises[paisEmisor]);
  console.log(objPaises[paisReceptor]);
  console.log(cantidadFichas);

  var paisReagrupe = document.getElementById('dropdown-reagrupe1').value.toLowerCase();
  var auxReagrupar = objPaises[paisReagrupe].fichas - 1;
  var numerosReagrupar = $('#numero-reagrupe');
  numerosReagrupar.prop("max", auxReagrupar);

  if (turno - 2 == objPaises[paisEmisor].jugador && turno - 2 == objPaises[paisReceptor].jugador) {
    if (objPaises[paisEmisor].limitrofes.includes(objPaises[paisReceptor].nombre)) {
      if (objPaises[paisEmisor].fichas > cantidadFichas) {
        objPaises[paisEmisor].fichas -= cantidadFichas;
        objPaises[paisReceptor].fichas += cantidadFichas;
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

function agregarFichas() {
  var pais = document.getElementById('dropdown-agregar-fichas').value.toLowerCase();
  var cantidadFichas = Number(document.getElementById('numero-agregar-fichas').value);

  if (objPaises[pais].jugador == turno-2) {
    if (turno == 3) {
      if (cantidadFichas <= fichas1) {
        objPaises[pais].fichas += cantidadFichas;
        fichas1 -= cantidadFichas;
        console.log("Agregaste " + cantidadFichas + " fichas a " + objPaises[pais].nombre + ". Te quedan " + fichas1 + " fichas.")
      } else {
        console.log("No tienes esa cantidad, te quedan " + fichas1 + " fichas");
      };
      var numerosAgregar = $('#numero-agregar-fichas');
      var auxAgregar = fichas1;
      numerosAgregar.prop("max", auxAgregar);
    } else if (turno == 4) {
      if (cantidadFichas <= fichas2) {
        objPaises[pais].fichas += cantidadFichas;
        fichas2 -= cantidadFichas;
        console.log("Agregaste " + cantidadFichas + " fichas a " + objPaises[pais].nombre + ". Te quedan " + fichas2 + " fichas.")
      } else {
        console.log("No tienes esa cantidad, te quedan " + fichas2 + " fichas");
      };
      var numerosAgregar = $('#numero-agregar-fichas');
      var auxAgregar = fichas2;
      numerosAgregar.prop("max", auxAgregar);
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
cambios();
