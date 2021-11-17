export const increment = () => {
    return {
        type :'increment',
    }
}
export const decrement = () => {
    return {
        type: 'decrement'
    }
}

export const shuffle = () => {
    return {
        type: 'shuffle'
    }
}

export const handlChoice = (card) => {
    return {
        type: 'handlChoice',
        card: card
    }
}

export const resetTour = () => {
    return {
        type: 'resetTour',
    }
}

export const matched = () => {
    return {
        type: 'matched'
    }
}

export const newgame = (game) => {
    return {
        type: 'newgame',
        game: game
    }
}

export const newplayer = (player) => {
    return {
        type: 'newPlayer',
        player: player
    }
}
/*  ------------------ASYNC---------------------- */

 export const gamesend = (socket,game) => {
	return async (dispatch) => {
        await dispatch( {type: 'matched'})
	    socket.emit('test', game)
	}	
}