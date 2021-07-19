import React from 'react';


export default function DetailTemperament(props){

    const {temperament,handleOnClose}=props;

    return(
        <div>
            {temperament}
            <button onClick={handleOnClose}>X</button>
        </div>
    )

}
