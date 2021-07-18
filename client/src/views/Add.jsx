import React from 'react';
import ComboTemperament from '../components/reduxComponents/smarts/ComboTemperament';

export default class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breed: '',
            minWeight: '',
            maxWeight: '',
            minHeight: '',
            maxHeight: '',
            years: '',
            temperament: []
        }
    }

    handleOnChange = (e) => {
        
        if(e.target.name==="temperament"){
            this.setState({
                ...this.state,
                temperament:[...this.state.temperament,e.target.value]
            })
        }else{
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            })

        }
        
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        let raza = {
            breed: this.state.breed,
            height: `${this.state.minHeight} - ${this.state.maxHeight}`,
            weight: `${this.state.minWeight} - ${this.state.maxWeight}`,
            years: this.state.years,
            temperament:this.state.temperament
        }
        console.log(raza);
    }


    render() {

        return (
            <>
                <h1>Formulario para agregar raza</h1>

                <form onSubmit={this.handleOnSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input name="breed" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label>Altura minima</label>
                        <input type="number" name="minHeight" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label>Altura maxima</label>
                        <input type="number" name="maxHeight" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label>Peso minimo</label>
                        <input type="number" name="minWeight" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label>Peso maximo</label>
                        <input type="number" name="maxWeight" onChange={this.handleOnChange} />
                    </div>
                    <div>
                        <label>Años</label>
                        <input type="number" name="years" onChange={this.handleOnChange} />
                    </div>

                    <div>
                        <label>Temperamentos</label>
                        <ComboTemperament onChange={this.handleOnChange} name="temperament"/>
                    </div>



                    <input type="submit" value="Aceptar" />

                </form>

            </>

        )
    }



}