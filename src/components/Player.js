import React from 'react';

// props.player = { name: playerName, turnScore: 0, totalScore: 0, totalWins: 0}
// props.current = true or false 
const Player = (props) => {
    
    return (
        <div>
            { props.current ? 
            <p><strong>{props.player.name}</strong>: Total score of {props.player.totalScore} </p>
            :
            <p>{props.player.name}: Total score of {props.player.totalScore}</p>
            }
        </div>
    );
}

export default Player;