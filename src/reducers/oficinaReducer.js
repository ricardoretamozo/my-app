import { types } from "../types/types";

const initialState = {
    rows: []
}

export const oficinaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedOficina:
            return {
                ...state,                
                rows: [...action.payload.data],
            }

        default:
            return state;
    }

}