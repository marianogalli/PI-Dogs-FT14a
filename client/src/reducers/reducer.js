import {
    GET_BREEDS,
    GET_BREEDS_NAME,
    GET_TEMPERAMENTS,
    GET_BREEDS_BY_TEMPERAMENT,
    GET_BREEDS_BY_SOURCE,
    GET_SORTED_BREEDS,
    CLEAR_FILTERS
} from '../actions/actions'
import {getSort} from '../helpers/helpers'

const initialState = {
    breeds: [],// pueden ser todas o filtradas
    data:[],//toooodas las razas
    temperaments: []
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {

        case GET_BREEDS:
            
            return {
                ...state,
                data:action.payload,
                breeds: action.payload
            }

        case GET_BREEDS_NAME:
            return {
                ...state,
                data:action.payload,
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
                breeds: state.data.filter(breed => breed.temperament.includes(action.payload))
            }

        case GET_BREEDS_BY_SOURCE: {
            if (action.payload === "API") {
                return {
                    ...state,
                    breeds: state.data.filter(breed => typeof breed.id == "number")
                }
            }else{
                return {
                    ...state,
                    breeds: state.data.filter(breed => typeof breed.id !== "number")
                }
            }
        }
                
        case GET_SORTED_BREEDS:{
            
            return {
                ...state,
                breeds:getSort(state.breeds,action.payload.attribute,action.payload.order)
            }
        }

        case CLEAR_FILTERS:{
            return {
                ...state,
                breeds:state.data
            }
        }

        default: return state;
    }


}





