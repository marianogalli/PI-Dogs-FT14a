import React from 'react';


export default function Breed(props) {

    const { name, img, temp } = props;

    return (
        <div>
            <h4>{name}</h4>
            <img src={img} />
            <ul>
                {
                    temp.map((t,i)=><li key={i}>{t}</li>)
                }
            </ul>

        </div>
    )
}

