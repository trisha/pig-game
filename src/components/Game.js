import React, { useEffect, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import Player from './Player'
import Die from './Die'

// props.players = [{ name: playerName, turnScore: 0, totalScore: 0, totalWins: 0}, {}]
// props.setPlayers
const Game = (props) => {
    var [currentPlayer, setCurrentPlayer] = useState(0)
    var [firstDie, setFirstDie] = useState(Math.floor(Math.random() * 6) + 1)
    var [secondDie, setSecondDie] = useState(Math.floor(Math.random() * 6) + 1)
    var [message, setMessage] = useState('')
    var [refreshFlag, setRefreshFlag] = useState(false) // Can probably use currentPlayer as a refresh flag.
    
    // Have to use the below so that the dice values update right after rolling.
    useEffect(() => {
    }, [refreshFlag])

    const handleDiceLogic = (first, second) => {
        let newPlayersList = props.players
        setMessage('')
        if (first === 1 && second === 1) {
            newPlayersList[currentPlayer].turnScore = 0
            newPlayersList[currentPlayer].totalScore = 0
            setMessage("You rolled two 1's, which means your total score goes to 0 and it's the next player's turn!")
            setCurrentPlayer((currentPlayer + 1) % props.players.length)
        } else if (first === 1 || second === 1) {
            setMessage("You rolled exactly one 1, which means nothing gets added to your total score and it's the next player's turn!")
            setCurrentPlayer((currentPlayer + 1) % props.players.length)
        }
        

        newPlayersList[currentPlayer].turnScore += (first + second)
        props.setPlayers(newPlayersList)
    }

    const rollDice = (e) => {
        e.preventDefault()
        let first = Math.floor(Math.random() * 6) + 1
        let second = Math.floor(Math.random() * 6) + 1
        handleDiceLogic(first, second)
        setFirstDie(first)
        setSecondDie(second)
    }

    return (
        <div>
            <p>Game Component</p>
            { props.players.map((player, i) => {
                if (i === currentPlayer) {
                    return (
                        <div>
                            {/* <h3>Current Player is:</h3> */}
                            <Player player={player} current={true} />
                        </div>
                    )
                } else {
                    return (
                    <Player player={player} current={false} />
                    )
                }
            })}
        
            <hr />
            <div>
                <b>{props.players[currentPlayer].name}</b> is the current player
                <br />
                Total score: {props.players[currentPlayer].totalScore}
                <br />
                Turn score: {props.players[currentPlayer].turnScore}
                
            </div>
            
            <hr />
            < Die value={firstDie} />
            < Die value={secondDie} />
            {message}
            <Button style={{display: 'block'}} variant="success" onClick={(e)=>rollDice(e)}>Roll the Dice!</Button>
            
            <hr />
            <h3>How to Play Pig</h3>
            - Each player rolls two 6-sided dice
            <br />
            -- if both dice are 1's (snake eyes), their total score goes to 0 and it goes on to the next player
            <br />
            -- elif one die is a 1, add nothing to their total score (regardless of their turn score) and move on to the next player
            <br />
            -- elif there are any matching numbers that aren't 1, the sum is added to the turn total (as usual) but the player MUST roll again and doesn't have the option to hold 
            <br />
            -- else (if neither dice show a 1), the sum of both dice are added to the turn total, and the player's turn continues unless they choose to hold
            <br />
            --- if a player choose to hold, then their turn ends and their turn score gets added to their total score

            - if either player reaches >= 100 points, they win and the game ends
        </div>
    );
}

export default Game;