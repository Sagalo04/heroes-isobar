/**
 * Constants
 */
const initialData = {
  fetching: false,
  array: [],
  ranking: [],
};

/**
 * Types
 */
const GET_REACTIONS = "GET_REACTIONS";
const GET_REACTIONS_SUCCESS = "GET_REACTIONS_SUCCESS";
const GET_RANKING_SUCCESS = "GET_RANKING_SUCCESS";

const ADD_REACTION = "ADD_REACTION";

/**
 * Reducer
 */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_REACTIONS:
      return { ...state, fetching: true };
    case GET_REACTIONS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_RANKING_SUCCESS:
      return { ...state, ranking: action.payload, fetching: false };
    case ADD_REACTION:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

/**
 *
 * @param {Boolean} reaction boolean to define if the reaction its like or dislike
 * @param {String} id id of the character who recives the reaction
 * @param {any} currentChar all the character who recives the reaction
 * @returns
 */
export const AddReactionAction =
  (reaction, id, currentChar) => (dispatch, getState) => {
    const { array } = getState().reactions;
    let exist = true;

    for (let i = 0; i < array.length; i++) {
      if (id === array[i].id) {
        array[i] = {
          ...array[i],
          likes: reaction ? array[i].likes + 1 : array[i].likes,
          dislikes: !reaction ? array[i].dislikes + 1 : array[i].dislikes,
        };
        exist = false;
        break;
      }
    }

    if (exist) {
      const newReaction = {
        id: id,
        character: currentChar,
        likes: reaction ? 1 : 0,
        dislikes: !reaction ? 1 : 0,
      };
      array.push(newReaction);
    }

    saveStorage(getState());

    dispatch({
      type: ADD_REACTION,
      payload: array,
    });
  };

  /**
   * Get all the ranking calling the array sort
   */
export const getRankingAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_REACTIONS,
  });
  const { array } = getState().reactions;
  sortLikes(dispatch, array);
};

/**
 * function that restore the state with the storage information
 */
export const restoreReactionsAction = () => (dispatch) => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.reactions.array) {
    dispatch({
      type: GET_REACTIONS_SUCCESS,
      payload: storage.reactions.array,
    });
  }
};

/**
 * Aux Functions
 */

/**
 * Auxiliar function to save the redux state to the storage
 * @param {*} storage 
 */
const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};

/**
 * Auxiliar Function that sort the likes descending, and only uses 10
 * @param {*} dispatch 
 * @param {Array} array Array of all reaction in each character
 */
export const sortLikes = (dispatch, array) => {
  let OriginArray = [];
  array.forEach((element) => {
    OriginArray.push(element);
  });

  let arrayAux = [];
  array.forEach((element) => {
    arrayAux.push(element.likes);
  });

  let rankingAux = [];
  arrayAux.forEach((element) => {
    rankingAux.push(element);
  });

  rankingAux.sort(function (a, b) {
    return b - a;
  });

  let ranking = [];

  for (let i = 0; i < rankingAux.length; i++) {
    for (let j = 0; j < arrayAux.length; j++) {
      if (arrayAux[j] === rankingAux[i]) {
        ranking.push(OriginArray[j]);
        OriginArray.splice(j, 1);
        arrayAux.splice(j, 1);
        break;
      }
    }
  }

  dispatch({
    type: GET_RANKING_SUCCESS,
    payload: ranking.splice(0, 10),
  });
};
