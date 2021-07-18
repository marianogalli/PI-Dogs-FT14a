export const GET_BREEDS='GET_BREEDS'
export const GET_BREEDS_NAME='GET_BREEDS_NAME'
export const GET_TEMPERAMENTS='GET_TEMPERAMENTS'
export const GET_BREEDS_BY_TEMPERAMENT='GET_BREEDS_BY_TEMPERAMENT'
export const GET_BREEDS_BY_SOURCE='GET_BREEDS_BY_SOURCE'
export const CLEAR_FILTERS='CLEAR_FITERS'
export const GET_SORTED_BREEDS='GET_SORTED_BREEDS'

export function getBreeds(){
    return function(dispatch){
        return fetch('http://localhost:3001/dogs')
        .then(resp=>resp.json())
        .then(breeds=>{
            dispatch({type:GET_BREEDS, payload:breeds})
        })
    }
}

export function getBreedsName(breedName){
    
    return function(dispatch){
        return fetch(`http://localhost:3001/dogs?name=${breedName}`)
        .then(resp=>resp.json())
        .then((breeds)=>{
            dispatch({type:GET_BREEDS_NAME, payload:breeds})
        })
    }
}

export function getTemperaments(){
    return function(dispatch){
        return fetch(`http://localhost:3001/temperaments`)
        .then(resp=>resp.json())
        .then((breeds)=>{
            dispatch({type:GET_TEMPERAMENTS, payload:breeds})
        })
    }
}

export function getBreedsByTemperament(temperament){
    return{
        type:GET_BREEDS_BY_TEMPERAMENT,
        payload:temperament
    }
}

export function getBreedsBySource(source){

    return {
        type: GET_BREEDS_BY_SOURCE,
        payload:source
    }    
}

export function getSortedBreeds(attribute,order){
    console.log('llega al action');
    return {
        type: GET_SORTED_BREEDS,
        payload:{
            attribute,
            order
        }
    }
}

export function clearFilters(){
    return getBreeds();
}
