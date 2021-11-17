import './card.css'
const Card = ({ card, handlChoice, flipped }) => {
    const handleClick = () => {
        handlChoice(card)
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped": ""}>
                <img className="front" src={"/cards/"+ card.name} alt='front'/>
                <img 
                    className="back" 
                    src={"/cards/back.jpg"} 
                    onClick={handleClick} 
                    alt='back'/>
            </div>
        </div>
    )
}
export default Card