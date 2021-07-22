import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/viewComponents/Spinner'
import { getBreedDetail } from '../actions/actions'


export default function Detail(props) {

    const { id } = props.match.params

    const dispatch = useDispatch();
    const detail = useSelector(state => state.breedDetail)
    const loading = useSelector(state => state.loading)

    const { name, img, height, weight, temperament, years } = detail;
    let temp = '';

    console.log('breed desde el componente ',detail);
    

    temperament.forEach(t=>temp+=`${t} `)


    useEffect(() => {
        dispatch(getBreedDetail(id))
        
        return ()=>{
            console.log('se desmonta el componenete y breed queda');
        }
        
    }, [])
  

    return (

        loading?(
            <Spinner/>
        ):(
            <div className="container-detail">
            <div className="info-detail">
                <h1>{name}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eaque magni autem dolores quo esse libero repellendus minima, doloribus tempore debitis sapiente, a eos reiciendis, harum in neque distinctio temporibus totam aperiam rem. Mollitia sit non ea iste facilis magni ad? Nesciunt, officiis molestiae! Aliquid, minima quae? Earum, repellat odio?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nobis possimus atque dignissimos earum ipsam mollitia, quasi nihil iure tempora maiores, debitis natus tenetur voluptates! Magni alias libero natus labore.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ab quos qui vel, numquam unde. Tempore quo explicabo ratione asperiores rerum quas tempora voluptatum incidunt! Culpa laudantium nisi aut delectus nemo iusto exercitationem maxime, cumque qui commodi beatae quae ipsum vitae neque, repellat cum, eligendi quaerat sint. Alias delectus qui cumque, pariatur vitae et, aliquid beatae enim aspernatur commodi quaerat?</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, quibusdam beatae porro ad cupiditate dolore eveniet cumque asperiores. Explicabo, consequuntur! Hic esse velit sunt provident ipsa. Temporibus, nemo voluptatum rem accusantium unde sunt quas sapiente, omnis molestiae assumenda culpa ipsum eos, ut nobis dolor. Reiciendis alias dolorem rem voluptatem, odio maiores excepturi! Sit porro adipisci minima ut? Ipsa sint voluptas magni impedit voluptatibus ut atque. Delectus nulla officia natus aliquam.</p>
            </div>

            <div className="img-detail">
                <h3>{name}</h3>
                <img src={img} alt={name}></img>

                <div className="container-table">
                    <table className="table-detail">
                        <tr>
                            <th>Temperament</th>
                            <td>{temp}</td>
                        </tr>
                        <tr>
                            <th>Life Span:</th>
                            <td>{years}</td>
                        </tr>
                        <tr>
                            <th>Weight:</th>
                            <td>{weight} Kgs.</td>
                        </tr>
                        <tr>
                            <th>Height:</th>
                            <td>{height} Cm.</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        )
    )
}





