import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { getBreedDetail } from '../actions/actions'

/*
class Detail extends React.Component{

    constructor(props){
        super(props)
    }

    render(){

        const {detail}=this.props;

        return(
            

            this.props.loading?(
                <p>Cargando</p>
            ):(
                <>
                <h4>{detail.name}</h4>

                <img src={detail.img}/>

                <p>Altura: {detail.height}</p>
                <p>Peso: {detail.weight}</p>
                <p>Años: {detail.years}</p>

                <ul>
                    {
                        detail.temperament.map((t,i)=><li key={i}>{t}</li>)
                    }
                </ul>
                </>
            )
        )
    }


    componentDidMount(){
        this.props.getBreedDetail(this.props.match.params.id)
        console.log('estado del loading: ',this.props.loading);
    }

}

function mapStateToProps(state){
    return {
        detail:state.breedDetail,
        loading:state.loading
    }
}


export default connect(
    mapStateToProps,
    {getBreedDetail}
)(Detail)
*/




export default function Detail(props) {

    const { id } = props.match.params

    const dispatch = useDispatch();
    const detail =useSelector(state =>state.breedDetail)
    const loading=useSelector(state=>state.loading)

    useEffect(()=>{
        dispatch(getBreedDetail(id))
    },[])


    return (

        loading ? (
            <p>Cargando</p>
        ) : (
            <>
                <h1>Detalle de la raza</h1>
                <p>Id: {id}</p>

                <h1>{detail.name}</h1>
                <img src={detail.img} alt={detail.name}></img>

                <ul>
                    {
                        //detail.temperament.map((t, i) => <li key={i}>{t}</li>)
                    }
                </ul>

                <p>{detail.height}</p>
                <p>{detail.weight}</p>
                <p>{detail.years}</p>
            </>
        )

    )



}





