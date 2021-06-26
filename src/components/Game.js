import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Player from './Player'
import Die from './Die'

// props.players = [{ name: playerName, turnScore: 0, totalScore: 0, totalWins: 0}, {}]
// props.setPlayers // function for updating props.players list.
const Game = (props) => {
    var [currentPlayer, setCurrentPlayer] = useState(0)
    var [bgColor, setBgColor] = useState('orange')
    var [firstDie, setFirstDie] = useState(Math.floor(Math.random() * 6) + 1)
    var [secondDie, setSecondDie] = useState(Math.floor(Math.random() * 6) + 1)
    var [message, setMessage] = useState('')
    var [secondMessage, setSecondMessage] = useState('')
    var [choose, setChoose] = useState(false)
    var [winner, setWinner] = useState(false)
    
    // Have to use the below so that the dice values update right after rolling.
    useEffect(() => {
    }, [firstDie])

    const nextTurn = () => {
        setCurrentPlayer((currentPlayer + 1) % props.players.length)
        if (bgColor == 'orange') {
            setBgColor('pink')
        } else setBgColor('orange')
        setChoose(false)
    }

    const checkWin = () => {
        if (props.players[currentPlayer].totalScore >= 100) {
            setWinner(true)
        }
    }

    // Determines next steps based on dice results.
    const handleDiceLogic = (first, second) => {
        let newPlayersList = props.players
        setMessage('')
        setSecondMessage('')
        setChoose(false)
        if (first === 1 && second === 1) {
            newPlayersList[currentPlayer].turnScore = 0
            newPlayersList[currentPlayer].totalScore = 0
            setMessage(`You rolled two 1's, which means your total score goes to 0 and it's now ${props.players[(currentPlayer + 1) % props.players.length].name}'s turn!`)
            nextTurn()
        } else if (first === 1 || second === 1) {
            setMessage(`You rolled exactly one 1, which means nothing gets added to your total score and it's now ${props.players[(currentPlayer + 1) % props.players.length].name}'s turn!`)
            newPlayersList[currentPlayer].turnScore = 0
            nextTurn()
        } else if (first === second) {
            setMessage(`${first + second} was added to your turn score. Continue rolling.`)
            newPlayersList[currentPlayer].turnScore += (first + second)
        } else {
            setMessage("Because you got two non-matching numbers (neither of which are 1's), choose to either continue rolling, or hold.")
            setSecondMessage("Holding will end your turn but add your turn score to your total score.")
            setChoose(true)
            newPlayersList[currentPlayer].turnScore += (first + second)
        }
        props.setPlayers(newPlayersList)        
    }

    // Randomly select a number between 1 and 6 for each die.
    const rollDice = (e) => {
        e.preventDefault()
        let first = Math.floor(Math.random() * 6) + 1
        let second = Math.floor(Math.random() * 6) + 1
        // let first = 6 // For testing purposes.
        // let second = 6
        handleDiceLogic(first, second)
        setFirstDie(first)
        setSecondDie(second)
    }

    // Display this button when a player gets two non-matching dice, where neither of which is a 1. 
    const hold = () => {
        let newPlayersList = props.players
        newPlayersList[currentPlayer].totalScore += newPlayersList[currentPlayer].turnScore
        newPlayersList[currentPlayer].turnScore = 0
        props.setPlayers(newPlayersList)
        checkWin()
        setMessage(`It's now ${props.players[(currentPlayer + 1) % props.players.length].name}'s turn!`)
        setSecondMessage('')
        setChoose(false)
        nextTurn()
    }

    // Either display winner, or continue playing the game.
    let display = winner ? 
        <div>
            <b>{props.players[currentPlayer - 1].name} is the winner with a total score of {props.players[currentPlayer - 1].totalScore}!!!</b>
        </div> 
        :
        <div>
            <hr />
            <div style={{backgroundColor: `${bgColor}`}}>
                <b>{props.players[currentPlayer].name}</b> is the current player
                <br />
                Total score: {props.players[currentPlayer].totalScore}
                <br />
                Turn score: {props.players[currentPlayer].turnScore}
                
            </div>
            
            <hr />
            < Die value={firstDie} />
            < Die value={secondDie} />
            <br />
            <div>
                <b>{message}</b>
                <br />
                <b>{secondMessage}</b>
            </div>
            <br />
            <div>
                <Button style={{display: 'inline-block', marginRight: '10px'}} variant="success" onClick={(e)=>rollDice(e)}>Roll the Dice!</Button>
                {choose ? <Button style={{display: 'inline-block'}} variant="info" onClick={(e)=>hold(e)}>Hold</Button> : <div></div>}
            </div>
        </div>
    
    return (
        <div> 
            {/* Overview of player scores */}
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
            {/* Either display game or win result. */}
            {display}
            
            <hr />

            <h3>How to Play Pig Pig</h3>
            The game 'Pig Pig' is based on the timeless dice game, 'Pig,' which is traditionally played with one 6-sided die and 2 or more players.
            <br />
            However, we like to roll fast--so Pig Pig is the faster-paced version of 'Pig' with a twist 🐖 , and twice the dice!!!
            <br />
            <br />
            Each player rolls two dice at a time, where the goal is to get a total score of over 100, thereby becoming the winner and ending the game.
            <br />
            If both dice are 1's (snake eyes 🐍), your total score goes to 0 and it's the next player's turn.
            <br />
            Elif one die is a 1, nothing gets added to your total score (regardless of your turn score) and it's the next player's turn.
            <br />
            Elif there are any matching numbers that aren't 1, the sum of your roll is added to the turn total (as usual) but you MUST roll again and don't have the option to hold. 
            <br />
            Else (if neither dice show a 1 and they're not a match), the sum of both dice are added to the turn total, and the player's turn continues unless they choose to hold 💎 🙌 .
            <br />
            If a player chooses to hold, then their turn ends and their turn score gets added to their total score.
            <br />
            May you win pig! 🐷
        </div>
    );
}

export default Game;