import React,{Component} from 'react';
import ApiCaller from "./ApiCaller";
import TxData from "./TxData";

class TxDataManager extends Component{
    constructor(props) {
        super(props);
        this.state ={
            txArr : []
        }
    }

    componentDidMount() {
        ApiCaller.getHash(this.props.idTx).then((data)=>{

            this.setState((prev) => {
                return{
                    txArr: prev.txArr.concat(data.tx)
                }
            });
      });


    }


    render() {
        let txArr = this.state.txArr;
        if(txArr.length !== 0){
            return(
                <div>
                    {txArr.map(item =>
                        <TxData key={item.hash} txData={item}/>
                    )}
                </div>
            )

        }else{
            return (
                <h1>Loading</h1>
            )
        }

    }
}

export default TxDataManager