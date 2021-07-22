import React from 'react';
import ComboTemperament from '../components/reduxComponents/smarts/ComboTemperament';
import axios from 'axios'
import DetailTemperament from '../components/reduxComponents/dumbs/DetailTemperament';

export default class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        breed: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        years: '',
        temperament: []
        //message: null
    })

    handleOnChange = (e) => {
        if (e.target.name === "temperament") {
            this.setState({
                ...this.state,
                temperament: [...this.state.temperament, e.target.value]
            })
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            })
        }
    }

    addBreedToDB = (breed) => {
        axios({ method: 'post', url: 'http://localhost:3001/dogs', data: breed })
            .then((resp) => {
                this.setState({
                    ...this.getInitialState(),
                    message: resp.data.message
                })
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    message: err.response.data.error
                })
            })


        setTimeout(() => {
            this.setState({
                ...this.state,
                message: null
            })
        }, 5000)
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        let raza = {
            name: this.state.breed,
            height: `${this.state.minHeight} - ${this.state.maxHeight}`,
            weight: `${this.state.minWeight} - ${this.state.maxWeight}`,
            years: this.state.years,
            temperament: this.state.temperament
        }
        this.addBreedToDB(raza);
    }

    handleOnClose = (e) => {
        console.log(e.target.previousSibling.textContent);
        this.setState({
            ...this.state,
            temperament: this.state.temperament.filter(t => t !== e.target.previousSibling.textContent)
        })
    }

    render() {

        return (
            <div className="grid-container">

                <div className="contenedor">
                    <form className="form" id="frm-add" onSubmit={this.handleOnSubmit}>
                        <div className="form-header">
                        </div>

                        <label className="form-label">Breed name (*) </label>
                        <input name="breed" required className="form-input" onChange={this.handleOnChange} value={this.state.breed} />

                        <label className="form-label">Min height (*) </label>
                        <input type="number" className="form-input" name="minHeight" required onChange={this.handleOnChange} value={this.state.minHeight} />

                        <label className="form-label">Max height (*) </label>
                        <input type="number" className="form-input" name="maxHeight" required onChange={this.handleOnChange} value={this.state.maxHeight} />
                        
                        <label className="form-label">Temperament(s) </label>
                        <ComboTemperament className="form-input" onChange={this.handleOnChange} name="temperament" />

                        {
                            <div className="flex-temperaments">
                                {
                                    this.state.temperament.length > 0 ? this.state.temperament.map((t, i) => <DetailTemperament key={i} handleOnClose={this.handleOnClose} temperament={t} />) : ''
                                }
                            </div>
                            
                        }

                        <label className="form-label">Min weight (*) </label>
                        <input type="number" className="form-input" name="minWeight" required onChange={this.handleOnChange} value={this.state.minWeight} />

                        <label className="form-label">Max weight (*) </label>
                        <input type="number" className="form-input" name="maxWeight" required onChange={this.handleOnChange} value={this.state.maxWeight} />

                        <label className="form-label">Life span (years) </label>
                        <input type="number" className="form-input" name="years" onChange={this.handleOnChange} value={this.state.years} />

                        <input type="submit" className="btn-submit" value="Save" />

                        <div className="div-alert"><p>{this.state.message}</p></div>
                    </form>                    

                </div>

            </div>

        )
    }



}