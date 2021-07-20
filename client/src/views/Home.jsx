import React, {useState} from 'react';
import { connect } from 'react-redux'
import {
    getBreeds,
    getBreedsName,
    getBreedsByTemperament,
    clearFilters,
    getBreedsBySource,
    getSortedBreeds
} from '../actions/actions'
import Breed from '../components/reduxComponents/dumbs/Breed'
import ComboTemperament from '../components/reduxComponents/smarts/ComboTemperament'
import RadioButton from '../components/viewComponents/RadioButton'

class Home extends React.Component {

    constructor(props) {

        super(props)
        this.state = this.getInitialState();
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.getBreedsName(this.state.breed);
    }

    getInitialState = () => ({
        breed: '',
        temperament: '',
        source: '',
        attribute: 'name',
        order: 'asc',
        currentPage:0
    })

    handleOnChange = async (e) => {
        await this.setState({
            ...this.state,
            currentPage:0,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'temperament') {
            return this.props.getBreedsByTemperament(this.state.temperament)
        }

        if (e.target.name === "source") {
            console.log('al handle llega');
            //await this.props.getBreeds();
            return this.props.getBreedsBySource(this.state.source)
        }

        if (e.target.name === 'attribute' || e.target.name === 'order') {
            return this.props.getSortedBreeds(this.state.attribute, this.state.order)
        }

    }

    handleOnClick = () => {

        //Deschequeo todos los radiobutton
        let radios = document.getElementsByName('source');
        radios.forEach(r => r.checked = false)

        this.setState(this.getInitialState())

        this.props.clearFilters();
    }

    previousPage=()=>{
        if(this.state.currentPage>0){
            this.setState({
                ...this.state,
                currentPage:this.state.currentPage-5
            })
        }        
    }

    nextPage=()=>{
        if(this.state.currentPage+5 < this.props.breeds.length)
        this.setState({
            ...this.state,
            currentPage:this.state.currentPage+5
        })
    }

    paginatedResults=()=>{
        return this.props.breeds.slice(this.state.currentPage,this.state.currentPage+5)
    }

    render() {


        return (
            <>
                <h1>Estoy en Home!!</h1>

                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="breed" onChange={this.handleOnChange} value={this.state.breed} />
                    <input type="submit" value="Buscar" />


                    <ComboTemperament onChange={this.handleOnChange} value={this.state.temperament} />
                    <button onClick={this.handleOnClick}>Limpiar filtros</button>

                    <RadioButton onChange={this.handleOnChange} />

                    <select name="attribute" onChange={this.handleOnChange} value={this.state.attribute}>
                        <option value="name">Breed</option>
                        <option value="weight">Weight</option>
                    </select>

                    <select name="order" onChange={this.handleOnChange} value={this.state.order}>
                        <option>asc</option>
                        <option>desc</option>
                    </select>

                </form>

                <button onClick={this.previousPage}>Previous</button>

                <button onClick={this.nextPage}>Next</button>

                {
                    this.paginatedResults().length > 0 ? this.paginatedResults().map(b => <Breed key={b.id} name={b.name} img={b.img} temp={b.temperament} />) : <p>!!</p>
                }
            </>
        )
    }

    componentDidMount() {
        this.props.getBreeds();
    }

}

function mapStateToProps(state) {
    return {
        breeds: state.breeds,
        error: state.error
    }
}

export default connect(
    mapStateToProps,
    {
        getBreeds, getBreedsName,
        getBreedsByTemperament, clearFilters,
        getBreedsBySource, getSortedBreeds
    }
)(Home)