import React from 'react';
import Player from './Player'
import Die from './Die'


const Game = () => {
    
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