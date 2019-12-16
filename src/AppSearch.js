import React,{Component} from 'react';
import Example from "./Example";
import Card from "./Card";

class AppSearch extends Component {



    render() {
        return (
            <div className="AppSearch">
                <Example/>
                <Card idCard={this.props.match.params.id}/>
            </div>
        )
        }
}

export default AppSearch;
