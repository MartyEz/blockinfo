import React,{Component} from 'react';
class Card extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <h1>LOL : {this.props.idCard}</h1>
        )
    }
}

export default Card