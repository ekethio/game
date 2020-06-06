import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Table from "./Components/table.js";
import Player from "./Components/player.js";
import Actions from "./Components/actions.js";
import Board from "./Components/board.js";

const PORT = "http://127.0.0.1:8081";

const socket = socketIOClient(PORT);

console.log("oops");

function App() {
  const seats = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(
    Object.assign(
      {},
      seats.map((seat) => null)
    )
  );
  const [maxWager, setMaxWager] = useState(0);
  const [board, setBoard] = useState([]);
  const [name, setName] = useState("");
  const [hasCards, setHasCards] = useState(false);
  const [isActing, setIsActing] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    socket.on("welcome", ({ players, board }) => {
      setPlayers(players);

      setBoard(board);

      const currentPlayers = Object.values(players).filter(
        (player) => player !== null
      );
      const player = currentPlayers.find((player) => player.username === name);
      if (player) {
        setHasCards(player.holeCards.length === 2);
      }
    });

    socket.on("new user", ({ players, board }) => {
      setPlayers(players);

      setBoard(board);

      const currentPlayers = Object.values(players).filter(
        (player) => player !== null
      );
      const player = currentPlayers.find((player) => player.username === name);
      if (player) {
        setHasCards(player.holeCards.length === 2);
      }
    });
    socket.on('actionRequested', ({players, board, maxWager, currentPlayer})=> {
        setMaxWager(maxWager);
        setPlayers(players);
        setBoard(board);
        const currentPlayers = Object.values(players).filter(
        (player) => player !== null
          );
        const player = currentPlayers.find((player) => player.username === name);
        if (player) {
            setHasCards(player.holeCards.length === 2);
                setIsActing(player.username === currentPlayer);
                
        } 
        
    });
  });
  
  
  function add(id, name, stack) {
    setName(name);
    socket.emit("join", { seat: id - 1, name, buyin: stack });
    setHasJoined(true);
  }
  function act(type, amount){
      const action = {type, amount};
      
      socket.emit('action', {type, amount});
  
  
  }
  const player = Object.values(players).filter(player => player !== null).find( p  => p.username ===name);
  return (
    <div className="container">
    <div className="table">
      <span id="room">
        <i>
          {" "}
          <strong>EkRoom </strong>{" "}
        </i>
      </span>
     {seats.map((seat) => (
        <Player
          id={seat + 1}
          key={seat + 1}
          occupied={players[seat] !== null}
          player={players[seat]}
          add={add}
          hasJoined={hasJoined}
          name = {name}
         />

      ))}
      <Board board = {board}/>
    </div>
     
      
      <Actions act = {act} player = {player}  isThereBet ={ maxWager > 0} isActing = {isActing} maxWager = {maxWager}/>
    </div>
  );
}

export default App;
