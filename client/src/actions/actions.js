import axios from 'axios';

export const GET_BREEDS='GET_BREEDS'
export const GET_BREEDS_NAME='GET_BREEDS_NAME'
export const GET_TEMPERAMENTS='GET_TEMPERAMENTS'
export const GET_BREEDS_BY_TEMPERAMENT='GET_BREEDS_BY_TEMPERAMENT'
export const GET_BREEDS_BY_SOURCE='GET_BREEDS_BY_SOURCE'
export const CLEAR_FILTERS='CLEAR_FITERS'
export const GET_SORTED_BREEDS='GET_SORTED_BREEDS'
export const GET_BREED_DETAIL='GET_BREEDS_DETAIL'
export const LOADING='LOADING'
export const ERROR='ERROR';

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
    

    console.log('despache');
    return function(dispatch){
        return axios(`http://localhost:3001/dogs?name=${breedName}`)
        .then(breeds=>{
            dispatch({type:GET_BREEDS_NAME,payload:breeds.data})
        })
        .catch(err=>{
            //console.log('error ',err.response.data.message)
            dispatch({type:ERROR,payload:err.response.data.message})
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

    return {
        type: GET_SORTED_BREEDS,
        payload:{
            attribute,
            order
        }
    }
}

export function clearFilters(){

    return {
        type:CLEAR_FILTERS
    }
}

export function getBreedDetail(id){
    return function(dispatch){
        dispatch({type:'LOADING'})
        return fetch(`http://localhost:3001/dogs/${id}`)
        .then(resp=>resp.json())
        .then((breed)=>{
            dispatch({type:GET_BREED_DETAIL, payload:breed})
        })
    }
}
