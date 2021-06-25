import React, { useEffect, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import Game from './Game'

const Home = (props) => {
    const [start, setStart]=useState(false)
    const [players, setPlayers]=useState([])
    const [playerName, setPlayerName]=useState('')
    const [refreshFlag, setRefreshFlag] = useState(false)

    // Have to use the below so that the list of current players updates after a new player is added. 
    useEffect(() => {
    }, [refreshFlag])
    
    // Edit the name that's about to be added whenever the input field values changes. 
    const editPlayerName = (e) => {
        e.preventDefault()
        setPlayerName(e.target.value)
    }
    
    // Add the player name when the user hits the 'enter' key in the input field.
    const handleEnter = (e) => {
        if (e.charCode == 13) {
            addPlayer(e)
        }
    }

    // Add the player name when the 'Add Player' button is clicked.
    const addPlayer = (e) => {
        e.preventDefault()
        if (playerName.length > 0) {
            let player = { name: playerName, turnScore: 0, totalScore: 0, totalWins: 0}
            let newPlayersList = players
            newPlayersList.push(player)
            setPlayers(newPlayersList)
            console.log("hello add comment")  
            console.log("List of players is: ", players)   
            let inputBox = document.getElementsByClassName('name-input')[0] 
            inputBox.value = ''
            setRefreshFlag(!refreshFlag)
        } 
    }
    
    const startGame = (e) => {
        setStart(true)
    }
    

    return (
        <div align='center'>
            <div>‏‏‎ ‎‎‎</div>
            <div>‏‏‎ ‎</div>
            { start ? 
                < Game players={players} setPlayers={setPlayers} />
            : 
            <div>
                <h3>Welcome to Pig!</h3>
                <div>‏‏‎ ‎</div>
                <Form.Group>
                    <Col sm={2} xs="auto">
                        <Form.Control type="text" className='name-input' placeholder="Enter player name" onChange={(e)=>{editPlayerName(e)}} onKeyPress={(e) => {handleEnter(e)}} />
                        <br />
                        <Button variant="outline-primary" type="submit" onClick={(e)=>addPlayer(e)}>Add Player</Button>
                    </Col>    
                </Form.Group>

                {/* <form >
                    <input type='text' className='name-input textbox-big box-shadow' onChange={(e)=>{editPlayerName(e)}}></input>
                    <Button variant="outline-primary" type="submit" onClick={(e)=>addPlayer(e)}>Add Player</Button>
                </form>
                 */}
                { (players.length!= 0) ? 
                    <div>
                        <h3>Current Players:</h3>
                        {players.map((player, i) => (
                            <div className='player-cards'>
                                <h3 className='title bold'>{i + 1}. {player.name}</h3>
                            </div>
                        ))}
                        
                        <Button variant="success" onClick={(e)=>startGame(e)}>Start Game!</Button>
                    </div>
                    :
                    <div></div>
                }
                
            </div>
            }
            
        </div>
    );
}

export default Home;