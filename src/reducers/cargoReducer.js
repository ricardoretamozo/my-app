import { types } from "../types/types";

const initialState = {
    rows: []
}

export const cargoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedCargo:
            return {
                ...state,                
                rows: [...action.payload.data],
            }

        default:
            return state;
    }

}