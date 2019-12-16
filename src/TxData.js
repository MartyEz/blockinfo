import React, {Component} from 'react';
import Table from "reactstrap/es/Table";

class TxData extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let txData = this.props.txData;
        let inputs = [];
        for( let i=0;i< txData.inputs.length;i++){
            if(typeof txData.inputs[i].prev_out !== 'undefined')
                inputs.push(txData.inputs[i])
        }
        let outs = [];
        for( let i=0;i< txData.out.length;i++){
            if(typeof txData.out[i].addr !== 'undefined')
                outs.push(txData.out[i])
        }
        return (
            <div >
                <p align="center" className="table-info">TxHash : {txData.hash}</p>
                <Table width="100%">
                    <thead>
                    <tr>
                        <th>In</th>
                        <th scope="col">Out</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row">
                            {inputs.map(item =>
                                <p>{item.prev_out.addr}</p>
                            )}
                        </td>
                        <td>
                            {outs.map(item =>
                                <p>{item.addr} {'<->'} {item.value/100000000}BTC</p>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TxData