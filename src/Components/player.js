import React, { useState } from "react";
import back from "./cards/blue_back.png";
import Empty from "./empty.js";
import Cards from "./cards.js";

function Player(props) {
  function seatPlayer() {
    const name = window.prompt("Enter name:");
    const stack = window.prompt("Enter stack: ");
    props.add(props.id, name, stack);
  }

  return !props.hasJoined ? (
    props.occupied ? (
      <div className="player" id={"player" + props.id}>
        <div className="playerInfo" id={"player" + props.id + "Info"}>
          <div id={"username" + props.id}> {props.player.username}</div>
          <div id={"stack" + props.id}>${props.player.currentStack} </div>
           <p> {props.player.currentWager}</p>
        </div>
        <Cards player={props.player} name ={props.name}/>
       
      </div>
    ) : (
      <Empty id={props.id} seatPlayer={seatPlayer} />
    )
  ) : props.occupied ? (
    <div className="player" id={"player" + props.id}>
      <div className="playerInfo" id={"player" + props.id + "Info"}>
        <div id={"username" + props.id}> {props.player.username}</div>
        <div id={"stack" + props.id}> ${props.player.currentStack} </div>
      </div>
      <Cards player={props.player} name = {props.name} />
    </div>
  ) : (
    <div className="player" id={"player" + props.id}>
      <button type="button">Empty Seat</button>
    </div>
  );
}

export default Player;
