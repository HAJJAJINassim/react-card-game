import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { gamesend } from "../../Store/actions/action";
import Card from "../card/Card";
import "./game.css";
const Game = ({
    datacard,
    shuffleCards,
    actionHandlChoice,
    choiceOne,
    choiceTwo,
    actionMatched,
    actionResetTour,
    player,
    socket,
    game,
    gamesend
}) => {
    const [[hrs, mins, secs], setTime] = useState([0, 0, 60]);
    const reset = () => setTime([parseInt(0), parseInt(0), parseInt(60)]);
    const tick = () => {
        if (hrs === 0 && mins === 0 && secs === 0){
            reset()
        }
        else {
            socket.emit('getgame', { game: game._id, player: game.players[0]})
            setTime([hrs, mins, game.time]);
        }
    };
    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });
    const handlChoice = (card) => {
        actionHandlChoice(card);
    };
    const resetTurn = () => {
        actionResetTour();
    };
    // compare two card
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.name === choiceTwo.name) {
                actionMatched();
                resetTurn();
            } else {
                setTimeout(resetTurn, 1000);
            }
            socket.emit('test', { game: game._id, choiceOne: choiceOne.name, choiceTwo: choiceTwo.name })
        }
    }, [choiceOne, choiceTwo]);

    return (
        <div className="grid">
            <div>
            <p>{player.name}</p>
            <p>{`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
        </div>
            <button
                onClick={() => {
                    shuffleCards();
                }}
            >
                shuffle
            </button>
            <div className="card-grid">
                {game.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        handlChoice={handlChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                    />
                ))}
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        choiceOne: state.choiceOne,
        choiceTwo: state.choiceTwo,
        datacard: state.cards,
        game: state.game,
        player: state.player
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        shuffleCards: () => {
            dispatch({ type: "shuffle" });
        },
        actionHandlChoice: (card) => {
            dispatch({ type: "handlChoice", card: card });
        },
        actionMatched: () => {
            dispatch({ type: "matched" });
        },
        actionResetTour: () => {
            dispatch({ type: "resetTour" });
        },
        actionNewgame: (game) => {
            dispatch({ type: "newgame", game: game });
        },
        gamesend: (socket,game) => dispatch(gamesend(socket,game))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
