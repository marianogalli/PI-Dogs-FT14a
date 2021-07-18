import {
    GET_BREEDS,
    GET_BREEDS_NAME,
    GET_TEMPERAMENTS,
    GET_BREEDS_BY_TEMPERAMENT,
    GET_BREEDS_BY_SOURCE,
    GET_SORTED_BREEDS
} from '../actions/actions'

const initialState = {
    breeds: [],
    temperaments: []
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {

        case GET_BREEDS:
            
            return {
                ...state,
                breeds: action.payload
            }

        case GET_BREEDS_NAME:
            return {
                ...state,
                breeds: action.payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case GET_BREEDS_BY_TEMPERAMENT:
            return {
                ...state,
                breeds: state.breeds.filter(breed => breed.temperament.includes(action.payload))
            }

        case GET_BREEDS_BY_SOURCE: {
            if (action.payload === "API") {
                return {
                    ...state,
                    breeds: state.breeds.filter(breed => typeof breed.id == "number")
                }
            }

            if (action.payload === "DB") {
                return {
                    ...state,
                    breeds: state.breeds.filter(breed => typeof breed.id !== "number")
                }
            }
        }

        case GET_SORTED_BREEDS:
        return{
            ...state
        }


        default: return state;
    }


}





