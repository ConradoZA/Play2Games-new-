import React from "react";

const CheckersRules = () => {
  return (
    <main className="text-modal">
      <h2>Reglas del juego de las Damas Internacionales</h2>
      <h4>También llamadas "Damas Polacas"</h4>

      <h3>Objetivo del juego</h3>
      <ul>
        <li>Capturar todas las piezas del oponente.</li>
      </ul>
      <br/>
      <p>La partida termina en tablas si:</p>
      <ul>
        <li>Se repite una misma posición tres veces seguidas.</li>
        <li>Se realizan 25 movimientos sin captura.</li>
        <li>Hay acuerdo mutuo.</li>
      </ul>
      <br/>
      <h3>Inicio de la partida</h3>
      <p>Inicia la partida el jugador que tenga las fichas blancas.</p>
      <p>
        A continuación es el turno del jugador de fichas negras (en este caso rojas, al estilo anglosajón, para un mayor contraste con el tablero), y a partir de ahí se va alternando un movimiento cada jugador.
      </p>
      <br />
      <h3>Movimiento de las piezas</h3>
      <p>Hay dos tipos de piezas con sus propias reglas de movimiento y captura:</p>
      <ol>
        <li>
         <b>Peones:</b>
          <br />
          El único tipo de pieza al inicio de la partida.
          <br />
          Se pueden mover una casilla en diagonal hacia adelante, siempre y cuando ésta esté vacía.
          <br />
          Si terminan su movimiento en el otro extremo del tablero, se coronan como dama.
        </li>
        <li>
         <b>Damas:</b>
          <br />
          Pueden mover en diagonal, hacia adelante y hacia atrás, la cantidad de
          casillas que deseen, sin atravesar una pieza propia y terminando en una casilla vacía.
        </li>
      </ol>
      <br />
      <br />
      <h3>Capturas</h3>
      <ol>
        <li>
        <b>Peones:</b>
          <br />
          Como su movimiento si dicha casilla está ocupada por una pieza del
          oponente. Salta por encima de ésta, y cae en la casilla inmediatamente
          posterior en el sentido de la captura.
          <br />
          La captura sólo se puede realizar si esta casilla posterior está libre.
        </li>
        <li>
        <b>Damas:</b>
          <br />
          La dama captura una pieza enemiga si a lo largo de su movimiento atraviesa su posición.
          <br />
          La pieza capturada no tiene por qué estar adyacente ni la dama tiene por qué terminar su movimiento inmediatamente detrás de ésta.
          <br />
          Eso sí, no se pueden capturar dos piezas en un mismo movimiento y se deben respetar las limitaciones de movimiento normales (no atravesar piezas propias y terminar en una casilla vacía)
        </li>
      </ol>
      <br />
      <h3>Capturas Forzadas y Encadenadas</h3>
      <p>
        En todos los casos, si al inicio del turno hay una o más piezas que tienen la posibilidad de capturar, el jugador está <b>forzado</b> a realizar la captura. En caso de que haya más de una posibilidad, el jugador puede elegir.
      </p>
      <p>
        En todos los casos, si al finalizar una captura la pieza tiene la posibilidad de capturar desde su nueva posición, <b>debe</b> realizar la captura. Esta es la única manera de encadenar varios movimientos en un solo turno.
      </p>
    </main>
  );
};

export default CheckersRules;
