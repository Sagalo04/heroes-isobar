import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import charactersReducer from "reduxDucks/charactersDuck";
import likesReducer,{restoreReactionsAction} from "reduxDucks/likesDuck"

import thunk from "redux-thunk";

/**
 * Reducers
 */

 let rootReducer = combineReducers({
    characters: charactersReducer,
    reactions: likesReducer
  });
  
  /**
 * Devtools
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Store
 */
export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  restoreReactionsAction()(store.dispatch)
  return store;
}