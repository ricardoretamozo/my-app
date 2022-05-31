import { types } from "../types/types";

const initialState = {
    rows: []
}

export const perfilPersonaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedPerfil:
            return {
                ...state,                
                rows: [...action.payload.data],
            }

        default:
            return state;
    }

}