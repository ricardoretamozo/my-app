import { types } from "../types/types";

const initialState = {
    rows: []
}

export const sedeReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedSede:
            return {
                ...state,                
                rows: [...action.payload.data],
            }

        default:
            return state;
    }

}