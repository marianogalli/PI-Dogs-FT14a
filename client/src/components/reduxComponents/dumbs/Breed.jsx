import React from 'react';
import { Link } from 'react-router-dom'


export default function Breed(props) {

    const { name, img, temp, id } = props;    

    return (

        <div className="card-breed">
            <h2 className="breed-name">{name}</h2>
            <img src={img} alt={name} />
            <h4 className="title-temperaments">Temperaments</h4>
            <div className="flex-temperaments">
                {temp.map((t, i) => <div key={i}>{t}</div>)}
            </div>
            <div className="container-button">
                <Link className="btn-detail" to={`/dogs/detail/${id}`}>View detail</Link>
            </div>
        </div>
    )
    


}

