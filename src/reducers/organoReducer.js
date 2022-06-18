import { types } from "../types/types";

const initialState = {
    rows: []
}


export const organoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedOrgano:
            return {
                ...state,                
                rows: [...action.payload.data],
            }

        default:
            return state;
    }

}

export const organoIdReducer = ( state =  { },action ) => {

    switch (action.type) {
        case types.eventOrganoId:
            return {
                ...state,                
                 ...action.payload,
            }

        default:
            return state;
    }

}