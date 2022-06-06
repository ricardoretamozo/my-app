import { types } from "../types/types";

const initialState = {
    rows: []
}

export const personaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedPersona:
            return {
                ...state,                
                rows: [...action.payload.data],
            }

        default:
            return state;
    }

}