import React from 'react';
import {Link} from 'react-router-dom' 


export default function Breed(props) {

    const { name, img, temp, id } = props;

    return (
        <div>
            <h4>{name}</h4>
            <img src={img} />
            <ul>
                {
                    temp.map((t,i)=><li key={i}>{t}</li>)
                }
            </ul>

            <Link to={`/dogs/detail/${id}`}>Detalle</Link>

            
        </div>
    )


}

