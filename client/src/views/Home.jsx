import React, { useState } from 'react';
import { connect } from 'react-redux'
import {
    getBreeds,
    getBreedsName,
    getBreedsByTemperament,
    clearFilters,
    getBreedsBySource,
    getSortedBreeds,
} from '../actions/actions'
import Breed from '../components/reduxComponents/dumbs/Breed'
import ComboTemperament from '../components/reduxComponents/smarts/ComboTemperament'
import RadioButton from '../components/viewComponents/RadioButton'
import Spinner from '../components/viewComponents/Spinner'

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
        currentPage: 0
    })

    handleOnChange = async (e) => {
        await this.setState({
            ...this.state,
            currentPage: 0,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'temperament') {
            return this.props.getBreedsByTemperament(this.state.temperament)
        }

        if (e.target.name === "source") {
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

    previousPage = () => {
        if (this.state.currentPage > 0) {
            this.setState({
                ...this.state,
                currentPage: this.state.currentPage - 6
            })
        }
    }

    nextPage = () => {
        if (this.state.currentPage + 6 < this.props.breeds.length)
            this.setState({
                ...this.state,
                currentPage: this.state.currentPage + 6
            })
    }

    paginatedResults = () => {
        return this.props.breeds.slice(this.state.currentPage, this.state.currentPage + 6)
    }

    render() {

        console.log('breeds ', this.props.breeds);
        console.log('error ', this.props.error);

        return (
            <>
                <div className="container-form">

                    <div className="form">
                        <form onSubmit={this.handleOnSubmit}>
                            <label>Breed:</label>
                            <input type="text" name="breed" onChange={this.handleOnChange} value={this.state.breed} />
                            <input type="submit" className="frm-button" value="Search" />
                        </form>
                    </div>

                    <div className="filters">
                        <ComboTemperament onChange={this.handleOnChange} value={this.state.temperament} />

                        <RadioButton onChange={this.handleOnChange} />

                        <select name="attribute" onChange={this.handleOnChange} value={this.state.attribute}>
                            <option value="name">Breed</option>
                            <option value="weight">Weight</option>
                        </select>

                        <select name="order" onChange={this.handleOnChange} value={this.state.order}>
                            <option>asc</option>
                            <option>desc</option>
                        </select>

                        <button onClick={this.handleOnClick}>Clear filters</button>
                    </div>
                </div>

                <div>
                    {
                        this.props.error ? (
                            <p className="error">{this.props.error}</p>
                        ) : (
                            this.paginatedResults().length > 0 ? (
                                <div>
                                    <div className="container-buttons-pagination">
                                        <button onClick={this.previousPage}>Previous</button>
                                        <button onClick={this.nextPage}>Next</button>
                                    </div>

                                    <div className="flex-breeds-container">

                                        {
                                            this.paginatedResults().map((b, i) => <div key={i} className="flex-breed"><Breed name={b.name} img={b.img} temp={b.temperament} id={b.id} /></div>)
                                        }
                                    </div>
                                </div>
                            ) : (
                                <Spinner />
                            )
                        )
                    }

                </div>
            </>
        )
    }

    componentDidMount() {
        if (this.props.breeds.length === 0)
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