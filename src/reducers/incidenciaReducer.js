import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const incidenciaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedIncidencia:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}