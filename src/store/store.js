import { createStore,combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";
import { oficinaReducer } from "../reducers/oficinaReducer";
import { organoReducer, organoIdReducer } from "../reducers/organoReducer";
import { perfilPersonaReducer } from "../reducers/perfilPersonaReducer";
import { sedeReducer } from "../reducers/sedeReducer";
import { personaReducer } from "../reducers/personaReducer";
import { cargoReducer } from "../reducers/cargoReducer";
import { validadorUsuarioReducer } from "../reducers/validadorUsuario";
import { incidenciaReducer } from "../reducers/incidenciaReducer";
import { motivoReducer } from "../reducers/motivoReducer";
import { personaOrganoReducer } from "../reducers/personaOrganoReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    perfilPersona: perfilPersonaReducer,
    sede: sedeReducer,
    organo: organoReducer,
    oficina: oficinaReducer,
    persona: personaReducer,
    cargo: cargoReducer,
    usuarioDni: validadorUsuarioReducer,
    organoId: organoIdReducer,
    incidencia: incidenciaReducer,
    personaOrgano: personaOrganoReducer,
    motivo: motivoReducer,
});

export const store = createStore( 
    reducers, 
    composeEnhancers(
        applyMiddleware( thunk )
    )
);