import React, {Component} from 'react'
import PropTypes from 'prop-types';

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRows: [],
        };


    }


    render() {
        console.log(this.props.data)

        return (
            <div>
                <p>LDSQD : {this.props.data[0].hash}</p>

            </div>
        );
    }
}

ParentComponent.propTypes ={
  data : PropTypes.array.isRequired
};

export default ParentComponent