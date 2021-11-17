import Game from './components/pagegame/game';
import StartPage from './components/startPage/StartPage';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
const ENDPOINT = 'http://app:3000'

function App({ game, player, actionNewgame, actionNewPlayer}) {
  const socket = socketIOClient(ENDPOINT)

  socket.on('newGame', (data) => {
    actionNewgame(data.game)
  })
  socket.on('newPlayer', (data) => {
    console.log(data)
    actionNewPlayer(data.player)
  })

  function startPageOrgamePage () {
    if(game._id) {
      return <Game socket= {socket} ></Game>
    }
    return <StartPage socket={socket}></StartPage>
  }
  return (
    <div className="App">
      {
        startPageOrgamePage()
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
      game: state.game
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      actionNewgame: (game) => {
          dispatch({ type: "newgame", game: game });
      },
      actionNewPlayer: (player) => {
        dispatch({type: 'newPlayer', player})
      }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
