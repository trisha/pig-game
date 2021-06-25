import React from 'react';
import Player from './Player'
import Die from './Die'


const Game = (props) => {


    let playerCards = props.players.map((player, i) => (
        <div className='player-cards'>
            <h3 className='title bold'>{i + 1}. {player}</h3>
        </div>
    ))
    
    return (
        <div>
            <p>Game Component</p>
            < Player />
            < Die />
            < Die />
        </div>
    );
}

export default Game;