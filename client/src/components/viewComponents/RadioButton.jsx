import React from 'react'

export default function RadioButton(props){
    return(
        <div className="radios">
            <label className="form-input"><input onChange={props.onChange} name="source" type="radio" value="DB"/>DB</label>
            <label className="form-input"><input className="form-input" onChange={props.onChange} name="source" type="radio" value="API"/>API</label>
        </div>
    )
}