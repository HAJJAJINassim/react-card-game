import game from "../../components/pagegame/game";

// const initialState = { counter: 10 }
const initialState1 = {
  cards: [
    { matched: false, name: "A-P.jpg", _id: 1 },
    { matched: false, name: "J-P.jpg", _id: 2 },
    { matched: false, name: "10-P.jpg", _id: 3 },
    { matched: false, name: "K-P.jpg", _id: 4 },
    { matched: false, name: "Q-P.jpg", _id: 5 },
  ],
  choiceOne: null,
  choiceTwo: null,
  player: {
    _id: null,
    name: null,
    flag: null,
    time: null,
    isplaying: null,
    score: null
  },
  game: {
    _id: null,
    time:null,
    cards: null,
    players: null
  }
};

export function reducer(state = initialState1, action) {
  switch (action.type) {
    case "shuffle":
      const shuffledCards = [...state.cards, ...state.cards]
        .sort(() => Math.random() - 0.5)
        .map((v) => {
          return { ...v, id: Math.random() };
        });
      return { ...state, cards: shuffledCards };
    case "handlChoice":
        return state.choiceOne ? { ...state, choiceTwo: action.card }: { ...state, choiceOne: action.card }
    case "matched": 
        const cards = state.game.cards.map((card) => {
            if(card.name === state.choiceOne.name) {
                return { ...card, matched: true }
            } else {
                return card
            }
        })
        return { ...state, game: {...state.game, cards} }
    case "resetTour":
        return {...state, choiceOne: null, choiceTwo: null}
    case "newPlayer":
        return {...state, player: {...state.player, ...action.player}}
    case "newgame":
      return { ...state, game: action.game }
    default:
      return state;
  }
}
