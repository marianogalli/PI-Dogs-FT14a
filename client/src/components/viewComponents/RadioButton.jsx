import React from 'react'

export default function RadioButton(props){
    return(
        <div>
            <label><input onChange={props.onChange} name="source" type="radio" value="DB"/>DB</label>
            <label><input onChange={props.onChange} name="source" type="radio" value="API"/>API</label>
            <label><input onChange={props.onChange} name="source" type="radio" value="Both"/>BOTH</label>
        </div>
    )
}