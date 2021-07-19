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

    handleOnClose=(e)=>{
        console.log(e.target.previousSibling.textContent);
        this.setState({
            ...this.state,
            temperament:this.state.temperament.filter(t=>t!==e.target.previousSibling.textContent)
        })
    }

    render() {

        return (
            <>
                <h1>Formulario para agregar raza</h1>

                <form onSubmit={this.handleOnSubmit}>
                    <div>
                        <label>Nombre (*) </label>
                        <input name="breed" required onChange={this.handleOnChange} value={this.state.breed} />
                    </div>
                    <div>
                        <label>Altura minima (*) </label>
                        <input type="number" name="minHeight" required onChange={this.handleOnChange} value={this.state.minHeight} />
                    </div>
                    <div>
                        <label>Altura maxima (*) </label>
                        <input type="number" name="maxHeight" required onChange={this.handleOnChange} value={this.state.maxHeight} />
                    </div>
                    <div>
                        <label>Peso minimo (*) </label>
                        <input type="number" name="minWeight" required onChange={this.handleOnChange} value={this.state.minWeight} />
                    </div>
                    <div>
                        <label>Peso maximo (*) </label>
                        <input type="number" name="maxWeight" required onChange={this.handleOnChange} value={this.state.maxWeight} />
                    </div>
                    <div>
                        <label>Años </label>
                        <input type="number" name="years" onChange={this.handleOnChange} value={this.state.years} />
                    </div>

                    <div>
                        <label>Temperamentos </label>
                        <ComboTemperament onChange={this.handleOnChange} name="temperament" />

                        {
                            this.state.temperament.length>0?this.state.temperament.map((t,i)=><DetailTemperament key={i} handleOnClose={this.handleOnClose} temperament={t}/>):''
                        }

                    </div>        


                    <input type="submit" value="Aceptar" />

                </form>

               
                <div>{this.state.message}</div>

            </>

        )
    }



}