import React,{Component} from 'react';
import TxDataManager from "./TxDataManager";

class AppTx extends Component {



    render() {
        return (
            <div className="AppTx">
                <TxDataManager idTx={this.props.match.params.id}/>
            </div>
        )
    }
}

export default AppTx;
