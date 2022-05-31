import { createStore,combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";
import { perfilPersonaReducer } from "../reducers/perfilPersonaReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    perfilPersona: perfilPersonaReducer
});

export const store = createStore( 
    reducers, 
    composeEnhancers(
        applyMiddleware( thunk )
    )
);