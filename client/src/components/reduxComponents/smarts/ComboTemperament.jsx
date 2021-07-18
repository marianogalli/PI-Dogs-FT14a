import React from 'react';
import { connect } from 'react-redux'
import {getTemperaments} from '../../../actions/actions'

class ComboTemperament extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <select name="temperament" value={this.props.value} onChange={this.props.onChange}>
                {
                    this.props.temperaments.map((t,i)=><option key={t.name}>{t.name}</option>)
                }
            </select>
        )
    }

    componentDidMount(){
        this.props.getTemperaments();
    }
    
} 



function mapStateToProps(state) {
    return {
        temperaments: state.temperaments
    }
}

export default connect(
    mapStateToProps,
    { getTemperaments}
)(ComboTemperament)