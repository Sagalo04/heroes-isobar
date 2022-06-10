import { URL, HASH, APIKEY } from "constants/constants";

/**
 * Constants
 */
const initialData = {
  fetching: false,
  array: [],
  current: {},
  total: 0,
};

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_ERRROR = "GET_CHARACTERS_ERRROR";

const GET_CHARACTER = "GET_CHARACTER";
const GET_CHARACTER_SUCCESS = "GET_CHARACTER_SUCCESS";
const GET_CHARACTER_ERRROR = "GET_CHARACTER_ERRROR";

/**
 * Reducer
 */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        array: action.payload[0],
        fetching: false,
        total: action.payload[1],
      };
    case GET_CHARACTERS_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_CHARACTER:
      return { ...state, fetching: true };
    case GET_CHARACTER_SUCCESS:
      return { ...state, current: action.payload, fetching: false };
    case GET_CHARACTER_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

/**
 * Actions (thunk)
 */

/**
 * Fetch 9 characters by page
 * @param {number} page number of page to fetch
 */
export const getCharactersAction = (page) => (dispatch,getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });
  return fetch(
    `${URL}?ts=1000&limit=9&offset=${page * 9}&apikey=${APIKEY}&hash=${HASH}`
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: [data.data.results, data.data.total],
      });
      saveStorage(getState());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CHARACTERS_ERRROR,
        payload: err,
      });
    });
};

/**
 * Fetch just a single character by id
 * @param {number} id id of the character to fetch
 */
export const getSingleCharacterAction = (id) => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTER,
  });
  return fetch(`${URL}/${id}?ts=1000&apikey=${APIKEY}&hash=${HASH}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_CHARACTER_SUCCESS,
        payload: data.data.results[0],
      });
      saveStorage(getState());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CHARACTER_ERRROR,
        payload: err,
      });
    });
};

/**
 * Aux Functions
 */

/**
 * Auxiliar function to save the redux state to the storage
 * @param storage 
 */
const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};
