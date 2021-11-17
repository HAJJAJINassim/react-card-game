import './startpage.css';
import { useState } from 'react';

const StartPage = ({socket}) => {
    const [name, setName] = useState('')

    const newPlayer = () => {
        socket.emit('player', {name: name})
    }
    const handleChange = function(event) {
        setName(event.target.value)
      }
    return (
        <div className="main">
            <div className="panel">
                <input className="panel-username" onChange={handleChange} type="text" placeholder="Your name.."></input>
                <button className="panel-start" onClick={() => {newPlayer()}}>start</button>
            </div>
        </div>
    )
}
export default StartPage