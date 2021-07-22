import {
    GET_BREEDS,
    GET_BREEDS_NAME,
    GET_TEMPERAMENTS,
    GET_BREEDS_BY_TEMPERAMENT,
    GET_BREEDS_BY_SOURCE,
    GET_SORTED_BREEDS,
    CLEAR_FILTERS,
    GET_BREED_DETAIL,
    LOADING,
    ERROR
} from '../actions/actions'
import {getSort} from '../helpers/helpers'

const initialState = {
    breeds: [],// pueden ser todas o filtradas
    data:[],//toooodas las razas
    temperaments: [],
    breedDetail:{},
    loading:false,
    error:null
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
                error:null,
                data:action.payload,
                breeds: action.payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case GET_BREEDS_BY_TEMPERAMENT:{
            let obj={
                ...state,
                error:null,
                breeds: state.data.filter(breed => breed.temperament.includes(action.payload))
            }

            if(obj.breeds.length===0){
                return {
                    ...state,
                    error:'Not breeds found with this temperament'
                }
            }

            return obj;
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
                error:null,
                breeds:state.data
            }
        }

        case ERROR:{
            return{
                ...state,
                error:action.payload
            }
        }

        case GET_BREED_DETAIL:{
            //console.log('temps desde el reducer: ',action.payload.temperament);
            let obj={
                ...state,
                loading:false,
                breedDetail:action.payload
            }          
            return obj;
        }

        case LOADING:{
            return {
                ...state,
                loading:true
            }
        }

        default: return state;
    }


}





